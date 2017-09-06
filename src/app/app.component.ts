import { Component, OnInit } from '@angular/core';

import { ObservableCollection } from './framework/observable-collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
  foodImmut = ['Bacon', 'Lettuce', 'Tomatoes'];
  foodEntities = new ObservableCollection('Bacon', 'Lettuce', 'Tomatoes');

  ngOnInit() {
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
        this.foodEntities.add(food);
        break;
    }
  }
}
