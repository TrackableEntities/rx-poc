import { INotifyInfo } from './notify-info';

export interface IPropertyNotifyInfo extends INotifyInfo {
  key?: string;
  origValue?: any;
  currentValue?: any;
}
