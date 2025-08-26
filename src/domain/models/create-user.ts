export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type UserResponse = Omit<User, 'password'>;

export type PatchRefreshToken = {
    id: string;
    refreshToken: string;
}