import { useState } from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


export const CreateOpp = () => {

    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    const [opportunity, setOpportunity] = useState({
        name: "",
        link: "",
        description: "",
        labels: [],
        userOwner: userID
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setOpportunity({...opportunity, [name]: value}); //the key "name" will have a new value of "value"
    }

    const handleLabelChange = (event, value) => {
        if (event.target.checked) {
            handleLabelCheck(value);
        } else {
            handleLabelUncheck(value);
        }
    }

    const handleLabelCheck = (value) => {
        const labels = opportunity.labels;
        labels.push(value);
        setOpportunity({...opportunity, labels}); 
    }

    const handleLabelUncheck = (value) => {
        const labels = opportunity.labels;
        for (var i=0; i < labels.length; i++) {
            if (labels[i] == value) {
                labels.splice(i, 1);
            }
        }
        setOpportunity({...opportunity, labels});
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/opportunities", opportunity, {headers: {authorization: cookies.access_token}});
            alert("Opportunity created");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="create-opp">
            <h2>Create Opportunity</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                <label htmlFor="link">Link:</label>
                <input type="url" id="link" name="link" onChange={handleChange}/>
                <label htmlFor="description">Description:</label>
                <textarea type="text" id="description" name="description" onChange={handleChange}></textarea>

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

                <button type="submit" onClick={onSubmit}>Create Opportunity</button>
            </form>
        </div>
    );
}