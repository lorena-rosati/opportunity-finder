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
        page: "flex flex-col",
        explanation: "flex justify-center flex-col px-[2%] mt-[1%] mb-[2%] mx-[3%] ",
        title: "text-5xl  py-[1%]",
        description: "",
        pagecontents: "flex flex-row",
        labelchecks: "flex flex-col  pt-[2%] ml-[3%] mr-[1%]",
        labelcheck: "flex flex-row ml-8",
        checktext: "text-lg",
        checkbox: "px-2",
        opps: "w-[100%] ml-19  pt-[2%] pl-[3%] "
    }

    return (
        <div className={style.page}> 
            <div className={style.explanation}>
                <h1 className={style.title}>Opportunities</h1>
                <h3 className={style.description}>Welcome to your feed, a page full of opportunities posted by students for students primarily in STEM. To find opportunities that fall under specific categories, click the checkboxes below with your desired categories.</h3>
            </div>
            <hr></hr>
            <div className={style.pagecontents}>
                <div className={style.labelchecks}>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-1" onChange={ (event) => handleLabelChange(event, "High School")}/></div>
                        <label htmlFor="label-1" className={style.checktext}>High School</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-2" onChange={ (event) => handleLabelChange(event, "University")}/></div>
                        <label htmlFor="label-2" className={style.checktext}>University</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-3" onChange={ (event) => handleLabelChange(event, "STEM")}/></div>
                        <label htmlFor="label-3" className={style.checktext}>STEM</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-4" onChange={ (event) => handleLabelChange(event, "Tech")}/></div>
                        <label htmlFor="label-4" className={style.checktext}>Tech</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-5" onChange={ (event) => handleLabelChange(event, "Employment")}/></div>
                        <label htmlFor="label-5" className={style.checktext}>Employment</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-6" onChange={ (event) => handleLabelChange(event, "Skill-building program")}/></div>
                        <label htmlFor="label-6" className={style.checktext}>Skill-building program</label>
                    </div>
                    <div className={style.labelcheck}>
                        <div className={style.checkbox}><input type="checkbox" id="label-7" onChange={ (event) => handleLabelChange(event, "Volunteering")}/></div>
                        <label htmlFor="label-7" className={style.checktext}>Volunteering</label>
                    </div>
                </div>
            <div className={style.opps}>
            {visibleOpportunities.length == 0 ? 
                <h2 className="text-2xl">No opportunities match your selection.</h2> : 
                <ul>
                    {visibleOpportunities.map((opportunity) => (
                        <div className="border border-gray rounded-lg px-[3%] py-[2%] w-[95%] mb-[1%] bg-white">
                        <li key={opportunity._id}>
                            <div className="flex flex-row">
                                <h2 className="text-3xl font-semibold">{opportunity.name}</h2>                                
                                <button onClick={() => saveOpp(opportunity._id)} disabled={isOppSaved(opportunity._id)} className="mx-[2%] px-[1%] text-lg border border-gray rounded-lg">
                                    {isOppSaved(opportunity._id) ? "Saved" : "Save"}
                                </button> 
                            </div>
                            <div>
                                <ul className="flex flex-row my-[1%]">
                                    {opportunity.labels.map((label, index) => (
                                        <li className="border border-gray px-2 py-1 rounded-lg mr-2 italic bg-gray-100" key={index}>{label}</li>
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
