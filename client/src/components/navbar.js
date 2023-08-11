import React from "react";
import {useCookies} from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';

const style = {
    navbar: "flex flex-row px-10 pb-10 pt-5 relative flex justify-center",
    title: "text-4xl absolute left-20",
    links: "px-6 pt-2 text-2xl",
    linksdiv: "flex justify-center",
    authlinks: "absolute right-20 pt-2 text-2xl"
}

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
    }

    return (
        <div className={style.navbar}>
            <h1 className={style.title}>OpportuniFIND</h1>
            <Link to="/" className={style.links}>Opportunities</Link>
            <Link to="/create-opp" className={style.links}>Create Opportunity</Link>
            {!cookies.access_token ? (
                <Link to="/auth" className={style.authlinks}>Login/Register</Link>
                ) : (
                <>
                    <Link to="/saved-ops" className={style.links}>Saved</Link>
                    <button onClick={logout} className={style.authlinks}>Log out</button>
                </>
                )
            }
        </div>
    );
}