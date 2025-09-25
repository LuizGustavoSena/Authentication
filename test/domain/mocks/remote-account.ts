import { faker } from "@faker-js/faker";
import { RequestLoginAccount } from "../../../src/domain/models";
import { RequestCreateAccount } from "../../../src/domain/use-cases";

export const requestCreateAccount = (props?: Partial<RequestCreateAccount>): RequestCreateAccount => {
    return {
        id: props?.id ?? faker.string.uuid(),
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words(),
        username: props?.username ?? faker.person.firstName()
    }
};

export const requestLoginAccount = (props?: Partial<RequestLoginAccount>): RequestLoginAccount => {
    return {
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words()
    }
};