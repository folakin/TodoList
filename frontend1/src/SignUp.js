import React from "react";
import { useState } from "react";



const SignUp = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    alert(data.detail || "Error during signup");
                } else {
                    console.log("Sign up successful:", data);
                    alert("Sign up successful!");
                    setFormData({ username: "", email: "", password: "" }); // Clear the form
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } 
        catch (error) {
            console.error("Error during fetch:", error);
        }
    }


    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={handleChange} required value={formData.username} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} required value={formData.email} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required value={formData.password} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}


export default SignUp;