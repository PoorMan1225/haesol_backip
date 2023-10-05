import React, { VFC, useEffect } from 'react';
import { IDropItem } from '@typings/DropItem';

interface Props {
  menuItem: IDropItem | null;
  isMenuItemActive: boolean;
  onClickMenuItem: (item: IDropItem | null) => void | null;
}

/**
 * 가장 베이스 하위메뉴 클릭시 모듈 변경 이벤트 핸들러 동작.
 * @param menuItem         어떤 녀석이 선택되었는지 선택된 녀석을 이벤트 핸들러에 던진다.
 * @param isMenuItemActive 확장 되었다면 클릭을 바로 해버림.
 * @param onClickMenuItem  모듈 전달 이벤트 핸들러
 * @constructor
 */
const LeftMenuChildItem: VFC<Props> = ({ menuItem, isMenuItemActive, onClickMenuItem }) => {
  useEffect(() => {
    isMenuItemActive && onClickMenuItem(menuItem ?? null);
  }, [menuItem, isMenuItemActive]);

  // usecallback 을 쓰니까 자꾸 메모제이션 한 함수 결과가 저장되는데 그렇게 하니까 초기화가 안됨
  // 각 모듈별로 함수가 초기화 되어야 하기 때문에 useCallback 쓰면 동작안함.
  const onMenuItemClick = () => {
    onClickMenuItem(menuItem ?? null);
  };

  return (
    <li>
      <a className={isMenuItemActive ? 'actived' : ''} onClick={onMenuItemClick}>
        {menuItem?.C_MENU_NM}
      </a>
    </li>
  );
};

export default LeftMenuChildItem;
