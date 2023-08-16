import {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie';

const style = {
    page: "flex flex-col  flex flex-grow min-h-screen",
    explanation: "flex justify-center flex-col px-[2%] mt-[1%] mb-[1%] mx-[3%] ",
    title: "text-5xl  py-[1%] text-center",
    description: "text-lg",
    pagecontents: "flex flex-row",
    checkbox: "px-2 ",
    opps: "w-[100%] ml-19  pt-[2%] pl-[3%]"
}


export const SavedOps = () => {
    const [savedOpportunities, setSavedOpportunities] = useState([]);
    const [cookies, _] = useCookies(["access_token"]); //don't need to set cookies, just need to access cookies.access_token (would have value of false if user didn't have access privileges)

    const userID = useGetUserID();
    useEffect(() => {
        //using useEffect because our async functions are performing get requests
        //we only want to get our data on the first render

        const fetchSavedOpportunity = async () => { //fetching each saved opportunity by the user
            try {
                const response = await axios.get( `http://localhost:3001/opportunities/savedOpportunities/${userID}`);
                setSavedOpportunities(response.data.savedOpportunities);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSavedOpportunity();

    }, []);




    return (
        <div className={style.page}> 
            <div className={style.explanation}>
                <h1 className={style.title}>Saved Opportunities</h1>
            </div>
            <hr className="border-t-2"></hr>
            <div className={style.pagecontents}>
            <div className={style.opps}>
            {savedOpportunities.length == 0 ? 
                <h2 className="">No opportunities saved!</h2> : 
                <ul className="flex flex-col-reverse">
                    {savedOpportunities.map((opportunity) => (
                        <div className="border border-gray border-2 rounded-lg px-[3%] py-[2%] w-[96%] mb-[1%] bg-white ">
                        <li key={opportunity._id}>
                            <div className="flex flex-row">
                                <h2 className="text-3xl font-semibold">{opportunity.name}</h2>                                
                            </div>
                            <div>
                                <ul className="flex flex-row my-[1%]">
                                    {opportunity.labels.map((label, index) => (
                                        <li className="border border-gray px-2 py-1 rounded-lg mr-2 italic bg-blue-500 text-white font-semibold" key={index}>{label}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className = "flex flex-row">
                                <p className="mr-[1%] font-semibold">Link: </p><a className="text-blue-500 italic" href={opportunity.link} target="_blank">{opportunity.link}</a>
                            </div>
                            <div>
                                <p>{opportunity.description}</p>
                            </div>
                        </li></div>
                    ))}
                </ul>
            }
            </div>
            </div>
        </div>
    );
}