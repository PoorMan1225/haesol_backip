import React, { VFC } from 'react';
import { IDropItem } from '@typings/DropItem';
import LeftMenuChildItem from '@components/LeftMenu/LeftMenuChildItem';
import { LeftMenuChildItemLv2Wrapper } from './styles';

interface Props {
  subMenu: IDropItem | null;
  isSubMenuOpen: boolean;
  activeMenuItem: IDropItem | null;
  isSideActive: boolean;
  onClickMenuItem: (item: IDropItem | null) => void | null;
}

/**
 * 레벨 2단계 li
 * @param subMenu           표현할 서브 메뉴
 * @param isSubMenuOpen     drop 다운에서 선택된 메뉴 서브메뉴가 블락 되거나 none 됨
 * @param activeMenuItem    드롭다운에서 선택된 activeMenu
 * @param isSideActive      상위 레벨 1 단계가 확장 되었는지 여부
 * @param onClickMenuItem   메뉴 클릭 이벤트 핸들러
 * @constructor
 */
const LeftMenuChildItemLv2: VFC<Props> = ({
  subMenu,
  isSubMenuOpen,
  activeMenuItem,
  isSideActive,
  onClickMenuItem,
}) => {
  // 서브메뉴가 확장 됨에 따라서 css display black, none 이 결정된다.
  return (
    <LeftMenuChildItemLv2Wrapper className="admin_sub_menu" isSubMenuOpen={isSubMenuOpen}>
      {subMenu?.SUB_MENUS.map((menuItem, index) => {
        const isMenuItemActive = !activeMenuItem
          ? isSideActive && index === 0
          : menuItem.C_MENU_ID === activeMenuItem.C_MENU_ID;

        return (
          <LeftMenuChildItem
            key={menuItem.C_MENU_ID}
            menuItem={menuItem}
            isMenuItemActive={isMenuItemActive} // 서브메뉴 선택 액티브
            onClickMenuItem={onClickMenuItem}
          />
        );
      })}
    </LeftMenuChildItemLv2Wrapper>
  );
};

export default LeftMenuChildItemLv2;
