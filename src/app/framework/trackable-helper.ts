import { TrackableMap } from './trackable-map';
import { Subject } from 'rxjs/Subject';

import { PropertyNotifyInfo } from './property-notify-info';
import { TrackingState } from './trackable';
import { TrackableEntity } from './trackable-entitiy';
import { TrackableSet } from './trackable-set';

export abstract class TrackableHelper {

  public static setTrackingForSet<TEntity extends TrackableEntity>(
    trackableSet: TrackableSet<TEntity>,
    updateListener: Subject<PropertyNotifyInfo>,
    addListener: Subject<TEntity>,
    removeListener: Subject<TEntity>): void {

    if (trackableSet.tracking === true) {
      const addIndex = trackableSet.addListeners.indexOf(addListener);
      if (addIndex < 0) {
        addListener.subscribe(item => {
          if (item) {
            item.TrackingState = TrackingState.Added;
          }
        });
        trackableSet.addListeners.push(addListener);
      }
      const removeIndex = trackableSet.removeListeners.indexOf(removeListener);
      if (removeIndex < 0) {
        removeListener.subscribe(item => {
          if (item) {
            item.TrackingState = TrackingState.Deleted;
            trackableSet.deletedEntities.add(item[0]);
          }
        });
        trackableSet.removeListeners.push(removeListener);
      }
      [...trackableSet].forEach(item => {
        const updateIndex = item.updateListeners.indexOf(updateListener);
        if (updateIndex < 0) {
          item.updateListeners.push(updateListener);
          updateListener.subscribe(propInfo => {
            if (trackableSet.tracking === true && (propInfo.origValue !== propInfo.value)) {
              item.TrackingState = TrackingState.Modified;
              item.ModifiedProperties.add(propInfo.key);
            }
          });
        }
      });
    } else {
      const addIndex = trackableSet.addListeners.indexOf(addListener);
      if (addIndex >= 0) {
        addListener.unsubscribe();
        trackableSet.addListeners.splice(addIndex, trackableSet.addListeners.length);
      }
      const removeIndex = trackableSet.removeListeners.indexOf(removeListener);
      if (removeIndex >= 0) {
        removeListener.unsubscribe();
        trackableSet.deletedEntities.clear();
        trackableSet.removeListeners.splice(addIndex, trackableSet.removeListeners.length);
      }
    }
  }

  public static setTrackingForMap<TKey, TEntity extends TrackableEntity>(
    trackableMap: TrackableMap<TKey, TEntity>,
    updateListener: Subject<PropertyNotifyInfo>,
    addListener: Subject<[TKey, TEntity]>,
    removeListener: Subject<[TKey, TEntity]>): void {

      if (trackableMap.tracking === true) {
      const addIndex = trackableMap.addListeners.indexOf(addListener);
      if (addIndex < 0) {
        addListener.subscribe(entry => {
          if (entry) {
            entry[1].TrackingState = TrackingState.Added;
          }
        });
        trackableMap.addListeners.push(addListener);
      }
      const removeIndex = trackableMap.removeListeners.indexOf(removeListener);
      if (removeIndex < 0) {
        removeListener.subscribe(entry => {
          if (entry) {
            entry[1].TrackingState = TrackingState.Deleted;
            trackableMap.deletedEntities.add(entry[0][1]);
          }
        });
        trackableMap.removeListeners.push(removeListener);
      }
      [...trackableMap].forEach(entry => {
        const updateIndex = entry[1].updateListeners.indexOf(updateListener);
        if (updateIndex < 0) {
          entry[1].updateListeners.push(updateListener);
          updateListener.subscribe(propInfo => {
            if (trackableMap.tracking === true && (propInfo.origValue !== propInfo.value)) {
              entry[1].TrackingState = TrackingState.Modified;
              entry[1].ModifiedProperties.add(propInfo.key);
            }
          });
        }
      });
    } else {
      const addIndex = trackableMap.addListeners.indexOf(addListener);
      if (addIndex >= 0) {
        addListener.unsubscribe();
        trackableMap.addListeners.splice(addIndex, trackableMap.addListeners.length);
      }
      const removeIndex = trackableMap.removeListeners.indexOf(removeListener);
      if (removeIndex >= 0) {
        removeListener.unsubscribe();
        trackableMap.deletedEntities.clear();
        trackableMap.removeListeners.splice(addIndex, trackableMap.removeListeners.length);
      }
    }
  }
}
