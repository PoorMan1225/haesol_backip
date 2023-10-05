import React, { useMemo, forwardRef } from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

interface Props {
  rowList: any;
  columnDefs: any;
  gridId: string;
  onCellValueChanged: ((ev: any) => void) | undefined;
  onCellEditingStopped: ((ev: any) => void) | undefined;
}

const Grid = forwardRef<AgGridReact, Props>((props, ref) => {
  const { rowList, columnDefs, gridId, onCellValueChanged, onCellEditingStopped } = props;

  const defaultColDef = useMemo(
    () => ({
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    }),
    [],
  );

  return (
    <div>
      <div className="ag-theme-alpine"  style={{width: '100%', height: '100%'}}>
        <AgGridReact
          ref={ref} // Ref for accessing Grid's API
          gridId={gridId}
          groupHeaderHeight={35}
          headerHeight={35}
          rowHeight={35}
          // enableRangeSelection={true}
          rowData={rowList} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellValueChanged={onCellValueChanged}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
});

export default Grid;
