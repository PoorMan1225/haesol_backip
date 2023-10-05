import React, { VFC } from 'react';
import DropItem from '@components/DropDown/DropItem';
import { DropMenus } from '@components/DropDown/DropWrapper/styles';
import { IDropItem } from '@typings/DropItem';

interface Props {
  dropMenuList: IDropItem[];
  setEvent: (target: IDropItem) => void;
}

const DropWrapper: VFC<Props> = ({ dropMenuList, setEvent }) => {
  return (
    <nav>
      <DropMenus>
        {dropMenuList.map((menu: IDropItem, index: React.Key | null | undefined) => {
          const depthLevel = 0;
          return <DropItem items={menu} key={index} depthLevel={depthLevel} setEvent={setEvent} />;
        })}
      </DropMenus>
    </nav>
  );
};

export default DropWrapper;
