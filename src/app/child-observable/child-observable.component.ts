import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EntitySet } from '../observable-array';

@Component({
  selector: 'app-child-observable',
  templateUrl: './child-observable.component.html',
  styleUrls: ['./child-observable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildObservableComponent implements OnInit {

  @Input() data: EntitySet<string>;
  listener: BehaviorSubject<string[]>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.data) {
      this.listener = new BehaviorSubject(this.data.items);
      this.data.listeners.push(this.listener);

      this.listener.subscribe(foods => {
        this.cd.markForCheck();
      });
    }
  }
}
