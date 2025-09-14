import { GuidClient } from "../../../src/data/protocols/guid";

export class GuidSpy implements GuidClient {
    guid: string;

    generate(): string {
        return this.guid;
    }
}