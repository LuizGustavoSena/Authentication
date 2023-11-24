import { BdClient, RequestHaveUser } from "../../../src/data/protocols/bd";
import { User } from "../../../src/domain/models";

export class BdClientSpy implements BdClient {
    users: User[] = [];
    model: string;
    body: any;

    async createUser(params: User): Promise<void> {
        this.body = params;

        if (this.users.find(el => el.email === params.email))
            throw new Error();

        this.users.push(params);
    }

    async haveUser(params: RequestHaveUser): Promise<boolean> {
        this.body = params;

        if (this.users.length === 0)
            return false;

        const haveModel = this.users.find(el =>
            el.email === params.email &&
            el.password === params.password
        );

        if (!haveModel)
            return false;

        return true;
    }

}