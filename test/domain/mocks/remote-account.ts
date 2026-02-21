import { faker } from "@faker-js/faker";
import { RequestLoginAccount, User } from "../../../src/domain/models";

export const requestCreateUser = (props?: Partial<User>): User => {
    return {
        id: props?.id ?? faker.string.uuid(),
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words(8),
        username: props?.username ?? faker.person.firstName()
    }
};

export const requestLoginAccount = (props?: Partial<RequestLoginAccount>): RequestLoginAccount => {
    return {
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words(8)
    }
};