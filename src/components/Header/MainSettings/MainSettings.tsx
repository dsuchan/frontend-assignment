import React from 'react';
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import {
  CalendarIcon,
  CheckIcon,
  HamburgerIcon,
  RepeatIcon,
  SettingsIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import mainSettingsStyles from './MainSettings.module.css';

export const MainSettings: React.FC = () => {
  return (
    <div className={mainSettingsStyles['ms-wrapper']}>
      <div className={mainSettingsStyles['ms-today']}>
        <h2 className={mainSettingsStyles['ms-today__title']}>Today</h2>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className={mainSettingsStyles['ms-buttons']}>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem icon={<ViewIcon />}>Show all tasks</MenuItem>
            <MenuItem icon={<CheckIcon />}>View completed tasks</MenuItem>
            <MenuItem icon={<CalendarIcon />}>View to-do items</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={IconButton} aria-label="Settings" icon={<SettingsIcon />} />
          <MenuList>
            <MenuItem icon={<RepeatIcon />}>Clear all</MenuItem>
            <MenuItem icon={<CheckIcon />}>Clear all done tasks</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
