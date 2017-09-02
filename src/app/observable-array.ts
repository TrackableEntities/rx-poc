import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ObservableArray<TEntity> extends Array<TEntity> {

  listeners: BehaviorSubject<TEntity[]>[] = [];

  private constructor(items?: Array<TEntity>) {
    super(...items);
  }

  static create<TEntity>(): ObservableArray<TEntity> {
    const arr: ObservableArray<TEntity> = Object.create(ObservableArray.prototype);
    arr.listeners = new Array<BehaviorSubject<TEntity[]>>();
    return arr;
  }

  add(...items: TEntity[]): void {
    this.push(...items);
    this.listeners.forEach(listener => listener.next(items));
  }

  remove(...items: TEntity[]): void {
    if (items.length === 0 || this.length === 0) { return; }
    const index = this.indexOf(items[0]);
    if (index >= 0) {
      this.splice(index, items.length);
      this.listeners.forEach(listener => listener.next(items));
    }
  }
}
