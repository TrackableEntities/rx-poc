import { Subject } from 'rxjs/Subject';

import { IDeletedEntities } from './deleted-entitites';
import { IEntityNotifyInfo } from './entity-notify-info';
import { IPropertyNotifyInfo } from './property-notify-info';
import { TrackingState } from './trackable';
import { ITrackableCollection } from './trackable-collection';
import { TrackableEntity } from './trackable-entitiy';

export abstract class TrackableHelper {

  public static setTracking<TEntity extends TrackableEntity>(
    trackable: ITrackableCollection<TEntity>,
    deletedEntities: IDeletedEntities,
    updateListener: Subject<IPropertyNotifyInfo>,
    addListener: Subject<IEntityNotifyInfo<TEntity>>,
    removeListener: Subject<IEntityNotifyInfo<TEntity>>): void {

    if (trackable.tracking === true) {
      const addIndex = trackable.addListeners.indexOf(addListener);
      if (addIndex < 0) {
        addListener.subscribe(notifyInfo => {
          if (notifyInfo && notifyInfo.currentValue) {
            notifyInfo.currentValue.TrackingState = TrackingState.Added;
          }
        });
        trackable.addListeners.push(addListener);
      }
      const removeIndex = trackable.removeListeners.indexOf(removeListener);
      if (removeIndex < 0) {
        removeListener.subscribe(notifyInfo => {
          if (notifyInfo && notifyInfo.currentValue) {
            notifyInfo.currentValue.TrackingState = TrackingState.Deleted;
            if (deletedEntities.add) {
              deletedEntities.add(notifyInfo.currentValue);
            } else if (deletedEntities.set) {
              deletedEntities.set(notifyInfo.key, notifyInfo.currentValue);
            }
          }
        });
        trackable.removeListeners.push(removeListener);
      }
      // [...trackable].forEach(item => {
      //   const updateIndex = item.updateListeners.indexOf(updateListener);
      //   if (updateIndex < 0) {
      //     item.updateListeners.push(updateListener);
      //     updateListener.subscribe(propInfo => {
      //       if (trackable.tracking === true && (propInfo.origValue !== propInfo.currentValue)) {
      //         item.TrackingState = TrackingState.Modified;
      //         item.ModifiedProperties.add(propInfo.key);
      //       }
      //     });
      //   }
      // });
    } else {
      const addIndex = trackable.addListeners.indexOf(addListener);
      if (addIndex >= 0) {
        addListener.unsubscribe();
        trackable.addListeners.splice(addIndex, trackable.addListeners.length);
      }
      const removeIndex = trackable.removeListeners.indexOf(removeListener);
      if (removeIndex >= 0) {
        removeListener.unsubscribe();
        deletedEntities.clear();
        trackable.removeListeners.splice(addIndex, trackable.removeListeners.length);
      }
    }
  }
}
