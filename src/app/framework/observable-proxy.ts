import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

export abstract class ObservableProxy {

  private _updateListeners: Subject<[string, any]>[] = [];

  protected constructor() {
  }

  get updateListeners(): Subject<[string, any]>[] {
    return this._updateListeners;
  }

  protected proxify<TEntity extends object>(item: TEntity): TEntity {
    if (!item) {
      return item;
    }
    const updateListeners = this._updateListeners;
    const setHandler: ProxyHandler<TEntity> = {
      set: (target, property, value) => {
        if (target[property] !== value) {
          updateListeners.forEach(listener => listener.next([property.toString(), value]));
        }
        return true;
      }
    };
    return new Proxy<TEntity>(item, setHandler);
  }
}
