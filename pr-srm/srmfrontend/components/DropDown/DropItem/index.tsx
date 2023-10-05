import React, { MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState, VFC } from 'react';
import { IDropItem } from '@typings/DropItem';
import Dropdown from '@components/DropDown/Drop';
import { DropMenuItems } from '@components/DropDown/DropItem/styles';

interface Props {
  items: IDropItem;
  depthLevel: number;
  setEvent: (item: IDropItem) => void;
}
const DropItem: VFC<Props> = ({ items, depthLevel, setEvent }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      // dom 외부에 있으면 닫음. 그리고 드롭다운이 트루면 터치했을때 닫음
      // 전역 이벤트라서 모든 MenuItems 가 동작하게 됨.
      // 그래서 target 이 아닌 MenuItems 은 닫히게 됨.
      if (dropdown && !ref.current?.contains(event.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    console.log(window.innerWidth);
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    console.log(window.innerWidth);
    // 모바일에서는 드롭다운 동작안하게 하려고 설정한 것.,
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = useCallback(
    (ev: any) => {
      // ev.stopPropagation();
      dropdown && setDropdown(false);
    },
    [dropdown],
  );

  const onProgramClick = (ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    // ev.stopPropagation();
    setEvent(items); // 상위에 items 전달
  };

  return (
    <DropMenuItems
      ref={ref}
      depthLevel={depthLevel}
      dropdown={dropdown}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.SUB_MENUS && items.SUB_MENUS.length > 0 ? (
        <>
          <button
            type="button"
            aria-expanded={dropdown ? 'true' : 'false'}
            aria-haspopup="menu"
            onClick={(ev) => {
              // dropdown 버튼은 아래에만 영향을 받아야 한다.
              // 같은 레벨에 있는 버튼도 다 이벤트 전파가 안되기 때문에 상위에서 이벤트를 걸어줘야 한다.
              ev.stopPropagation();
              setDropdown((prev) => !prev);
            }}
          >
            {items.C_MENU_NM} {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown dropdown={dropdown} depthLevel={depthLevel} submenus={items.SUB_MENUS} setEvent={setEvent} />
        </>
      ) : (
        <button onClick={onProgramClick} type="button" aria-expanded={dropdown ? 'true' : 'false'} aria-haspopup="menu">
          {items.C_MENU_NM}
        </button>
        // <a>{items.title}</a>
      )}
    </DropMenuItems>
  );
};

export default DropItem;
