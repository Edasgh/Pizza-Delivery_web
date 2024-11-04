import React from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Edit_Details = () => {
    const { data: userDetails, status } = useSelector((state) => state.user);

    const [credentials, setCredentials] = useState({ name: userDetails.name, email: userDetails.email, address: userDetails.address });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/user/edit_details", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                address: credentials.address
            }),
        });
        const json = await response.json();
        if (response.status==201) {
            alert("Updated profile successfully!")

            navigate("/profile_dashboard");
        } else {
            alert("Error : An unknown error occurred!")

        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className="main-div" style={{ width: "100%" }}>
                <h1 className="section-title poppins-semibold form-title">Edit Your Details</h1>
                <form
                    onSubmit={handleSubmit}
                    className="form"
                >


                    <input
                        type="text"
                        value={credentials.name}
                        onChange={onChange}
                        id="name"
                        name="name"
                        aria-describedby="name"
                        placeholder="Enter your name"
                        required

                    />
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter your email"
                        required

                    />


                    <textarea name="address" id="address" value={credentials.address} placeholder='Enter your address' onChange={onChange} required></textarea>
                    <hr />


                    <button type="submit" id="edit-details-btn" >
                        Update Profile
                    </button>
                </form>
            </div>
        </>
    )
}

export default Edit_Details;