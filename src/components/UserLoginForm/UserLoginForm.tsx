// This component is a login form for users to enter their credentials!

"use client"; // This is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { StarIcon } from "@heroicons/react/24/outline";
import { UserDataManager } from "@/data/userData";
import styles from "./UserLoginForm.module.css";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Validate email format and domain
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com"]; // Example domains
    const domain = email.split("@")[1];
    return emailRegex.test(email) && validDomains.includes(domain);
  };

  // Validate password requirements
  const validatePassword = (password: string) => {
    const lengthCheck = password.length > 7; // At least 8 characters
    const lowerCaseCheck = /[a-z]/.test(password); // At least 1 lowercase letter
    const upperCaseCheck = /[A-Z]/.test(password); // At least 1 uppercase letter
    const numberCheck = /\d/.test(password); // At least 1 number
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least 1 special character

    return {
      isValid:
        lengthCheck &&
        lowerCaseCheck &&
        upperCaseCheck &&
        numberCheck &&
        specialCharCheck,
      errors: {
        lengthCheck,
        lowerCaseCheck,
        upperCaseCheck,
        numberCheck,
        specialCharCheck,
      },
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setMessage("Invalid email address or domain.");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const missingComponents = [];
      if (!passwordValidation.errors.lengthCheck)
        missingComponents.push("at least 8 characters");
      if (!passwordValidation.errors.lowerCaseCheck)
        missingComponents.push("1 lowercase letter");
      if (!passwordValidation.errors.upperCaseCheck)
        missingComponents.push("1 uppercase letter");
      if (!passwordValidation.errors.numberCheck)
        missingComponents.push("1 numerical character");
      if (!passwordValidation.errors.specialCharCheck)
        missingComponents.push("1 special character");

      setMessage(`Password is missing: ${missingComponents.join(", ")}.`);
      return;
    }    // Check credentials against real user data
    const user = UserDataManager.authenticateUser(email, password);

    if (user) {
      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString()
      }));

      setMessage("Login successful!");
      
      // Route based on user role
      if (user.role === 'admin') {
        // Store admin session for admin portal
        localStorage.setItem('adminSession', JSON.stringify({
          email: user.email,
          role: user.role,
          loginTime: new Date().toISOString()
        }));
        router.push("/adminportal"); // Redirect admins to admin portal
      } else {
        router.push("/finditallmain"); // Redirect clients to main portal
      }
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      {/* Star Icon */}
      <div className={styles.icon}>
        <StarIcon className={styles.star} />
      </div>

      <h1 className={styles.title}>Welcome Back!</h1>
      <p className={styles.subtitle}>Please log in to enjoy shopping</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor = "email" className={styles.label}>
            Email
          </label>
          <input
            type = "email"
            id = "email"
            placeholder = "Enter your email address"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor = "password" className={styles.label}>
            Password
          </label>
          <input
            type = "password"
            id = "password"
            placeholder = "Enter your password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type = "submit" className={styles.button}>
          Log In
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}      <div className={styles.links}>
        <a href = "#" className={styles.link}>
          Forgot your password? <span>Click here</span>
        </a>
        <a href = "#" className={styles.link}>
          New to the website? <span>Sign up!</span>
        </a>
        <button 
          onClick={() => router.push('/adminloginportal')} 
          className={styles.link}
          style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
        >
          Are you an Admin? <span>Verify your identity!</span>
        </button>
      </div>
    </div>
  );
};

export default UserLoginForm;