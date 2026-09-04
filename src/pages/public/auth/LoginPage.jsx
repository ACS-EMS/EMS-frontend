import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  // Selected role
  const [role, setRole] = useState("employee");

  // Login form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle username/password
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.password) {
      setError("Please enter username/email and password.");
      return;
    }

    /*
      TEMPORARY FRONTEND ROLE LOGIN

      Later this will be replaced with
      FastAPI authentication.
    */

    if (role === "hr") {
      navigate("/hr/dashboard");
    }

    else if (role === "super-admin") {
      navigate("/super-admin/dashboard");
    }

    else if (role === "recruiter") {
      navigate("/recruiter/dashboard");
    }

    else if (role === "employee") {
      navigate("/employee/dashboard");
    }
  };

  return (
    <div className="login-page">

      {/* ==============================
          LEFT SIDE
      ============================== */}

      <div className="login-left">

        <div className="login-brand">

          <h1>
            Talent<span>AI</span>
          </h1>

          <p>
            AI-Powered Recruitment Platform
          </p>

        </div>


        <div className="login-left-content">

          <h2>
            Manage your
            <br />
            <span>talent smarter.</span>
          </h2>

          <p>
            AI-powered recruitment and employee
            management platform designed for
            modern organizations.
          </p>


          <div className="login-features">

            <div className="feature-item">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <h4>
                  Smart Recruitment
                </h4>

                <p>
                  AI-powered candidate screening
                </p>
              </div>

            </div>


            <div className="feature-item">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <h4>
                  Employee Management
                </h4>

                <p>
                  Manage your workforce efficiently
                </p>
              </div>

            </div>


            <div className="feature-item">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <h4>
                  Role Based Access
                </h4>

                <p>
                  Secure access for every user
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==============================
          RIGHT SIDE
      ============================== */}

      <div className="login-right">

        <div className="login-card">

          {/* Header */}

          <div className="login-header">

            <div className="login-icon">
              👤
            </div>

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to your TalentAI account
            </p>

          </div>


          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* ==============================
                ROLE
            ============================== */}

            <div className="form-group">

              <label htmlFor="role">
                Login As
              </label>

              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >

                <option value="hr">
                  HR
                </option>

                <option value="super-admin">
                  Super Admin
                </option>

                <option value="recruiter">
                  Recruiter
                </option>

                <option value="employee">
                  Employee
                </option>

              </select>

            </div>


            {/* ==============================
                USERNAME
            ============================== */}

            <div className="form-group">

              <label htmlFor="username">
                Username / Email
              </label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username or email"
                value={formData.username}
                onChange={handleChange}
              />

            </div>


            {/* ==============================
                PASSWORD
            ============================== */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* ==============================
                REMEMBER + FORGOT
            ============================== */}

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>


              <Link
                to="/forgot-password"
                className="forgot-password"
              >
                Forgot Password?
              </Link>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* ==============================
                LOGIN BUTTON
            ============================== */}

            <button
              type="submit"
              className="login-button"
            >
              Login
              <span>→</span>
            </button>

          </form>


          {/* ==============================
              SIGN UP
          ============================== */}

          <div className="divider">
            <span>or</span>
          </div>


          <div className="signup-section">

            <p>
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="signup-link"
            >
              Create an Account
            </Link>

          </div>


          {/* BACK TO HOME */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;