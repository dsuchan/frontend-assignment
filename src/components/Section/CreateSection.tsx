import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Input, useToast} from '@chakra-ui/react';
import createSectionStyles from './CreateSection.module.css';
import {TodoListContext} from '../../store/TodoListContext';

type CreateSectionProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const CreateSection: React.FC<CreateSectionProps> = (props) => {
  const {addSection} = useContext(TodoListContext);

  const toast = useToast();

  const [sectionTitle, setSectionTitle] = useState<string>('');

  /**
   * Validate the section title. If !sectionTitle, display an error toast, else add new section.
   * @param e submit event.
   */
  function validateForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!sectionTitle) {
      toast({
        title: 'Section name is required!',
        description: 'Please, fill in the section name in order to continue.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      addSection({
        id: self.crypto.randomUUID(),
        sectionTitle: sectionTitle,
        todos: []
      });
      setSectionTitle('');
      props.setShow(false);
    }
  }

  return (
    <>
      {props.show && (
        <form className={createSectionStyles['cs-wrapper']} onSubmit={validateForm}>
          <Input
            name="sectionTitle"
            placeholder="Section title"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.currentTarget.value)}
          />
          <ButtonGroup>
            <Button onClick={() => props.setShow(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </form>
      )}
    </>
  );
};
