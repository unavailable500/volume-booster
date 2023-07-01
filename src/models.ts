export interface IStorage {
    initialized: boolean,
    volume: number,
    enabled: boolean,
    audioCtx?: AudioContext,
    gainNode?: GainNode,
}

export interface IMessageRequest {
    command: Command;
    data?: any;
}

export interface IMessageResponse {
    data: any;
}

export enum Command {
    SET_VOLUME,
    GET_VOLUME,
    SET_ENABLED,
    GET_ENABLED,
}