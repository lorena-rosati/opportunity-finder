import React from "react";
import {useCookies} from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';

const style = {
    navbar: "flex flex-row px-10 pb-8 pt-5 relative flex justify-center w-full m-0 bg-blue-500 sticky top-0 backdrop-blur-sm text-white font-semibold",
    title: "text-4xl absolute left-[5%]",
    links: "px-6 pt-2 text-2xl",
    linksdiv: "flex justify-center",
    authlinks: "absolute right-[5%] pt-2 text-2xl"
}

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]); //hook manages cookies, access_token is the cookie we want to manage
    const navigate = useNavigate(); //accesses router and is used to navigate to other routes

    const logout = () => {
        //setCookies() - first param is cookie name, second is cookie value
        setCookies("access_token", ""); //clears the "access_token" cookie (sets it to an empty string) 
        window.localStorage.clear();  //clears all local storage
        navigate("/auth"); //navigates to login/register page (route w/ path = "/auth")
    }

    return (
        <div className={style.navbar}>
            <h1 className={style.title}>OpportuniFIND</h1>
            <Link to="/" className={style.links}>Opportunities</Link>
            {!cookies.access_token ? ( //conditionals depending on if user is logged in / "has access"
                <Link to="/auth" className={style.authlinks}>Login/Register</Link>
                ) : (
                <>
                    <Link to="/create-opp" className={style.links}>Create Opportunity</Link>
                    <Link to="/saved-ops" className={style.links}>Saved</Link>
                    <button onClick={logout} className={style.authlinks}>Log out</button>
                </>
                )
            }
        </div>
    );
}