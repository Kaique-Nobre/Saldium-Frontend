export function isAuthenticated(): boolean {
    if (typeof window === "undefined") {
        return false;
    }

    const token = localStorage.getItem("accessToken");

    return !!token;
}