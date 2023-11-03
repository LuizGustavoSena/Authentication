export interface BdClient {
    createModel<T>(params: ModelRequest<T>): Promise<void>;
    getModel<P, R>(params: ModelRequest<P>): Promise<R>
};

export type ModelRequest<T> = {
    model: string;
    body: T;
};