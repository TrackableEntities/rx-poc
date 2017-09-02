import { ObservableArray } from './observable-array';
import { Component, OnInit } from '@angular/core';

import { EntitySet } from './entity-set';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
  foodImmut = ['Bacon', 'Lettuce', 'Tomatoes'];
  foodObs: ObservableArray<string>;

  ngOnInit() {
    this.foodObs = ObservableArray.create<string>();
    this.foodObs.push('Bacon', 'Lettuce', 'Tomatoes');
  }

  addFood(food: string, option: number) {
    switch (option) {
      case 1:
        this.foods.push(food);
        break;
      case 2:
        this.foodImmut = [...this.foodImmut, food];
        break;
      case 3:
        this.foodObs.add(food);
        break;
    }
  }
}
