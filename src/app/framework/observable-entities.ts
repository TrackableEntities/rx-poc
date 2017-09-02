import { Subject } from 'rxjs/Subject';

export class ObservableEntities<TEntity> {

    items: Array<TEntity> = [];
    addListeners: Subject<TEntity[]>[] = [];
    removeListeners: Subject<TEntity[]>[] = [];

    constructor(...items: TEntity[]) {
        this.items = items;
    }

    add(...items: TEntity[]): void {
        this.items.push(...items);
        this.addListeners.forEach(listener => listener.next(items));
    }

    remove(...items: TEntity[]): void {
        this.removeListeners.forEach(listener => listener.next(items));
        if (items.length === 0 || this.items.length === 0) { return; }
        const index = this.items.indexOf(items[0]);
        if (index >= 0) {
            this.items.splice(index, items.length);
        }
    }
}
