export interface IDropItem {
  DIV_CD: string;
  P_MENU_ID: string;
  P_MENU_TYPE: string;
  C_MENU_ID: string;
  C_MENU_TYPE: string;
  C_MENU_NM: string;
  MENU_LVL: string;
  MENU_SEQ: string;
  USE_YN: string;
  ICON_NO: string;
  PATH: string;
  PATH_STRING: string;
  SUB_MENUS: IDropItem[];
}
