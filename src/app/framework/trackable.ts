export interface ITrackable {
    TrackingState: TrackingState;
    ModifiedProperties: string[];
}

export enum TrackingState {
    Unchanged,
    Added,
    Modified,
    Deleted
}
