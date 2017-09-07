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

  addRange(...values: TEntity[]): this {
    values.forEach(value => this.add(value));
    return this;
  }

  add(value: TEntity): this {
    super.add(value);
    if (this._addListeners) {
      this._addListeners.forEach(listener => listener.next(value));
    }
    return this;
  }

  delete(value: TEntity): boolean {
    if (this._removeListeners) {
      this._removeListeners.forEach(listener => listener.next(value));
    }
    return super.delete(value);
  }

  deleteRange(...values: TEntity[]): boolean {
    values.forEach(value => this.delete(value));
    return true;
  }
}
