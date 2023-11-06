import { BdClient, ModelRequest } from "../../../src/data/protocols/bd";

export class BdClientSpy implements BdClient {
    results: any = {};
    model: string;
    body: any;

    async createModel<T>(params: ModelRequest<T>): Promise<void> {
        this.body = params.body;
        this.model = params.model;

        if (!this.results[params.model])
            this.results[params.model] = [];

        this.results[params.model].push(params.body);
    }

    async getModel<P, R>(params: ModelRequest<P>): Promise<R | null> {
        this.body = params.body;
        this.model = params.model;

        if (!this.results[params.model])
            return null;

        const haveModel = this.results[params.model].find((el: any) =>
            !Object.keys(params.body).map(key =>
                el[key] === params.body[key]
            ).includes(false)
        );

        if (!haveModel)
            return null;

        return haveModel;
    }

}