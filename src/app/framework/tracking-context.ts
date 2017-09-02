import { Subject } from 'rxjs/Subject';

import { ObservableEntities } from './observable-entities';
import { ITrackable, TrackingState } from './trackable';

export abstract class TrackingContext {

    private _tracking: boolean;
    private _addListener = new Subject<ITrackable[]>();
    private _removeListener = new Subject<ITrackable[]>();

    protected entitySets: ObservableEntities<ITrackable>[] = [];

    constructor() {
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
            this.entitySets.forEach(entities => {
                const addIndex = entities.addListeners.indexOf(this._addListener);
                if (addIndex < 0) {
                    this._addListener.subscribe(items => {
                        items.forEach(item => item.TrackingState = TrackingState.Added);
                    });
                    entities.addListeners.push(this._addListener);
                }
                const removeIndex = entities.removeListeners.indexOf(this._removeListener);
                if (removeIndex < 0) {
                    this._removeListener.subscribe(items => {
                        items.forEach(item => item.TrackingState = TrackingState.Deleted);
                    });
                    entities.removeListeners.push(this._removeListener);
                }
            });
        } else {
            this.entitySets.forEach(entities => {
                // if (entities.addListeners.length === 0 || entities.addListeners.length === 0) { return; }
                const addIndex = entities.addListeners.indexOf(this._addListener);
                if (addIndex >= 0) {
                    this._addListener.unsubscribe();
                    entities.addListeners.splice(addIndex, entities.addListeners.length);
                }
                const removeIndex = entities.removeListeners.indexOf(this._removeListener);
                if (removeIndex >= 0) {
                    this._removeListener.unsubscribe();
                    entities.removeListeners.splice(addIndex, entities.removeListeners.length);
                }
            });
        }
    }
}
