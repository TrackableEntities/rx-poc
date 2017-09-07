import { Subject } from 'rxjs/Subject';

export class ObservableSet<TEntity> extends Set<TEntity> {

  private _addListeners: Subject<TEntity>[] = [];
  private _removeListeners: Subject<TEntity>[] = [];

  constructor(...items: TEntity[]) {
    super(items);
  }

  get addListeners(): Subject<TEntity>[] {
    return this._addListeners;
  }

  get removeListeners(): Subject<TEntity>[] {
    return this._removeListeners;
  }

  add(value: TEntity): this {
    const res = super.add(value);
    if (this._addListeners) {
      this._addListeners.forEach(listener => listener.next(value));
    }
    return res;
  }

  delete(value: TEntity): boolean {
    if (this._removeListeners) {
      this._removeListeners.forEach(listener => listener.next(value));
    }
    return super.delete(value);
  }
}
