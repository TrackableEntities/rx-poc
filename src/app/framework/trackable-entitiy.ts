import { ObservableProxy } from './observable-proxy';
import { ITrackable, TrackingState } from './trackable';

export class TrackableEntity extends ObservableProxy implements ITrackable {

  public TrackingState = TrackingState.Unchanged;
  public ModifiedProperties = new Set<string>();
}
