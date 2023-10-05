import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AdminGridWrap, AdminLayout, BoardHeader, Button, Condition } from './styles';
import Grid from '@components/Grid';
import RadioGroup from '@components/RadioGroup';
import Buttons from '@components/Buttons';
import { IButtonProps } from '@typings/Buttons';
import DefaultPopup from '@components/Popup/DefaultPopup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IDynamicProps } from '@typings/Props';
import { AgGridReact } from 'ag-grid-react';
import InputText from '@components/InputText';
import { IInputProps } from '@typings/Input';
import columnDefHelper from '@utils/columnDefHelper';
import gridHelper from '@utils/gridHelper';
import _ from 'lodash';

const Form: FC<IDynamicProps> = ({ divCd, menuId }) => {
  const gridRef = useRef<AgGridReact>(null);
  const inputRefs = useRef<{ [key: string]: React.MutableRefObject<HTMLInputElement | null> }>({});
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [tempList, setTempList] = useState<any>([]);
  const [inputValue, setInputValue] = useState<IInputProps>({ code: '', text: '' });
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [popupUrl, setPopupUrl] = useState<string>();
  const [popupData, setPopupData] = useState<any>();
  const [popupTitle, setPopupTitle] = useState<string>('');
  const { getAxiosColumnHeader } = columnDefHelper();
  const { cancelRow, addRow, deleteRow } = gridHelper(gridRef);

  const [radioValues, setRadioValues] = useState([
    { radioValue: 'A', radioTitle: '전체', enable: true, checked: true },
    { radioValue: 'Y', radioTitle: '예', enable: true, checked: false },
    { radioValue: 'N', radioTitle: '아니오', enable: true, checked: false },
  ]);

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
      TYPE: 'module',
      MENU_ID: '',
    });
    setPopupTitle('프로그램 메뉴 팝업');
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

  const onRadioChange = useCallback(
    (value: string) => {
      setRadioValues((prevRadioValue) =>
        prevRadioValue.map((radio) => {
          radio.checked = radio.radioValue === value;
          return radio;
        }),
      );
    },
    [radioValues],
  );

  const onChangeInputValue = useCallback(
    (ev: any) => {
      setInputValue({ code: ev.target.value, text: inputValue.text });
    },
    [inputValue],
  );

  const handleSearch = useCallback(() => {
    const rValue = radioValues.find((value) => value.checked);
    if (!rValue) return;

    axios
      .post(
        '/api/x/xm/xm_101w/search',
        {
          DIV_CD: divCd,
          P_MENU_ID: inputRefs.current['input1-code'].current?.value ?? '',
          USE_YN: rValue?.radioValue,
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
  }, [inputValue, radioValues]);

  const handleAppend = useCallback(() => {
    const rowAddInfo = createNewRow();
    addRow(rowAddInfo as any);
  }, []);

  const handleCancel = useCallback(() => {
    cancelRow(tempList);
  }, [tempList, rowList]);

  const handleSave = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {}, []);

  const createNewRow = () => {
    return {
      GU: '추가',
      C_MENU_ID: '',
      C_MENU_NM: '프로그램메뉴 등록',
      C_MENU_TYPE: 'P',
      DIV_CD: null,
      ICON_NO: '',
      MENU_LVL: '3',
      MENU_SEQ: '1',
      PATH: null,
      PATH_STRING: null,
      P_MENU_ID: 'XM',
      P_MENU_NM: '운영관리',
      P_MENU_TYPE: 'M',
      SUB_MENUS: null,
      USE_YN: true,
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
      <AdminLayout className={'XM_101W'}>
        <BoardHeader>
          <Condition>
            <InputText
              inputId={'input1'}
              inputTitle={'상위메뉴ID'}
              inputValue={inputValue}
              onOpenPopup={onOpenPopup}
              onInputChange={onChangeInputValue}
              inputRefs={inputRefs}
            ></InputText>
          </Condition>
          <Condition>
            <RadioGroup groupTitle={'사용여부'} radioValues={radioValues} onRadioChange={onRadioChange}></RadioGroup>
          </Condition>
          <Condition>
            <Buttons buttonProps={buttonProps} menuButtonClick={onMenuButtonClick} />
          </Condition>
        </BoardHeader>
        <AdminGridWrap>
          <Grid
            ref={gridRef}
            columnDefs={columnDefs}
            rowList={rowList}
            gridId={`${menuId}-g1`}
            onCellValueChanged={undefined}
            onCellEditingStopped={undefined}
          />
        </AdminGridWrap>
      </AdminLayout>
    </>
  );
};

export default Form;
