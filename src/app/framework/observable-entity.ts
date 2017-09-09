import { Subject } from 'rxjs/Subject';

import { INotifyInfo } from './notify-info';

export class ObservableEntity {

  private _excludedProperties = new Set<string>();

  private _updateListeners: Subject<INotifyInfo>[] = [];

  protected constructor() {
  }

  public static proxify<TEntity extends object>(ctor: { new(): TEntity }): TEntity {
    const item = new ctor();
    const obs = new ObservableEntity();
    return obs.proxify(item);
  }

  get updateListeners(): Subject<INotifyInfo>[] {
    return this._updateListeners;
  }

  addExcludedProperties(...properties: string[]) {
    properties.forEach(p => this._excludedProperties.add(p));
  }

  protected proxify<TEntity extends object>(item: TEntity): TEntity {
    if (!item) {
      return item;
    }
    const updateListeners = this._updateListeners;
    const excludedProps = this._excludedProperties;
    const setHandler: ProxyHandler<TEntity> = {
      set: (target, property, value) => {
        const key = property.toString();
        if (!excludedProps.has(key)) {
          const notifyInfo: INotifyInfo = { key: key, origValue: target[property], currentValue: value };
          updateListeners.forEach(listener => listener.next(notifyInfo));
        }
        target[property] = value;
        return true;
      }
    };
    return new Proxy<TEntity>(item, setHandler);
  }
}
