import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-immutable',
  templateUrl: './child-immutable.component.html',
  styleUrls: ['./child-immutable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildImmutableComponent implements OnInit {

  @Input() data: string[];

  constructor() { }

  ngOnInit() {
  }

}
