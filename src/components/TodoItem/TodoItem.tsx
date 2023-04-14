import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {DeleteIcon, EditIcon, HamburgerIcon} from '@chakra-ui/icons';
import todoItemStyles from './TodoItem.module.css';
import {Todo} from '../../types/types';
import {EditTodo} from './EditTodo';

type TodoProps = {
  /**
   * Id of current section.
   */
  sectionId: string;
  /**
   * Current item from the list.
   */
  todo: Todo;
  /**
   * Handle the onCheck event.
   * @param id id of current item.
   * @param value current checkbox value.
   */
  onCheck: (id: string, value: boolean) => void;
  /**
   * Edit current item from the list.
   * @param id id of current item.
   * @param name updated name of current item.
   * @param description updated description of current item.
   * @param priority updated priority of current item.
   */
  onEdit: (id: string, name?: string, description?: string, priority?: string) => void;
  /**
   * Delete the current item from the list.
   * @param id id of current item.
   */
  onDelete: (id: string) => void;
};

export const TodoItem: React.FC<TodoProps> = (props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [updatedName, setUpdatedName] = useState<string>(props.todo.name as string);
  const [updatedDescription, setUpdatedDescription] = useState<string>(props.todo.description as string);
  const [updatedPriority, setUpdatedPriority] = useState<string>(props.todo.priority as string);

  /**
   * Pass the updated data to the parent handler and close the modal.
   */
  function handleEdit(): void {
    props.onEdit(props.todo.id as string, updatedName, updatedDescription, updatedPriority);
    onClose();
  }

  /**
   * Set the item border style based on priority value.
   * @param priority value of current priority,
   * @returns specific border styles.
   */
  function decideBorderStyles(priority: string) {
    switch (priority) {
      case '3':
        return '4px solid #24a148';
      case '2':
        return '4px solid #FF9800';
      case '1':
        return '4px solid #E32C1E';

      default:
        return '1px solid #dfe1e6';
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #dfe1e6">Edit task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditTodo
              todo={props.todo}
              name={updatedName}
              description={updatedDescription}
              onNameChange={setUpdatedName}
              onDescriptionChange={setUpdatedDescription}
              onPriorityChange={setUpdatedPriority}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Close
            </Button>
            <Button onClick={handleEdit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        style={{borderLeft: decideBorderStyles(props.todo.priority as string)}}
        className={todoItemStyles['ti-wrapper']}
      >
        <div className={todoItemStyles['ti-name']}>
          <Checkbox
            size="lg"
            isChecked={props.todo.completed}
            onChange={(e) => props.onCheck(props.todo.id as string, e.currentTarget.checked)}
          />
          <span>{props.todo.name}</span>
        </div>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<EditIcon />} onClick={onOpen}>
              Edit task
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => props.onDelete(props.todo.id as string)}
              color="red"
            >
              Delete task
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};
