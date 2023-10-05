import { IDropItem } from '@typings/DropItem';

export interface ILeftItem {
  parentItem: IDropItem;
  childItem: IDropItem | undefined;
}
