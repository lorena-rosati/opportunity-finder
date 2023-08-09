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

    const handleLabelChange = (event, index) => {
        const {value} = event.target;
        const labels = opportunity.labels;
        labels[index] = value;
        setOpportunity({...opportunity, labels}); //the key "name" will have a new value of "value"
    }

    const addLabel = () => {
        setOpportunity({...opportunity, labels: [...opportunity.labels, ""]}); //add empty label to labels array
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
                <label htmlFor="name"></label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                <label htmlFor="link"></label>
                <input type="text" id="link" name="link" onChange={handleChange}/>
                <label htmlFor="description"></label>
                <textarea type="text" id="description" name="description" onChange={handleChange}></textarea>
                <label htmlFor="labels"></label>
                {opportunity.labels.map( (label, index) => (
                    <input key={index} type="text" name="labels" value={label} onChange={(event) => handleLabelChange(event, index)}/> //adding a key bc were mapping through a list
                ))}
                <button onClick={addLabel} type="button">Add Label</button>
                <button type="submit" onClick={onSubmit}>Create Opportunity</button>
            </form>
        </div>
    );
}