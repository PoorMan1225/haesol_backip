import React, { VFC } from 'react';
import { IDropItem } from '@typings/DropItem';
import DropItem from '@components/DropDown/DropItem';
import { DropDownWrapper } from '@components/DropDown/Drop/styles';

interface Props {
  submenus: IDropItem[];
  dropdown: boolean;
  depthLevel: number;
  setEvent: (item: IDropItem) => void;
}
const Dropdown: VFC<Props> = ({ submenus, dropdown, depthLevel, setEvent }) => {
  depthLevel = depthLevel + 1;
  // const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <DropDownWrapper isDrop={dropdown} depthLevel={depthLevel}>
      {submenus.map((submenu, index) => (
        <DropItem items={submenu} key={index} depthLevel={depthLevel} setEvent={setEvent} />
      ))}
    </DropDownWrapper>
  );
};

export default Dropdown;
