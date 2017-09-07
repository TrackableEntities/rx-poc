import { Subject } from 'rxjs/Subject';

export abstract class ObservableEntity {

  private _excludedProperties = new Set<string>();

  private _updateListeners: Subject<PropertyNotifyInfo>[] = [];

  protected constructor() {
  }

  get updateListeners(): Subject<PropertyNotifyInfo>[] {
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
      set: (target, property, value, receiver) => {
        const key = property.toString();
        if (!excludedProps.has(key)) {
          const keyValue = new PropertyNotifyInfo(key, target[property], value);
          updateListeners.forEach(listener => listener.next(keyValue));
        }
        target[property] = value;
        return true;
      }
    };
    return new Proxy<TEntity>(item, setHandler);
  }
}

export class PropertyNotifyInfo {
  key: string;
  origValue: any;
  value: any;
  constructor(key: string, origValue: any, value: any) {
    this.key = key;
    this.origValue = origValue;
    this.value = value;
  }
}
