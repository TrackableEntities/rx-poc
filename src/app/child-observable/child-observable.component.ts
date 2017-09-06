import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ObservableCollection } from '../framework/observable-collection';

@Component({
  selector: 'app-child-observable',
  templateUrl: './child-observable.component.html',
  styleUrls: ['./child-observable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildObservableComponent implements OnInit {

  @Input() data: ObservableCollection<string>;
  listener: Subject<string[]>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.data) {
      this.listener = new Subject();
      this.data.addListeners.push(this.listener);

      this.listener.subscribe(foods => {
        this.cd.markForCheck();
      });
    }
  }
}
