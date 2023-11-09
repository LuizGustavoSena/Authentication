import { faker } from "@faker-js/faker";
import { RequestCreateAccount } from "../../../src/domain/use-cases";
import { RequestLoginAccount } from "../../../src/domain/use-cases/login-account";

export const requestCreateAccount = (props?: Partial<RequestCreateAccount>): RequestCreateAccount => {
    return {
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words(),
        username: props?.username ?? faker.name.firstName()
    }
};

export const requestLoginAccount = (props?: Partial<RequestLoginAccount>): RequestLoginAccount => {
    return {
        email: props?.email ?? faker.internet.email(),
        password: props?.password ?? faker.word.words()
    }
};