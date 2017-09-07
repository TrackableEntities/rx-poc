import { ObservableEntityProxy } from './observable-entity-proxy';
import { ITrackable, TrackingState } from './trackable';

export class TrackableEntity extends ObservableEntityProxy implements ITrackable {

  public TrackingState = TrackingState.Unchanged;
  public ModifiedProperties = new Set<string>();
}
