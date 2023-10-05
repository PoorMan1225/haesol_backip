import React, { useEffect } from 'react';
import { PopupRenderWrapper, PopupValue } from '@components/Grid/CellEditor/PopupRender/styles';
import { IPopupCellRenderParams } from '@typings/Props';

export default (props: IPopupCellRenderParams) => {
  useEffect(() => {
    console.log(props);
  }, []);
  const onClick = (ev: any) => {
    ev.preventDefault();
    console.log(ev);
  };

  return (
    <PopupRenderWrapper>
      <PopupValue width={`${props.colWidth - 30}px`}>{props.value}</PopupValue>
      <button onClick={onClick} onDoubleClick={onClick}>
        &nbsp;&nbsp;&nbsp;
      </button>
    </PopupRenderWrapper>
  );
};
