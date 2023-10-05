import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AdminGridWrap, AdminLayout, BoardHeader } from './styles';
import Grid from '@components/Grid';
import Buttons from '@components/Buttons';
import { IButtonProps } from '@typings/Buttons';
import DefaultPopup from '@components/Popup/DefaultPopup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IDynamicProps } from '@typings/Props';
import { AgGridReact } from 'ag-grid-react';
import InputText from '@components/InputText';
import useInput from '@hooks/useInput';
import { Condition } from '../XM_101W/styles';
import { IInputProps } from '@typings/Input';
import columnDefHelper from '@utils/columnDefHelper';
import gridHelper from '@utils/gridHelper';
import _ from 'lodash';

const Form: FC<IDynamicProps> = ({ divCd, menuId }) => {
  const gridRef = useRef<AgGridReact>(null);
  const inputRefs = useRef<{ [key: string]: React.MutableRefObject<HTMLInputElement | null> }>({});
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowList, setRowList] = useState<any>([]);
  const [tempList, setTempList] = useState<any>([]);
  const [inputValue, onChangeInputValue, setInputValue] = useInput<IInputProps>({ code: '', text: '' });
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [popupUrl, setPopupUrl] = useState<string>();
  const [popupData, setPopupData] = useState<any>();
  const [popupTitle, setPopupTitle] = useState<string>('');
  const { getAxiosColumnHeader } = columnDefHelper();
  const { cancelRow, addRow, deleteRow } = gridHelper(gridRef);
  const [buttonProps, setButtonProps] = useState<IButtonProps[]>([
    { buttonTitle: '조회', key: 'SEARCH', enable: true },
    { buttonTitle: '추가', key: 'APPEND', enable: true },
    { buttonTitle: '저장', key: 'SAVE', enable: true },
    { buttonTitle: '취소', key: 'CANCEL', enable: true },
    { buttonTitle: '삭제', key: 'DELETE', enable: true },
  ]);

  useEffect(() => {
    if (!(divCd && menuId)) return;
    getAxiosColumnHeader(
      '/api/menu/menu-columns',
      {
        DIV_CD: divCd,
        MENU_ID: menuId,
        MENU_TAB_NO: 1,
      },
      (colDefs: any) => {
        setColumnDefs(colDefs);
      },
    );
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupShow(false);
  }, []);

  const confirmPopup = useCallback(
    (rowData: any) => {
      if (!rowData) return;
      closePopup();
      setInputValue({
        code: rowData[0].C_MENU_ID,
        text: rowData[0].C_MENU_NM,
      });
      handleSearch();
    },
    [inputValue],
  );

  const onOpenPopup = () => {
    setIsPopupShow(true);
    setPopupUrl('/api/popup/program-popup-list');
    setPopupData({
      TYPE: 'program',
      MENU_ID: '',
    });
    setPopupTitle('메뉴컬럼 등록 팝업');
  };

  const onMenuButtonClick = (type: string) => {
    const actionMap = {
      SEARCH: handleSearch,
      DELETE: handleDelete,
      APPEND: handleAppend,
      SAVE: handleSave,
      CANCEL: handleCancel,
    };
    const actionFunction = actionMap[type as keyof typeof actionMap];
    if (actionFunction) {
      actionFunction();
    }
  };

  const handleSearch = useCallback(() => {
    const { result, inputCode } = checkInfo();
    if (!result) return;

    axios
      .post(
        '/api/x/xm/xm_102w/search',
        {
          DIV_CD: divCd,
          MENU_ID: inputCode.value,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.success) {
          const rows = res.data.response;
          setRowList(rows);
          setTempList(_.cloneDeep(rows));
        } else {
          toast.error(res.data.msg);
        }
      });
  }, [inputValue]);

  const checkInfo = () => {
    const inputCode = inputRefs.current['input1-code'].current;
    const inputText = inputRefs.current['input1-text'].current;
    if (!inputCode?.value) {
      inputCode?.focus();
      return { result: false, inputCode: inputCode!, inputText: inputText! };
    }
    return { result: true, inputCode: inputCode!, inputText: inputText! };
  };

  const handleSave = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {
    deleteRow();
  }, []);

  const handleAppend = useCallback(() => {
    const { result, inputCode, inputText } = checkInfo();
    if (!result) return;
    const rowAddInfo = createNewRow();
    rowAddInfo.MENU_ID = inputCode.value;
    rowAddInfo.MENU_NM = inputText.value;
    rowAddInfo.DIV_CD = divCd;
    addRow(rowAddInfo as any);
  }, []);

  const handleCancel = useCallback(() => {
    cancelRow(tempList);
  }, [tempList, rowList]);

  const onCellValueChanged = useCallback((ev: any) => {
    console.log(ev);
  }, []);

  const createNewRow = () => {
    return {
      GU: '추가',
      COL_EDIT: 'Y',
      COL_EDITTYPE: 'S',
      COL_TYPE: '0',
      COL_FIXED: 'N',
      COL_HA: '1',
      COL_VA: '1',
      COL_HIDDEN: 'N',
      COL_NO: 0,
      COL_WIDTH: 100,
      DIV_CD: '',
      MENU_ID: '',
      MENU_NM: '',
      MENU_TAB_NO: 1,
    };
  };

  return (
    <>
      {isPopupShow && (
        <DefaultPopup
          isShow={isPopupShow}
          closePopup={closePopup}
          confirmPopup={confirmPopup}
          popupUrl={popupUrl}
          popupData={popupData}
          popupTitle={popupTitle}
        />
      )}
      <AdminLayout className={'XM_102W'}>
        <BoardHeader>
          <Condition>
            <InputText
              inputId={'input1'}
              inputTitle={'프로그램ID'}
              inputValue={inputValue}
              onOpenPopup={onOpenPopup}
              onInputChange={onChangeInputValue}
              inputRefs={inputRefs}
            ></InputText>
          </Condition>
          <Condition>
            <Buttons buttonProps={buttonProps} menuButtonClick={onMenuButtonClick} />
          </Condition>
        </BoardHeader>
        <AdminGridWrap>
          <Grid
            ref={gridRef}
            gridId={`${menuId}-g1`}
            columnDefs={columnDefs}
            rowList={rowList}
            onCellValueChanged={onCellValueChanged}
            onCellEditingStopped={undefined}
          />
        </AdminGridWrap>
      </AdminLayout>
    </>
  );
};

export default Form;
