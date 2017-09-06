import { Subject } from 'rxjs/Subject';

export class ObservableCollection<TEntity> {

    private _items: TEntity[] = [];
    private _addListeners: Subject<TEntity | TEntity[]>[] = [];
    private _removeListeners: Subject<TEntity | TEntity[]>[] = [];

    constructor(...items: TEntity[]) {
        this._items = items;
    }

    get items(): TEntity[] {
        return this._items;
    }

    set items(value: TEntity[]) {
        this._items = value;
    }

    get addListeners(): Subject<TEntity | TEntity[]>[] {
        return this._addListeners;
    }

    get removeListeners(): Subject<TEntity | TEntity[]>[] {
        return this._removeListeners;
    }

    add(...items: TEntity[]): void {
        this.items.push(...items);
        if (items.length === 1) {
          this._addListeners.forEach(listener => listener.next(items[0]));
        } else {
        this._addListeners.forEach(listener => listener.next(items));
      }
    }

    remove(...items: TEntity[]): void {
        if (items.length === 1) {
            this._removeListeners.forEach(listener => listener.next(items[0]));
        } else {
          this._removeListeners.forEach(listener => listener.next(items));
        }
        if (items.length === 0 || this.items.length === 0) { return; }
        const index = this.items.indexOf(items[0]);
        if (index >= 0) {
            this.items.splice(index, items.length);
        }
    }
}
