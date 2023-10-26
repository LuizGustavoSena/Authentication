export interface BdClient {
    request<T>(params: Request): Promise<Response<T>>
};

export type Request = {
    command: string;
};

export type Response<T> = {
    body: T;
};