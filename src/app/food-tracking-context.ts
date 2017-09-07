import { Food } from './food';
import { ObservableSet } from './framework/observable-set';
import { TrackingContext } from './framework/tracking-context';

export class FoodTrackingContext extends TrackingContext {

    Food = new ObservableSet<Food>();

    constructor() {
        super();
        this.entitySets.push(this.Food);
    }
}
