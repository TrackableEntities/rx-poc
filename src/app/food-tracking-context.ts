import { Food } from './food';
import { ObservableCollection } from './framework/observable-collection';
import { TrackingContext } from './framework/tracking-context';

export class FoodTrackingContext extends TrackingContext {

    Food = new ObservableCollection<Food>();

    constructor() {
        super();
        this.entitySets.push(this.Food);
    }
}
