import React from 'react';
import {Input, Select, Textarea} from '@chakra-ui/react';
import editTodoStyles from './EditTodo.module.css';
import {Todo} from '../../types/types';

type EditTodoProps = {
  /**
   * Current item from the list.
   */
  todo: Todo;
  /**
   * Name of the current item.
   */
  name: string;
  /**
   * Description of the current item.
   */
  description: string;
  /**
   * Update the name of the current item.
   * @param value new name value.
   */
  onNameChange: (value: string) => void;
  /**
   * Update the description of the current item.
   * @param value new description value.
   */
  onDescriptionChange: (value: string) => void;
  /**
   * Update the priority of the current item.
   * @param value new priority value.
   */
  onPriorityChange: (value: string) => void;
};

export const EditTodo: React.FC<EditTodoProps> = (props) => {
  return (
    <div className={editTodoStyles['et-wrapper']}>
      <div className={editTodoStyles['et-author-tag']}>
        <span>Created by: {props.todo.author}</span>
        &middot;
        <span>{props.todo.createdDate}</span>
        &middot;
        <span>{props.todo.createdTime}</span>
      </div>
      <div>
        <span className={editTodoStyles['et-label']}>Task name</span>
        <Input
          name="taskName"
          value={props.name}
          onChange={(e) => props.onNameChange(e.currentTarget.value)}
        />
      </div>
      <Textarea
        placeholder="Write a detailed description of the task"
        value={props.description}
        onChange={(e) => props.onDescriptionChange(e.currentTarget.value)}
      />
      <div className={editTodoStyles['et-priority']}>
        <span className={editTodoStyles['et-label']}>Priority</span>
        <Select
          defaultValue={props.todo.priority}
          onChange={(e) => props.onPriorityChange(e.currentTarget.value)}
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
          <option value="4">None</option>
        </Select>
      </div>
    </div>
  );
};
