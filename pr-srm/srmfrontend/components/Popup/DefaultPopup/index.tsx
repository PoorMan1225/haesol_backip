import React, { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';
import {
  Popup,
  PopupButtonWrapper,
  PopupConditionWrapper,
  PopupContainer,
  PopupGridWrapper,
  PopupTitleWrapper,
} from './styles';
import { Button, InputText } from '@pages/BA/BA1/BA_105W/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';
import { CellDoubleClickedEvent } from 'ag-grid-community';

interface Props {
  isShow: boolean;
  closePopup: () => void;
  confirmPopup: (rowData: any) => void;
  popupUrl: string | undefined;
  popupData: any | undefined;
  popupTitle: string;
}

const DefaultPopup: VFC<Props> = ({ isShow, closePopup, confirmPopup, popupUrl, popupData, popupTitle }) => {
  const [inputValue, setInputValue] = useState('');
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [columList, setColumList] = useState<any>([]);
  const [rowList, setRowList] = useState<any>([]);
  const [innerPopupData, setInnerPopupData] = useState(popupData);
  const [innerPopupUrl, setInnerPopupUrl] = useState(popupUrl);

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    search();
  }, [innerPopupUrl, innerPopupData]);

  const search = useCallback(() => {
    if (!(innerPopupUrl && innerPopupData)) return;
    axios
      .post(innerPopupUrl, innerPopupData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.msg);
          return;
        }
        const columnList = res.data.response.columnList;
        const rowList = res.data.response.rowList;
        setColumList(columnList);
        setRowList(rowList);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [innerPopupUrl, innerPopupData]);

  const onCancelButton = useCallback(() => {
    closePopup();
  }, []);

  const onConfirmButton = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      confirmPopup(selectedRows);
    }
  }, []);

  const onChange = useCallback((ev: any) => {
    setInputValue(ev.target.value);
  }, []);

  const onClear = useCallback(() => {
    setInputValue('');
  }, []);

  const onSearch = useCallback(() => {
    const data = { ...innerPopupData };
    data.MENU_ID = !inputValue ? '' : inputValue;
    setInnerPopupData(data);
  }, [inputValue]);

  const onCellDoubleClicked = (ev: CellDoubleClickedEvent) => {
    confirmPopup([ev.data]);
  };

  return (
    <>
      <PopupContainer isShow={isShow}>
        <Popup>
          <PopupTitleWrapper>
            <div className={'popup-title'}>{popupTitle && popupTitle}</div>
            <span onClick={onCancelButton}>&times;</span>
          </PopupTitleWrapper>
          <PopupConditionWrapper>
            <div>
              <span>코드</span>
              <InputText
                name="searchKeyword"
                type="text"
                size={35}
                placeholder="검색어를 입력하세요"
                title="검색어 입력"
                value={inputValue}
                onChange={onChange}
              ></InputText>
              <Button onClick={onClear}>&lArr;</Button>
            </div>
            <Button onClick={onSearch}>조회</Button>
          </PopupConditionWrapper>
          <PopupGridWrapper>
            <div className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                onCellDoubleClicked={onCellDoubleClicked}
                groupHeaderHeight={35}
                headerHeight={35}
                rowData={rowList} // Row Data for Rows
                columnDefs={columList} // Column Defs for Columns
                defaultColDef={defaultColDef}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
              />
            </div>
          </PopupGridWrapper>
          <PopupButtonWrapper>
            <button onClick={onConfirmButton}>확인</button>
            <button onClick={onCancelButton}>취소</button>
          </PopupButtonWrapper>
        </Popup>
      </PopupContainer>
    </>
  );
};

export default DefaultPopup;
