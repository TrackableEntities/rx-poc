import { TrackableHelper } from './trackable-helper';
import { Subject } from 'rxjs/Subject';

import { ObservableMap } from './observable-map';
import { PropertyNotifyInfo } from './property-notify-info';
import { ITrackable, TrackingState } from './trackable';
import { TrackableEntity } from './trackable-entitiy';

export class TrackableMap<TKey, TEntity extends TrackableEntity> extends ObservableMap<TKey, TEntity> {

  private _tracking: boolean;
  private _updateListener = new Subject<PropertyNotifyInfo>();
  private _addListener = new Subject<[TKey, TEntity]>();
  private _removeListener = new Subject<[TKey, TEntity]>();

  deletedEntities = new Set<ITrackable>();

  constructor(...entries: [TKey, TEntity][]) {
    super(...entries);
  }

  get tracking(): boolean {
    return this._tracking;
  }

  set tracking(value: boolean) {
    this._tracking = value;
    this.setTracking();
  }

  private setTracking() {
    TrackableHelper.setTrackingForMap(this, this._updateListener, this._addListener, this._removeListener);
  }
}
