import { ObservableEntity } from './observable-entity';
import { ITrackable, TrackingState } from './trackable';

export class TrackableEntity extends ObservableEntity implements ITrackable {

  public TrackingState = TrackingState.Unchanged;
  public ModifiedProperties = new Set<string>();

  constructor() {
    super();
  }
}
