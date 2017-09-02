import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class EntitySet<TEntity> {

  items: Array<TEntity> = [];
  listeners: BehaviorSubject<TEntity[]>[] = [];

  constructor(...items: TEntity[]) {
    this.items = items;
  }

  add(...items: TEntity[]): void {
    this.items.push(...items);
    this.listeners.forEach(listener => listener.next(items));
  }

  remove(...items: TEntity[]): void {
    if (items.length === 0 || this.items.length === 0) { return; }
    const index = this.items.indexOf(items[0]);
    if (index >= 0) {
      this.items.splice(index, items.length);
      this.listeners.forEach(listener => listener.next(items));
    }
  }
}
