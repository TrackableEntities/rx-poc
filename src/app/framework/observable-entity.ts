import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

export abstract class ObservableEntity {

  private _updateListeners: Subject<KeyValuePair>[] = [];

  protected constructor() {
  }

  get updateListeners(): Subject<KeyValuePair>[] {
    return this._updateListeners;
  }

  protected proxify<TEntity extends object>(item: TEntity): TEntity {
    if (!item) {
      return item;
    }
    const updateListeners = this._updateListeners;
    const setHandler: ProxyHandler<TEntity> = {
      set: (target, property, value) => {
        const keyValue = new KeyValuePair(property.toString(), value);
        updateListeners.forEach(listener => listener.next(keyValue));
        return true;
      }
    };
    return new Proxy<TEntity>(item, setHandler);
  }
}

export class KeyValuePair {
  key: string;
  value: any;
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
