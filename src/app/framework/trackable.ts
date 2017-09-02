export interface ITrackable {
    TrackingState: TrackingState;
    ModifiedProperties: Set<string>;
}

export enum TrackingState {
    Unchanged,
    Added,
    Modified,
    Deleted
}
