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

    const style = {
        labelcheck: "flex flex-row pb-1",
        checkbox: "px-2",
        checktext: ""
    }

    return (
        <div className="flex min-h-screen justify-center flex-grow">
            {!cookies.access_token ? <h1 className="text-3xl mt-10 mx-3">You do not have access to this page. Please log in and try again.</h1> :
            <div className="w-[40%] pt-[3%] text-lg">
                <h2 className="text-3xl text-center pb-[4%] font-semibold">Create Opportunity</h2>
                <form className="flex flex-col">
                    <div className="flex flex-col pb-[2%]"><label htmlFor="name">Opportunity name:</label>
                    <input type="text" id="name" name="name" className="border border-gray rounded-md mt-[1%] w-[99%] mb-[1%]" placeholder="" onChange={handleChange}/></div>
                    <div className="flex flex-col pb-[2%]"><label htmlFor="link">Link:</label>
                    <input type="url" id="link" name="link" className="border border-gray rounded-md mt-[1%] w-[99%] mb-[1%]" onChange={handleChange}/></div>
                    <div className="flex flex-col pb-[2%]"><label htmlFor="description">Description:</label>
                    <textarea type="text" id="description" name="description" className="border border-gray rounded-md mt-[1%] w-[99%] mb-[2%]" onChange={handleChange}></textarea></div>


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

                    <button type="submit" className="mt-[5%] rounded-lg bg-blue-500 text-white font-semibold py-[1%]" onClick={onSubmit}>Create Opportunity</button>
                </form>
            </div>
            }
        </div>
    );
}