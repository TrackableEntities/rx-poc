import { TrackableHelper } from './trackable-helper';
import { Subject } from 'rxjs/Subject';

import { ObservableSet } from './observable-set';
import { PropertyNotifyInfo } from './property-notify-info';
import { ITrackable, TrackingState } from './trackable';
import { TrackableEntity } from './trackable-entitiy';

export class TrackableSet<TEntity extends TrackableEntity> extends ObservableSet<TEntity> {

  private _tracking: boolean;
  private _updateListener = new Subject<PropertyNotifyInfo>();
  private _addListener = new Subject<TEntity>();
  private _removeListener = new Subject<TEntity>();

  deletedEntities = new Set<ITrackable>();

  constructor(...items: TEntity[]) {
    super(...items);
  }

  get tracking(): boolean {
    return this._tracking;
  }

  set tracking(value: boolean) {
    this._tracking = value;
    this.setTracking();
  }

  private setTracking(): void {
    TrackableHelper.setTrackingForSet(this, this._updateListener, this._addListener, this._removeListener);
  }
}
