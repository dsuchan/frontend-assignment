import React, {createContext, useState, useEffect} from 'react';
import {Author, Section, Todo} from '../types/types';
import {DefaultAuthor} from '../defaults/defaults';
import {update} from 'cypress/types/lodash';

type TodoListContextData = {
  author: Author;
  setAuthor: (author: Author) => void;
  sections: Section[];
  addSection: (section: Section) => void;
  editSection: (sectionId: string, newTitle: string) => void;
  deleteSection: (sectionId: string) => void;
  addTodo: (sectionId: string, todo: Todo) => void;
  deleteTodo: (sectionId: string, todoId: string) => void;
};

type TodoListProviderProps = {
  children: React.ReactNode;
};

export const TodoListContext = createContext<TodoListContextData>({
  author: DefaultAuthor,
  setAuthor: () => {},
  sections: [],
  addSection: () => {},
  editSection: () => {},
  deleteSection: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
});

export const TodoListContextProvider: React.FC<TodoListProviderProps> = (props) => {
  const [author, setAuthor] = useState<Author>(DefaultAuthor);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  function addSection(newSection: Section): void {
    setSections((prev) => {
      return [...prev, newSection];
    });
  }

  function editSection(sectionId: string, newTitle: string): void {
    let updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {...section, sectionTitle: newTitle};
      } else {
        return section;
      }
    });

    setSections(updatedSections);
  }

  function deleteSection(sectionId: string): void {
    setSections((prev) => {
      return prev.filter((item) => item.id !== sectionId);
    });
  }

  function addTodo(sectionId: string, todo: Todo): void {
    let section = sections.find((item) => item.id === sectionId);

    if (!section) return;

    section.todos?.push(todo);
  }

  function deleteTodo(sectionId: string, todoId: string): void {
    let updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {...section, todos: section.todos?.filter((item) => item.id !== todoId)};
      } else {
        return section;
      }
    });

    setSections(updatedSections);
  }

  return (
    <TodoListContext.Provider
      value={{
        author,
        setAuthor,
        sections,
        addSection,
        editSection,
        deleteSection,
        addTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};
