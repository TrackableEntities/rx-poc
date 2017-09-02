import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ObservableEntity {

    listener: BehaviorSubject<string>;

    notify(property: string) {
      this.listener.next(property);
    }
}
