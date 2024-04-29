import React, { useEffect, useState } from 'react';
import { Auth, Provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { getCookie, setCookie } from 'pages/CookieUtils';
import { set } from 'firebase/database';

function Googlelogin() {
    const [value, setvalue] = useState('')
    const handleclick = () => {
        signInWithPopup(Auth, Provider)
            .then((result) => {
                setvalue(result.user.email + ' ' + result.user.displayName)
                getCookie('email', result.user.email)
                console.log(result);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        setvalue(getCookie('email'));
    }, []);

    return (
        <div>
            
            <button onClick={handleclick}>Sign In with Google</button>
        </div>
    );
}


export default Googlelogin;