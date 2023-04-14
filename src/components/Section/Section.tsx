import React, {useContext, useEffect, useState} from 'react';
import {CheckIcon, DeleteIcon, DragHandleIcon, EditIcon, HamburgerIcon} from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import sectionStyles from './Section.module.css';
import {Todo} from '../../types/types';
import {TodoListContext} from '../../store/TodoListContext';
import {TodoItem} from '../TodoItem/TodoItem';

type SectionProps = {
  /**
   * Id of current section.
   */
  sectionId: string;
  /**
   * Title of current section.
   */
  sectionTitle: string;
  /**
   * Edit the section title.
   * @param sectionId id id current section.
   * @param newTitle updated title of the section.
   */
  onEdit: (sectionId: string, newTitle: string) => void;
};

export const Section: React.FC<SectionProps> = (props) => {
  const {author, deleteSection, addTodo, deleteTodo} = useContext(TodoListContext);

  const [editSection, setEditSection] = useState<boolean>(false);
  const [newSectionTitle, setNewSectionTitle] = useState<string>(props.sectionTitle);

  const [todoName, setTodoName] = useState<string>('');
  const [allTasks, setAllTasks] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  /**
   * Anytime allTasks change, update todos and completed tasks.
   */
  useEffect(() => {
    setTodos(allTasks.filter((item) => !item.completed));
    setCompleted(allTasks.filter((item) => item.completed));
  }, [allTasks]);

  /**
   * Create new todo item, set it to local state and context section state.
   */
  function handleAddTodo(): void {
    const newTodo = {
      id: self.crypto.randomUUID(),
      name: todoName,
      author: author.name,
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      completed: false,
      priority: '3',
    };

    setAllTasks((prev) => {
      return [...prev, newTodo];
    });

    addTodo(props.sectionId, newTodo);

    setTodoName('');
  }

  /**
   * Get the current item from the list, change it's value to current checkbox value, update todos and completed tasks.
   * @param id id of the current item from the list.
   * @param value current checkbox value.
   */
  function handleCheck(id: string, value: boolean): void {
    let currentItem = allTasks.find((item) => item.id === id);

    if (!currentItem) return;

    currentItem.completed = value;

    if (currentItem.completed) {
      setCompleted((prev) => {
        return [...prev, currentItem as Todo];
      });
      setTodos((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    } else {
      setCompleted((prev) => {
        return prev.filter((item) => item.id !== id);
      });
      setTodos((prev) => {
        return [...prev, currentItem as Todo];
      });
    }
  }

  /**
   * Get the current item from the list, remove it from all local states (allTasks, todos, completed) and from context.
   * @param id id of the current item from the list.
   */
  function handleDelete(id: string): void {
    let currentItem = allTasks.find((item) => item.id === id);

    if (!currentItem) return;

    setAllTasks((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setTodos((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setCompleted((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    deleteTodo(props.sectionId, id);
  }

  /**
   * Loop through allTasks and change it's completed value to true. Empty todos and filter completed tasks.
   */
  function handleAllDone(): void {
    allTasks.forEach((item) => (item.completed = true));
    setTodos([]);
    setCompleted(allTasks.filter((item) => item.completed));
  }

  /**
   * Delete section by it's sectionId.
   */
  function handleDeleteList(): void {
    deleteSection(props.sectionId);
  }

  /**
   * Pass the sectionId and newSectionTitle to parent edit handler (context), then close the edit modal.
   */
  function handleSectionEdit(): void {
    props.onEdit(props.sectionId, newSectionTitle);
    setEditSection(false);
  }

  /**
   * Edit the current item from the list. Map the new state by optional parameters.
   * @param todoId id of the current item from the list.
   * @param name updatedName of the current item.
   * @param description updatedDescription of the current item.
   * @param priority updatedPriority of the current item.
   */
  function handleEdit(
    todoId: string,
    name?: string,
    description?: string,
    priority?: string
  ): void {
    setAllTasks(
      allTasks.map((task) =>
        task.id === todoId
          ? {...task, name: name, description: description, priority: priority}
          : task
      )
    );
  }

  /**
   * Handle the onEnter event while when adding new item to the list.
   * @param e keyboard event.
   */
  function handleOnEnter(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleAddTodo();
    else return;
  }

  return (
    <div className={sectionStyles['s-wrapper']}>
      <div className={sectionStyles['s-header']}>
        {!editSection && <h4 className={sectionStyles['s-header__title']}>{props.sectionTitle}</h4>}
        {editSection && (
          <InputGroup width="225px">
            <Input
              variant="outline"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.currentTarget.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Change the section title"
                icon={<CheckIcon />}
                onClick={handleSectionEdit}
              />
            </InputRightElement>
          </InputGroup>
        )}
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<CheckIcon />} onClick={handleAllDone}>
              Mark all done
            </MenuItem>
            <MenuItem icon={<EditIcon />} onClick={() => setEditSection(true)}>
              Edit
            </MenuItem>
            <MenuItem icon={<DeleteIcon />} onClick={handleDeleteList} color="red">
              Delete list
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>To do</Tab>
            <Tab>Done</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className={sectionStyles['s-todos']}>
                {allTasks
                  .sort((a, b) => (a.priority! > b.priority! ? 1 : -1))
                  .map((item) => (
                    <TodoItem
                      key={item.id}
                      sectionId={props.sectionId}
                      todo={item}
                      onCheck={handleCheck}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={sectionStyles['s-todos']}>
                {todos
                  .sort((a, b) => (a.priority! > b.priority! ? 1 : -1))
                  .map((item) => (
                    <TodoItem
                      key={item.id}
                      sectionId={props.sectionId}
                      todo={item}
                      onCheck={handleCheck}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={sectionStyles['s-todos']}>
                {completed
                  .sort((a, b) => (a.priority! > b.priority! ? 1 : -1))
                  .map((item) => (
                    <TodoItem
                      key={item.id}
                      sectionId={props.sectionId}
                      todo={item}
                      onCheck={handleCheck}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div className={sectionStyles['s-addtodo']}>
        <Input
          name="addTask"
          placeholder="Add task"
          value={todoName}
          onChange={(e) => setTodoName(e.currentTarget.value)}
          onKeyDown={(e) => handleOnEnter(e)}
        />
        <Button onClick={handleAddTodo} isDisabled={!todoName}>
          Add
        </Button>
      </div>
    </div>
  );
};
