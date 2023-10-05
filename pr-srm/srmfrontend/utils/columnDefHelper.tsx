import axios from 'axios';
import { toast } from 'react-toastify';
import DropCellRender from '@components/Grid/CellEditor/DropCellRender';
import DropCellEditor from '@components/Grid/CellEditor/DropCellEditor';
import NumberEditor from '@components/Grid/CellEditor/NumberEditor';
import NumberRender from '@components/Grid/CellEditor/NumberRender';
import PopupRender from '@components/Grid/CellEditor/PopupRender';

const columnDefHelper = () => {
  const getAxiosColumnHeader = (url: string, data: any, action: (colDefs: any) => void) => {
    if (!(url && data)) return;

    axios
      .post(url, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          if (!res.data.response) return;
          const coldefs = settingColumnDefinition(res.data.response);
          action(coldefs);
        } else {
          toast.error(res.data.msg);
        }
      });
  };

  const getColTypeDef = (colInfo: any) => {
    // 컬럼 정보가 cellEditor 가 우선하고
    // 그다음에 데이터 정보 타입이 적용됨.

    const DropCellEditorParams = {
      values: colInfo.DROP_VALUES,
      colWidth: colInfo.COL_WIDTH * 1.3,
    };

    const NumberCellEditorPrams = {
      colDataType: colInfo.COL_EDITTYPE,
    };

    const PopupCellRenderParams = {
      colWidth: colInfo.COL_WIDTH * 1.3,
    };

    switch (colInfo.COL_TYPE) {
      case '0':
        return colInfo.COL_EDITTYPE === 'S'
          ? [undefined, undefined, undefined]
          : [NumberEditor, NumberRender, NumberCellEditorPrams];
      case '1':
        return [undefined, undefined, undefined]; // 체크 박스
      case '2':
        return [undefined, PopupRender, PopupCellRenderParams]; // 팝업 버튼
      case '3':
        return [DropCellEditor, DropCellRender, DropCellEditorParams];
      case '4':
        return [undefined, undefined, undefined]; //  날짜
      case '5':
        return [undefined, undefined, undefined]; // 체크박스
      case '6':
        return [undefined, undefined, undefined]; // 날짜 시간
      case '7':
        return [undefined, undefined, undefined]; // 버튼
      case '8':
        return [undefined, undefined, undefined]; // 시간
    }
  };

  const cellRenderType = (typeDef: any) => {
    return typeDef[1] === undefined ? undefined : typeDef[1];
  };

  const cellEditType = (typeDef: any) => {
    return typeDef[0] === undefined ? undefined : typeDef[0];
  };

  const cellPramsType = (typeDef: any) => {
    return typeDef[2] === undefined ? undefined : typeDef[2];
  };

  const cellStyle = (columnInfo: any) => {
    return {
      color: columnInfo.COL_ID === 'GU' ? 'tomato' : 'black',
      'font-family': 'S-CoreDream',
      'font-size': '12px',
    };
  };

  const settingColumnDefinition = (response: any) => {
    const colDefs = [];
    for (let i = 0; i < response.length; i++) {
      const columnInfo = response[i];
      const colTypeDef = getColTypeDef(columnInfo);
      console.log(columnInfo);
      colDefs.push({
        headerName: columnInfo.COL_NM,
        field: columnInfo.COL_ID,
        hide: columnInfo.COL_HIDDEN == 'Y',
        editable: columnInfo.COL_EDIT == 'Y',
        width: columnInfo.COL_WIDTH * 1.3,
        floatingFilter: false,
        cellRenderer: cellRenderType(colTypeDef),
        cellRendererParams: cellPramsType(colTypeDef),
        cellStyle: cellStyle(columnInfo),
        cellEditor: cellEditType(colTypeDef),
        cellEditorPopup: columnInfo.COL_MCD !== '',
        cellEditorPopupPosition: columnInfo.COL_MCD !== '' ? 'under' : undefined,
        cellEditorParams: cellPramsType(colTypeDef),
      });
    }
    return colDefs;
  };

  return {
    getAxiosColumnHeader,
  };
};

export default columnDefHelper;
