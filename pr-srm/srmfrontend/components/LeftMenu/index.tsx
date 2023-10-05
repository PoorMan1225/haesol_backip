import React, { VFC, useState, useEffect, useCallback } from 'react';
import {AdminFooter, AdminGnb, AdminLeftMenu, AdminTitle, FullButton} from './styles';
import { IDropItem } from '@typings/DropItem';
import LeftMenuChildItemLv1 from '@components/LeftMenu/LeftMenuChildItemLv1';

interface Props {
  showLeftMenu: boolean;
  onClickMenuItem: (item: IDropItem | null) => void;
  dropMenuList: IDropItem[] | undefined;
  activeMenuItem: IDropItem | null;
  onClickLeftMenu: () => void;
}

const LeftMenu: VFC<Props> = ({ showLeftMenu, onClickMenuItem, dropMenuList, activeMenuItem, onClickLeftMenu }) => {
  const [leftMenuData, setLeftMenuData] = useState<IDropItem | null>(null);

  useEffect(() => {
    if (!dropMenuList || dropMenuList.length <= 0) return;
    // 최초 랜더링 LeftMenu 초기화
    if (activeMenuItem == null) {
      setLeftMenuData(dropMenuList[0]);
      return;
    }
    // active 아이탬이 존재할 경우 부모를 찾아서 메뉴 초기화
    const split = activeMenuItem.PATH.split('/');
    const parentId = split[0];
    const findLeftMenuData = dropMenuList.find((menu) => menu.C_MENU_ID === parentId);
    if (!findLeftMenuData) return;
    setLeftMenuData(findLeftMenuData);
  }, [activeMenuItem, dropMenuList]);

  const onFullButtonClick = useCallback(() => {
    onClickLeftMenu();
  }, []);

  return (
    <AdminLeftMenu showLeftMenu={showLeftMenu}>
      <FullButton degrees={showLeftMenu ? 0 : 180} onClick={onFullButtonClick}></FullButton>
      <a href="/workspace/home" title="홈으로">
        {' '}
        <AdminTitle>관리자</AdminTitle>
      </a>
      <div className="clear"></div>
      <AdminGnb>
        {leftMenuData?.SUB_MENUS.map((subMenu, index) => {
          // 사이드 메뉴 확장 active 최초에는 index 0 인것을 확장하고
          // 선택된 메뉴가 존재할 경우에 해당 PATH 가 존재하는 녀석이 확장된다.
          const isSideActive = !activeMenuItem ? index === 0 : activeMenuItem.PATH.includes(subMenu.PATH);
          return (
            <LeftMenuChildItemLv1
              onClickMenuItem={onClickMenuItem}
              key={subMenu.C_MENU_ID}
              subMenu={subMenu}
              isSideActive={isSideActive}
              activeMenuItem={activeMenuItem}
            />
          );
        })}
      </AdminGnb>
      <AdminFooter>copyright (c) 해솔정보기술. all rights reserved</AdminFooter>
    </AdminLeftMenu>
  );
};
export default LeftMenu;
