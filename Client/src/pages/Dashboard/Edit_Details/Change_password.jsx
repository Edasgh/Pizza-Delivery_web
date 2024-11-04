import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Change_password = () => {
    const [credentials, setCredentials] = useState({ password:"",confirmPassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/user/change_password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({
                password: credentials.password,
            }),
        });
        const json = await response.json();
        if (response.status==201) {
            alert("Password changed successfully!")

            navigate("/profile_dashboard");
        } else {
            alert("Error : An unknown error occurred!")

        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const [isShown, setIsSHown] = useState(false);

    // This function is called when the checkbox is checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };


    return (
        <>
            <div className="main-div" style={{ width: "68vw" ,margin:"auto"}}>
                <h1 className="section-title poppins-semibold form-title">Change Your Password</h1>
                <form
                    onSubmit={handleSubmit}
                    className="form"
                >



                    <input
                        type={isShown ? "text" : "password"}
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        placeholder="Enter new Password"
                        minLength={8}
                        required
                    />

                    <input
                        type={isShown ? "text" : "password"}
                        className="form-control"
                        value={credentials.confirmPassword}
                        onChange={onChange}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm new Password"
                        minLength={8}
                        required
                    />

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="passcheck"
                            checked={isShown}
                            onChange={togglePassword}
                        />
                        &nbsp;
                        <label className="form-check-label" htmlFor="passcheck">
                            Show Password
                        </label>
                    </div>
                    <hr />


                    <button type="submit" id="edit-details-btn" >
                     Change Password
                    </button>
                </form>
            </div>
        </>
    )
}

export default Change_password;