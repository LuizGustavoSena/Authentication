import { BdClient, RequestHaveUser } from "../../../src/data/protocols/bd";
import { User } from "../../../src/domain/models";

export class BdClientSpy implements BdClient {
    results: any = {};
    model: string;
    body: any;

    async createUser(params: User): Promise<void> {
        this.body = params;

        if (!this.results.users)
            this.results.users = [];

        this.results.users.push(params);
    }

    async haveUser(params: RequestHaveUser): Promise<boolean> {
        this.body = params;

        if (!this.results.users)
            return false;

        const haveModel = this.results.users.find((el: any) =>
            !Object.keys(this.body).map(key =>
                el[key] === this.body[key]
            ).includes(false)
        );

        if (!haveModel)
            return false;

        return true;
    }

}