import { Subject } from 'rxjs/Subject';

export class ObservableMap<TKey, TValue> extends Map<TKey, TValue> {

  private _addListeners: Subject<[TKey, TValue]>[] = [];
  private _removeListeners: Subject<[TKey, TValue]>[] = [];

  constructor(...entries: [TKey, TValue][]) {
    super(entries);
  }

  get addListeners(): Subject<[TKey, TValue]>[] {
    return this._addListeners;
  }

  get removeListeners(): Subject<[TKey, TValue]>[] {
    return this._removeListeners;
  }

  addRange(...entries: [TKey, TValue][]): this {
    entries.forEach((entry) => this.add(entry[0], entry[1]));
    return this;
  }

  add(key: TKey, value: TValue): this {
    super.set(key, value);
    if (this._addListeners) {
      this._addListeners.forEach(listener => listener.next([key, value]));
    }
    return this;
  }

  delete(key: TKey): boolean {
    const value = super.get(key);
    if (this._removeListeners) {
      this._removeListeners.forEach(listener => listener.next([key, value]));
    }
    return super.delete(key);
  }

  deleteRange(...keys: TKey[]): boolean {
    keys.forEach(key => this.delete(key));
    return true;
  }
}
