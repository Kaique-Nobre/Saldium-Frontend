import { api } from "@/lib/api";

import {
    LoginRequest,
    LoginResponse
} from "@/types/auth.types";

export interface LogoutRequest {
    refreshToken: string;
}

export async function login(
    request: LoginRequest
): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        request
    );

    return response.data;
}

export async function logout(
    request: LogoutRequest
): Promise<void> {

    await api.post(
        "/auth/logout",
        request
    );

}