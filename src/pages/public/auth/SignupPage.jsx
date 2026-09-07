import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary frontend signup
    console.log("Account created:", formData.email);

    navigate("/login");
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Header */}
        <div className="signup-header">

          <div className="signup-icon">
            👤
          </div>

          <h1>Create Account</h1>

          <p>
            Create your TalentAI account
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSignup}>

          {/* Email */}
          <div className="signup-form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {/* Password */}
          <div className="signup-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {/* Confirm Password */}
          <div className="signup-form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>

          {/* Error */}
          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="signup-button"
          >
            Create Account
            <span>→</span>
          </button>

        </form>

        {/* Login link */}
        <div className="signup-login-section">

          <p>
            Already have an account?
          </p>

          <Link
            to="/login"
            className="signup-login-link"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default SignupPage;