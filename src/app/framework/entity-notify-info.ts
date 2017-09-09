import { INotifyInfo } from './notify-info';
import { TrackableEntity } from './trackable-entitiy';

export interface IEntityNotifyInfo<TEntity extends TrackableEntity> extends INotifyInfo {
  key?: any;
  origValue?: TEntity;
  currentValue?: TEntity;
}
