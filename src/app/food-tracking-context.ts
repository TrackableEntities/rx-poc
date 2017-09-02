import { Food } from './food';
import { ObservableEntities } from './framework/observable-entities';
import { TrackingContext } from './framework/tracking-context';

export class FoodTrackingContext extends TrackingContext {

    Food = new ObservableEntities<Food>();
}
