import { Subject } from 'rxjs/Subject';

export abstract class ObservableProxy<T extends object> {

  private _listener = new Subject<string>();

  protected constructor() {
  }

  get listener(): Subject<string> {
    return this._listener;
  }

  protected proxify(item: T): T {
    const listener = this._listener;
    const handler: ProxyHandler<T> = {
      set: (target, property, value) => {
        if (property.toString() !== 'listener') {
          listener.next(property.toString());
        }
        return true;
      }
    };
    return new Proxy<T>(item, handler);
  }
}
