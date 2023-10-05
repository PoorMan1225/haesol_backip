import React, { VFC, forwardRef, useImperativeHandle, useRef, FC } from 'react';
import { AdminGridWrap, AdminLayout, BoardHeader, Button, InputText, Select } from './styles';
import Grid from '@components/Grid';

interface DynamicComponentProps {
  openPopup: () => void;
  closePopup: () => void;
}

const Form: FC<DynamicComponentProps> = ({ openPopup, closePopup }) => {
  const gridRef = useRef<null>(null);

  return (
    <AdminLayout className={'BA_105W'}>
      {/* <BoardInformation>
                <p>총 : <span>120</span>건, 쪽번호 : <span>1</span> / <span>12</span></p>
            </BoardInformation> */}
      <BoardHeader>
        <div className="fr">
          <Select>
            <option value="0">상태(전체)</option>
            <option value="A">가입신청</option>
            <option value="D">삭제</option>
            <option value="P">승인</option>
          </Select>
          <InputText
            name="searchKeyword"
            type="text"
            size={35}
            placeholder="검색어를 입력하세요"
            title="검색어 입력"
          ></InputText>
          <Button>삭제</Button>
          {/* <Button>삭제</Button> */}
          {/* <Button>등록</Button> */}
        </div>
      </BoardHeader>
      <AdminGridWrap>{/*<Grid ref={gridRef} />*/}</AdminGridWrap>
    </AdminLayout>
  );
};

export default Form;
