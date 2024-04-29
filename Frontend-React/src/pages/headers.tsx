import { getCookie } from "./CookieUtils";

const generateApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('Token'),
    };
};

export default generateApiHeaders