import {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie';


export const SavedOps = () => {
    const [savedOpportunities, setSavedOpportunities] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();
    useEffect(() => {

        const fetchSavedOpportunity = async () => {
            try {
                const response = await axios.get( `http://localhost:3001/opportunities/savedOpportunities/${userID}`);
                //if (response.data.savedOpportunities !== undefined) {
                    setSavedOpportunities(response.data.savedOpportunities);
                // } else {
                //     setSavedOpportunities([]);
                // }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSavedOpportunity();

    }, []);


    return (
        <div className="flex h-screen justify-center ">
            { !cookies.access_token ? <h1 className="text-3xl mt-10 mx-3">You do not have access to this page. Please log in and try again.</h1> :
            <div><h1>Saved Opportunities</h1>
            <ul>
                {savedOpportunities.map((opportunity) => (
                    <li key={opportunity._id}>
                        <div className="name">
                            <h2>{opportunity.name}</h2>
                        </div>
                        <div className = "link">
                            <a href={opportunity.link}>{opportunity.link}</a>
                        </div>
                        <div>
                            <p>{opportunity.description}</p>
                        </div>
                        <div>
                            <ul>
                                {opportunity.labels.map((label, index) => (
                                    <li key={index}>{label}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul></div>
            }
        </div>
    );
}