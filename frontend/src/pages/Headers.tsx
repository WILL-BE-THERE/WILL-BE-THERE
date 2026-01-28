import { getCookie } from "./CookieUtils";

const generateApiHeaders = (withAuth: boolean = true) => {
    const token = getCookie('Token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token && withAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export default generateApiHeaders
