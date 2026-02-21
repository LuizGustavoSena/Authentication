export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    refreshtoken?: string;
}

export type UserResponse = Omit<User, 'password'>;

export type PatchRefreshToken = {
    email: string;
    refreshtoken: string;
}

export type GetRefreshTokenResponse = {
    refreshtoken: string;
}

export type UpdateRefreshTokenResponse = GetRefreshTokenResponse & { token: string };