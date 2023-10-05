import React, { useEffect, useState } from 'react';
import { IDropCellParams } from '@typings/Props';
import { DropRenderWrapper } from '@components/Grid/CellEditor/DropCellRender/styles';

export default (props: IDropCellParams) => {
  const [dropName, setDropName] = useState('');

  useEffect(() => {
    const dropValues = props.values;
    const drop = dropValues.find((drop: any) => drop.CODE === props.value);
    if (!drop) {
      setDropName(props.value);
    } else {
      setDropName(drop.NAME);
    }
  }, [props]);

  return (
    <DropRenderWrapper>
      <div>{dropName && dropName}</div>
      <div className={'drop-emotion'}>▼</div>
    </DropRenderWrapper>
  );
};
