export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthContextType {

    isAuthenticated: boolean;

    login: (
        email: string,
        senha: string
    ) => Promise<void>;

    logout: (redirect?: string) => Promise<void>;

}