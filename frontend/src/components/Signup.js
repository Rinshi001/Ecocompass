import React from 'react';
import { Link } from 'react-router-dom';  // Import Link component for routing
import styles from '../styles/Signup.module.css';
import passimg from "../assets/v1_16.png";
import usrimg from "../assets/v3_32.png";
import mailimg from "../assets/v1_17.png";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Company");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        name: fullName,
        email,
        password,
        user_type: userType,
      });
      localStorage.setItem("access_token", response.data.access);
      alert("Signup successful!");
    }
    catch (error){
      console.error("Signup Failed", error);
    }
    
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignup}>
        <h1 className={styles.heading}>Sign Up</h1>

        <div className={styles.inputGroup}>
          <span className={styles.icon}>
            <img src={usrimg} alt="user" style={{ width: '25px', height: '25px' }} />
          </span>
          <input 
          type="text" 
          placeholder="Full Name" 
          className={styles.input}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.icon}>
            <img src={mailimg} alt="mail" style={{ width: '25px', height: '25px' }} />
          </span>
          <input type="email" placeholder="Email" className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.icon}>
            <img src={passimg} alt="pass" style={{ width: '25px', height: '25px' }} />
          </span>
          <input type="password" placeholder="Password" className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
           />
        </div>

        <div className={styles.inputGroup}>
          <select className={styles.select}
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required>
            <option value="" disabled selected>
              Select Account type
            </option>
            <option value="Investor">Investor</option>
            <option value="Company">Company</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.loginText}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
