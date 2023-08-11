import {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";



export const Home = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [savedOpportunities, setSavedOpportunities] = useState([]);
    const [visibleLabels, setVisibleLabels] = useState([]);
    const [visibleOpportunities, setVisibleOpportunities] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    useEffect(() => {

        const fetchOpportunity = async () => {
            try {
                const response = await axios.get("http://localhost:3001/opportunities");
                setOpportunities(response.data);
                setVisibleOpportunities(opportunities);
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

    const handleLabelChange = (event, value) => {
        var labels = visibleLabels;
        if (event.target.checked) {
            labels.push(value);
        } else {
            for (var i=0; i < labels.length; i++) {
                if (labels[i] == value) {
                    labels.splice(i, 1);
                }
            }
        }
        setVisibleLabels(labels);
        var visible = opportunities.filter((opp) => {
            return visibleLabels.every(label => opp.labels.includes(label));
        });
        setVisibleOpportunities(visible);
    }

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

    const style = {
        page: "m-[2%] flex flex-col",
        explanation: "flex justify-center flex-col",
        title: "",
        description: "",
        pagecontents: "flex flex-row",
        labelchecks: "flex flex-col",
        opps: ""
    }

    return (
        <div className={style.page}> 
            <div className={style.explanation}>
                <h1 className={style.title}>Opportunities</h1>
                <h3 className={style.description}>Here is a list of ...</h3>
            </div>
            <div className={style.pagecontents}>
                <div className={style.labelchecks}>
                    <label htmlFor="label-1">High School</label>
                    <input type="checkbox" id="label-1" onChange={ (event) => handleLabelChange(event, "High School")}/>
                    <label htmlFor="label-2">University</label>
                    <input type="checkbox" id="label-2" onChange={ (event) => handleLabelChange(event, "University")}/>
                    <label htmlFor="label-3">STEM</label>
                    <input type="checkbox" id="label-3" onChange={ (event) => handleLabelChange(event, "STEM")}/>
                    <label htmlFor="label-4">Tech</label>
                    <input type="checkbox" id="label-4" onChange={ (event) => handleLabelChange(event, "Tech")}/>
                    <label htmlFor="label-5">Employment</label>
                    <input type="checkbox" id="label-5" onChange={ (event) => handleLabelChange(event, "Employment")}/>
                    <label htmlFor="label-6">Skill-building program</label>
                    <input type="checkbox" id="label-6" onChange={ (event) => handleLabelChange(event, "Skill-building program")}/>
                    <label htmlFor="label-7">Volunteering</label>
                    <input type="checkbox" id="label-7" onChange={ (event) => handleLabelChange(event, "Volunteering")}/>
                </div>
            <div className={style.opps}>
            {visibleOpportunities.length == 0 ? 
                <h2>No opportunities match your selection.</h2> : 
                <ul>
                    {visibleOpportunities.map((opportunity) => (
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
                            <div>
                                <ul>
                                    {opportunity.labels.map((label, index) => (
                                        <li key={index}>{label}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            }
            </div>
            </div>
        </div>
    );
}
