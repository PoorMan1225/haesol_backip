import React, { FC, useCallback, useEffect } from 'react';
import { DropDownCellItemWrapper } from '@components/Grid/CellEditor/DropCellEditor/DropCellItem/styles';
import { IDropCellProps } from '@typings/Props';

interface Props {
  dropValue: IDropCellProps;
  onClickDropCellItemHandler: (dropValue: IDropCellProps) => void;
  activeValue: IDropCellProps;
}

const DropCellItem: FC<Props> = ({ dropValue, onClickDropCellItemHandler, activeValue }) => {
  const onClickDropCellItem = useCallback((ev: any) => {
    onClickDropCellItemHandler(dropValue);
  }, []);

  return (
    <DropDownCellItemWrapper
      isActive={activeValue ? activeValue.CODE === dropValue.CODE : false}
      onClick={onClickDropCellItem}
    >
      <div
        style={{
          width: '20%',
          height: '100%',
          display: 'flex',
          placeItems: 'center',
          justifyContent: 'center',
          background: '#BB0000',
          fontWeight: '600',
          color: '#fff',
          borderRadius: '0.2rem',
          fontFamily: 'S-CoreDream',
        }}
      >
        {dropValue.CODE}
      </div>
      <div
        style={{
          width: '80%',
          display: 'flex',
          placeItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          borderRadius: '0.2rem',
          fontFamily: 'S-CoreDream',
        }}
      >
        {dropValue.NAME}
      </div>
    </DropDownCellItemWrapper>
  );
};

export default DropCellItem;
