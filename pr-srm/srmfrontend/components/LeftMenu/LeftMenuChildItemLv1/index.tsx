import React, { VFC, useCallback, useState, useEffect } from 'react';
import { IDropItem } from '@typings/DropItem';
import LeftMenuChildItemLv2 from '@components/LeftMenu/LeftMenuChildItemLv2';
import { LeftMenuChildItemLv1Wrapper } from '@components/LeftMenu/LeftMenuChildItemLv1/styles';

interface Props {
  subMenu: IDropItem | null;
  activeMenuItem: IDropItem | null;
  isSideActive: boolean;
  onClickMenuItem: (item: IDropItem | null) => void | null;
}

/**
 * 레벨 1단계 상위 ul
 * @param subMenu          하위 레벨 2 서브 메뉴들
 * @param activeMenuItem   드롭다운에서 선택된 activeMenuItem
 * @param isSideActive     확장 여부
 * @param onClickMenuItem  외부 모듈 선택 이벤트 헨들러
 * @constructor
 */
const LeftMenuChildItemLv1: VFC<Props> = ({ subMenu, activeMenuItem, isSideActive, onClickMenuItem }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(isSideActive);

  useEffect(() => {
    // side 메뉴 확장 플래그가 true 면 서브 메뉴를 확장한다.
    isSideActive && setSubMenuOpen(isSideActive);
  }, [activeMenuItem, subMenu, isSideActive]);

  const clickMainMenu = useCallback(() => {
    setSubMenuOpen((prev) => !prev);
  }, []);

  return (
    <LeftMenuChildItemLv1Wrapper active={isSideActive}>
      <p className="admin_main_menu" onClick={clickMainMenu}>
        <i className="fa fa-user" aria-hidden="true"></i>
        {subMenu?.C_MENU_NM}
        <i className="fa fa-angle-right fr" aria-hidden="true"></i>
      </p>
      <LeftMenuChildItemLv2
        subMenu={subMenu}
        isSubMenuOpen={subMenuOpen}
        activeMenuItem={activeMenuItem}
        isSideActive={isSideActive}
        onClickMenuItem={onClickMenuItem}
      />
    </LeftMenuChildItemLv1Wrapper>
  );
};

export default LeftMenuChildItemLv1;
