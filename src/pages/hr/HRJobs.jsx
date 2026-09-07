import React, { useEffect, useState } from "react";
import HRSidebar from "./HRSidebar";
import "./HRJobs.css";

function HRJobs() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
  const savedJobs =
    JSON.parse(localStorage.getItem("hrJobs")) || [];

  setJobs(savedJobs);
}, []);
  return (
    <div className="hr-dashboard">

      <HRSidebar />

      <main className="hr-main">

        <header className="hr-header">
          <div>
            <h1>Jobs</h1>
            <p>Manage your organization's job openings.</p>
          </div>

          <button className="create-job-button">
            + Create Job
          </button>
        </header>

        <section className="jobs-stats">

          <div className="job-stat-card">
            <span>Open Positions</span>
            <strong>24</strong>
          </div>

          <div className="job-stat-card">
            <span>Active Jobs</span>
            <strong>18</strong>
          </div>

          <div className="job-stat-card">
            <span>Total Applications</span>
            <strong>1,000</strong>
          </div>

        </section>

        <section className="jobs-panel">

          <div className="jobs-panel-header">
            <h2>Job Openings</h2>

            <input
              type="text"
              placeholder="Search jobs..."
            />
          </div>

          <div className="job-table">

            <div className="job-row job-heading">
              <span>Job Title</span>
              <span>Department</span>
              <span>Applications</span>
              <span>Status</span>
            </div>

            {jobs.length === 0 ? (
  <div className="no-jobs">
    No jobs have been created yet.
  </div>
) : (
  jobs.map((job) => (
    <div className="job-row" key={job.id}>

      <span>{job.title}</span>

      <span>{job.department}</span>

      <span>{job.applications}</span>

      <span
        className={`job-status ${
          job.status.toLowerCase()
        }`}
      >
        {job.status}
      </span>

    </div>
  ))
)}

            <div className="job-row">
              <span>
                Data Analyst
              </span>

              <span>
                Analytics
              </span>

              <span>
                180
              </span>

              <span className="job-status active">
                Active
              </span>
            </div>

            <div className="job-row">
              <span>
                HR Executive
              </span>

              <span>
                Human Resources
              </span>

              <span>
                95
              </span>

              <span className="job-status active">
                Active
              </span>
            </div>

            <div className="job-row">
              <span>
                UI/UX Designer
              </span>

              <span>
                Design
              </span>

              <span>
                120
              </span>

              <span className="job-status closed">
                Closed
              </span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default HRJobs;