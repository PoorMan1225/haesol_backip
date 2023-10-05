import React, { VFC } from 'react';
import { ItemsContainer } from '@components/DropDown/DropItems/styles';
import DropWrapper from '@components/DropDown/DropWrapper';
import { IDropItem } from '@typings/DropItem';

interface Props {
  dropMenuList: IDropItem[];
  setEvent: (target: IDropItem) => void;
}
const DropItems: VFC<Props> = ({ dropMenuList, setEvent }) => {
  return (
    <ItemsContainer>
      <div className={'drop-area'}>
        <DropWrapper dropMenuList={dropMenuList} setEvent={setEvent} />
      </div>
    </ItemsContainer>
  );
};

export default DropItems;
