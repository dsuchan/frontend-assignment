import React from 'react';
import headerStyles from './Header.module.css';
import {Name} from './Name/Name';
import {MainSettings} from './MainSettings/MainSettings';

export const Header: React.FC = () => {
  return (
    <div className={headerStyles.header}>
      <Name />
      <MainSettings />
    </div>
  );
};
