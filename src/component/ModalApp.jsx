import React, { useState } from "react";
import "./ModalApp.css";

const FormModal = ({ isopen, onclose }) => {
    const [username, setusername] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [dob, setDOB] = useState("");

    const validateEmail = (emailAdd) => {
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailregex.test(emailAdd);
    };

    const validatenum = (phoneNum) => {
        return phoneNum.length === 10;
    };

    const validateDOB = (dob) => {
        return new Date(dob).getTime() < new Date().getTime();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(emailAdd)) {
            alert("Invalid email. Please check your email address.");
            return;
        }

        if (!validatenum(phoneNum)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            return;
        }
        if (!validateDOB(dob)) {
            alert("Invalid date of birth. Date of birth cannot be in the future.");
            return;
        }

        onclose();
    };

    if (!isopen) return null;

    return (
        <div className="modal-content" onClick={onclose} >
            <form className="modal-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <h3>Fill Details</h3>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" id="username" value={username} onChange={(e) => setusername(e.target.value)} required /><br/>
                
                <label htmlFor="email">Email Address: </label><br/>
                <input type="email" name="email" id="email" value={emailAdd} required onChange={(e) => setEmailAdd(e.target.value)} /><br/>
                
                <label htmlFor="phone">Phone Number:</label><br/>
                <input type="number" name="phone" id="phone" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required /><br/>
                
                <label htmlFor="dob">Date of Birth:</label><br/>
                <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required /><br/>
                
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default function ModalApp() {
    const [isopen, setModalopen] = useState(false);

    return (
            <div className="modal">
                <h1>User Details Modal</h1>
                <button type="button" onClick={() => setModalopen(true)} className="btn">Open Form</button>

                <FormModal isopen={isopen} onclose={() => setModalopen(false)} />
            </div>
    );
}
