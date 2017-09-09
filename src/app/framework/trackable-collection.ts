import { IObservableCollection } from './observable-collection';

export interface ITrackableCollection<TEntity> extends IObservableCollection<TEntity> {
  tracking: boolean;
}
