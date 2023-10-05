import { ICellEditorParams, ICellRendererParams } from 'ag-grid-community';

export interface IDynamicProps {
  divCd: string;
  menuId: string;
}

export interface IDropCellProps {
  CODE: string;
  NAME: string;
}

export interface IDropCellParams extends ICellEditorParams {
  values: IDropCellProps[];
  colWidth: string;
}

export interface IPopupCellRenderParams extends ICellEditorParams {
  colWidth: number;
}

export interface INumberCellPrams extends ICellEditorParams {
  colDataType: string;
}

export interface IDropCellRenderPrams extends ICellRendererParams {
  values: IDropCellProps[];
}
