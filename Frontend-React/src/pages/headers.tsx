import { getCookie } from "./CookieUtils";

const generateApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getCookie('Token')
    };
};

export default generateApiHeaders