export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type UserResponse = Omit<User, 'password'>;

export type PatchRefreshToken = {
    userId: string;
    refreshToken: string;
}

export type GetRefreshTokenResponse = {
    refreshToken: string;
}

export type UpdateRefreshTokenResponse = GetRefreshTokenResponse & { token: string };