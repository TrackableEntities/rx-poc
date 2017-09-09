import { TrackingState } from './tracking-state';

export interface ITrackable {
    TrackingState: TrackingState;
    ModifiedProperties: Set<string>;
}
