import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-default',
  templateUrl: './child-default.component.html',
  styleUrls: ['./child-default.component.css']
})
export class ChildDefaultComponent implements OnInit {

  @Input() data: string[];

  constructor() { }

  ngOnInit() {
  }

}
