import React, {useContext, useState} from 'react';
import wrapperStyles from './Wrapper.module.css';
import {TodoListContext} from '../../store/TodoListContext';
import {Button} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {CreateSection} from '../Section/CreateSection';
import {Section} from '../Section/Section';

export const Wrapper: React.FC = () => {
  const {author, sections, editSection} = useContext(TodoListContext);

  const [showSectionInput, setShowSectionInput] = useState<boolean>(false);

  return (
    <div className={wrapperStyles['w-wrapper']}>
      <div className={wrapperStyles['w-sections']}>
        {sections.map((item) => (
          <Section key={item.id} sectionId={item.id} sectionTitle={item.sectionTitle} onEdit={editSection} />
        ))}
      </div>
      {showSectionInput && <CreateSection show={showSectionInput} setShow={setShowSectionInput} />}
      {!showSectionInput && (
        <Button
          leftIcon={<AddIcon />}
          isDisabled={!author.name}
          onClick={() => setShowSectionInput(true)}
        >
          Add a section
        </Button>
      )}
    </div>
  );
};
