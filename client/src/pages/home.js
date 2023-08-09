import {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";

export const Home = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [savedOpportunities, setSavedOpportunities] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    useEffect(() => {


        const fetchOpportunity = async () => {
            try {
                const response = await axios.get("http://localhost:3001/opportunities");
                setOpportunities(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSavedOpportunity = async () => {
            try {
                const response = await axios.get( `http://localhost:3001/opportunities/savedOpportunities/ids/${userID}`);
                //if (response.data.savedOpportunities !== undefined) {
                    setSavedOpportunities(response.data.savedOpportunities);
                // } else {
                //     setSavedOpportunities([]);
                // }
            } catch (error) {
                console.error(error);
            }
        };

        fetchOpportunity();

        if (cookies.access_token) fetchSavedOpportunity();

    }, []);

    const saveOpp = async (opportunityID) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/opportunities", 
                {opportunityID, userID}, 
                {headers: {authorization: cookies.access_token}}
            );
            //if (response.data.savedOpportunities !== undefined) {
                setSavedOpportunities(response.data.savedOpportunities);
            // } else {
            //     setSavedOpportunities([]);
            // }
        } catch (error) {
            console.error(error);
        }
    }

    const isOppSaved = (id) => {
        savedOpportunities.includes(id);
    }

    return (
        <div>
            <h1>Opportunities</h1>
            <ul>
                {opportunities.map((opportunity) => (
                    <li key={opportunity._id}>
                        <div className="name">
                            <h2>{opportunity.name}</h2>                                
                            <button onClick={() => saveOpp(opportunity._id)} disabled={isOppSaved(opportunity._id)}>
                                {isOppSaved(opportunity._id) ? "Saved" : "Save"}
                            </button> 
                        </div>
                        <div className = "link">
                            <a href={opportunity.link}>{opportunity.link}</a>
                        </div>
                        <div>
                            <p>{opportunity.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}