import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

const gridHelper = (gridRef: React.RefObject<AgGridReact>) => {
  const getRowCount = () => {
    return gridApi()?.getDisplayedRowCount();
  };

  const getSelectedRows = () => {
    return gridApi()?.getSelectedRows();
  };

  const gridApi = () => {
    return gridRef.current?.api;
  };

  const getRowIndex = () => {
    let rows: any | undefined = gridApi()?.getSelectedNodes();

    if (rows.length < 1) return -1;

    return rows[rows.length - 1].rowIndex; //선택된 row 중 가장 마지막 인덱스
  };

  const addRow = (emptyRow: any[] | null | undefined, count = getRowCount()) => {
    let activeRow = getRowIndex();

    if (activeRow > 0) {
      gridApi()?.applyTransaction({ add: [emptyRow], addIndex: activeRow + 1 });
      const node = gridApi()?.getDisplayedRowAtIndex(activeRow + 1);
      if (node) node.setSelected(true);
    } else {
      if (!count) return;
      gridApi()?.applyTransaction({ add: [emptyRow], addIndex: count });
      const node = gridApi()?.getDisplayedRowAtIndex(count);
      if (node) node.setSelected(true);
    }
  };

  const cancelRow = (temp: any) => {
    const rows = getSelectedRows();
    if (!rows || rows.length <= 0) return;
    if (!temp || temp.length <= 0) return;

    const addRows = rows.filter((row) => row.GU === '추가');
    gridApi()?.applyTransaction({ remove: addRows });

    const itemsToUpdate: any = [];
    // 이거안쓰면 selected rows 가 이상하게 들어올 수 있담.
    gridApi()?.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      const data = rowNode.data;
      if (data.GU === '삭제' || data.GU === '삭제') {
        const updateData = Object.assign(data, { ...temp[index] });
        itemsToUpdate.push(updateData);
      }
    });
    gridApi()?.applyTransaction({ update: itemsToUpdate });
  };

  const deleteRow = () => {
    const rows = getSelectedRows();
    if (!rows) return;

    const addArray = [];
    const deleteArray = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].GU === '추가') {
        deleteArray.push(rows[i]);
      } else {
        rows[i].GU = '삭제';
        addArray.push(rows[i]);
      }
    }
    gridApi()?.applyTransaction({ update: addArray });
    gridApi()?.applyTransaction({ remove: deleteArray });
  };

  const gridClear = () => {
    const rowData: any[] = [];
    gridApi()?.forEachNode(function (node) {
      rowData.push(node.data);
    });
    // console.log(rowData);
    gridApi()?.applyTransaction({ remove: rowData });
  };

  const getDatesource = () => {};

  return {
    getRowCount,
    getSelectedRows,
    addRow,
    deleteRow,
    gridClear,
    cancelRow,
  };
};

export default gridHelper;
