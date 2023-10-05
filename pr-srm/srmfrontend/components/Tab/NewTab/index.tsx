import React, { VFC, useEffect, useState } from 'react';
import { IDropItem } from '@typings/DropItem';

interface Props {
  value: string;
  item: IDropItem;
  active: string;
  tabCloseEventHandler: (value: string, active: boolean) => void;
  tabClickEventHandler: (item: IDropItem) => void;
}

const NewTap: VFC<Props> = ({ item, value, active, tabClickEventHandler, tabCloseEventHandler }) => {
  const onClickTab = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // div 태그 일경우 그냥 선택
    if (ev.target instanceof HTMLDivElement) {
      tabClickEventHandler(item);
      return;
    }
    tabCloseEventHandler(value, active === 'actived');
  };

  return (
    <li>
      <div title={item.C_MENU_ID} className={active} onClick={onClickTab}>
        <span></span>
        {item.C_MENU_NM}
        <span>&times;</span>
      </div>
    </li>
  );
};
export default NewTap;
