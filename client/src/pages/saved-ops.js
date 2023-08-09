import {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";

export const SavedOps = () => {
    const [savedOpportunities, setSavedOpportunities] = useState([]);

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
        <div>
            <h1>Saved Opportunities</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    );
}