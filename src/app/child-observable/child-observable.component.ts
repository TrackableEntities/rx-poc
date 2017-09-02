import { ObservableArray } from '../observable-array';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EntitySet } from '../entity-set';

@Component({
  selector: 'app-child-observable',
  templateUrl: './child-observable.component.html',
  styleUrls: ['./child-observable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildObservableComponent implements OnInit {

  @Input() data: ObservableArray<string>;
  listener: BehaviorSubject<string[]>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.data) {
      this.listener = new BehaviorSubject(this.data);
      this.data.listeners.push(this.listener);

      this.listener.subscribe(foods => {
        this.cd.markForCheck();
      });
    }
  }
}
