import { INotifyInfo } from '../framework/notify-info';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ObservableSet } from '../framework/observable-set';

@Component({
  selector: 'app-child-observable',
  templateUrl: './child-observable.component.html',
  styleUrls: ['./child-observable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildObservableComponent implements OnInit {

  @Input() data: ObservableSet<string>;
  listener: Subject<INotifyInfo>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.data) {
      this.listener = new Subject<INotifyInfo>();
      this.data.addListeners.push(this.listener);

      this.listener.subscribe(foods => {
        this.cd.markForCheck();
      });
    }
  }
}
