import { Subject } from 'rxjs/Subject';

import { PropertyNotifyInfo } from './observable-entity';
import { ObservableSet } from './observable-set';
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

  private setTracking() {
    if (this._tracking === true) {
      const addIndex = this.addListeners.indexOf(this._addListener);
      if (addIndex < 0) {
        this._addListener.subscribe(item => {
          if (item) {
            item.TrackingState = TrackingState.Added;
          }
        });
        this.addListeners.push(this._addListener);
      }
      const removeIndex = this.removeListeners.indexOf(this._removeListener);
      if (removeIndex < 0) {
        this._removeListener.subscribe(item => {
          if (item) {
            item.TrackingState = TrackingState.Deleted;
            this.deletedEntities.add(item[0]);
          }
        });
        this.removeListeners.push(this._removeListener);
      }
      [...this].forEach(item => {
        const updateIndex = item.updateListeners.indexOf(this._updateListener);
        if (updateIndex < 0) {
          item.updateListeners.push(this._updateListener);
          this._updateListener.subscribe(propInfo => {
            if (this.tracking === true && (propInfo.origValue !== propInfo.value)) {
              item.TrackingState = TrackingState.Modified;
              item.ModifiedProperties.add(propInfo.key);
            }
          });
        }
      });
    } else {
      const addIndex = this.addListeners.indexOf(this._addListener);
      if (addIndex >= 0) {
        this._addListener.unsubscribe();
        this.addListeners.splice(addIndex, this.addListeners.length);
      }
      const removeIndex = this.removeListeners.indexOf(this._removeListener);
      if (removeIndex >= 0) {
        this._removeListener.unsubscribe();
        this.deletedEntities.clear();
        this.removeListeners.splice(addIndex, this.removeListeners.length);
      }
    }
  }
}
