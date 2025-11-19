import { faker } from "@faker-js/faker";
import { User } from "../../../src/domain/models";

export const createUser = (params?: Partial<User>): User => ({
    id: params?.id ?? faker.string.uuid(),
    email: params?.email ?? faker.internet.email(),
    password: params?.password ?? faker.internet.password(),
    username: params?.username ?? faker.internet.userName(),
    refreshtoken: params?.refreshtoken ?? faker.string.uuid()
});