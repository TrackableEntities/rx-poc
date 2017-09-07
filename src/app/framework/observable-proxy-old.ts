import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { KeyValuePair } from './observable-entity';

export abstract class ObservableProxyOld {

  private _updateListeners: Subject<KeyValuePair>[] = [];
  private _addListeners: Subject<any>[] = [];
  private _removeListeners: Subject<any>[] = [];

  protected constructor() {
  }

  get updateListeners(): Subject<KeyValuePair>[] {
    return this._updateListeners;
  }

  get addListeners(): Subject<any>[] {
    return this._addListeners;
  }

  get removeListeners(): Subject<any>[] {
    return this._removeListeners;
  }

  protected proxify<TEntity extends object>(item: TEntity): TEntity;
  protected proxify<TEntity extends object>(item: TEntity[]): TEntity[];
  protected proxify<TEntity extends object>(item: TEntity | TEntity[]): TEntity | TEntity[] {
    if (!item) {
      return item;
    }
    const updateListeners = this._updateListeners;
    const addListeners = this._addListeners;
    const removeListeners = this._removeListeners;
    const setHandler: ProxyHandler<TEntity | TEntity[]> = {
      set: (target, property, value) => {
        if (!_.isArray(target)) {
          if (target[property] !== value) {
            updateListeners.forEach(listener => listener.next(new KeyValuePair(property.toString(), value)));
          }
        } else {
          if (+property.toString() >= target.length) {
            addListeners.forEach(listener => listener.next(value));
          } else if (property.toString() === 'length' && +value < target.length) {
            removeListeners.forEach(listener => listener.next(null));
          }
        }
        return true;
      }
    };
    return new Proxy<TEntity | TEntity[]>(item, setHandler);
  }
}
