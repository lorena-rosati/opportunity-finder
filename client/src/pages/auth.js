import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

const style = {
    page: "flex h-screen justify-center mt-[3%]",
    container: "w-[30%] h-[40%] border border-gray px-[3%] rounded-lg my-[2%] mx-[3%]",
    title: "text-5xl pb-8 pt-11 text-center font-semibold",
    inputgroup: "",
    inputarea: "border border-gray pl-3 py-1 mt-5 text-lg rounded-md w-[100%]",
    submit: "w-[100%] bg-blue-500 p-2 rounded-md mt-8 font-semibold text-white text-xl"
    //, registerinstead: "flex flex-row flex justify-center pt-4"
}
 
export const Auth = () => {
    return (
        <div className={style.page}>
            <Login/>
            <Register/>
        </div>
    );
}

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]); //don't need to access the value of cookies, just need to set it

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); //accesses router and is used to navigate to other routes

    const onSubmit = async (event) => { //async function because 
        event.preventDefault(); //prevents the form from refreshing the page
        try {  //post request b/c we aren't updating anything, rather, we are verifying credentials (used put usually for updating resources)
            const response = await axios.post("http://localhost:3001/auth/login", { //sending username and pswd to server to check if valid
                username, 
                password,
            });
            if (response.data.message == "") { //if sign in is successful
                setCookies("access_token", response.data.token);  //sets access token (meaning that user has access / is logged in)
                window.localStorage.setItem("userID", response.data.userID); //sets user id in local storage
                navigate("/"); //navigate to home page
            } else {
                alert(response.data.message); //alert user of what's wrong with their input (why login was unsuccessful)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>;
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault(); //stops from refreshing the page when we submit
        try {            //post request b/c we are creating new document for user
            const response = await axios.post("http://localhost:3001/auth/register", {
                username, 
                password
            });
            alert(response.data.message); //alert user whether registration was successful
        } catch (error) {
            console.error(error);
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>;
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return (
        <div className={style.container}>
            <form onSubmit={onSubmit}>
                <h2 className={style.title}>{label}</h2>
                <div className={style.inputgroup}>
                    <input type="text" className={style.inputarea} id="username" value={username} placeholder="Username"onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className={style.inputgroup}>
                    <input type="password" className={style.inputarea} id="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                </div>
                {
                //label == "Login" ? <div className={style.registerinstead}><h2>Don't have an account? </h2><Link to="/home">Sign Up</Link></div> : <div className={style.registerinstead}></div>
                }
                <button className={style.submit} type="submit">{label}</button>
            </form>
        </div>
    );
}