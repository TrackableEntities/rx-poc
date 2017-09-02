import { Subject } from 'rxjs/Subject';

export class ObservableEntity {

    listener = new Subject<string>();

    constructor() { }

    notify(property: string) {
      this.listener.next(property);
    }
}
