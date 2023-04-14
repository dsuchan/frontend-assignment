import React, {useContext, useState} from 'react';
import nameStyles from './Name.module.css';
import {IconButton, Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import {TodoListContext} from '../../../store/TodoListContext';

export const Name: React.FC = () => {
  const {author, setAuthor} = useContext(TodoListContext);

  const [name, setName] = useState<string>('');

  return (
    <div className={nameStyles['n-wrapper']}>
      <InputGroup>
        <Input
          name="userName"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          isDisabled={Boolean(author.name)}
        />
        <InputRightElement>
          <IconButton
            aria-label="Change the section title"
            icon={<CheckIcon />}
            onClick={() => setAuthor({name: name})}
            isDisabled={!name || Boolean(author.name)}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
