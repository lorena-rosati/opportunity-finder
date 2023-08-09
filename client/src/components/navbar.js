import React from "react";
import {useCookies} from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-opp">Create Opportunity</Link>
            {!cookies.access_token ? (
                <Link to="/auth">Login/Register</Link>
                ) : (
                <>
                    <Link to="/saved-ops">Saved Opportunities</Link>
                    <button onClick={logout}>Log out</button>
                </>
                )
            }
        </div>
    );
}