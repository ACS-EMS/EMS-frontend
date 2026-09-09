import { useState } from "react";
import {
  Users,
  UserCheck,
  Building2,
  ShieldCheck,
  BriefcaseBusiness,
  Clock3,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "../../context/AdminContext";

import "./AdminReports.css";

function AdminReports() {
  const { users } = useAdmin();

  const totalUsers = users.length;
  const [departments] = useState(() => {
  const savedDepartments =
    localStorage.getItem("adminDepartments");

  return savedDepartments
    ? JSON.parse(savedDepartments)
    : [];
});
  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const employeeCount = users.filter(
    (user) => user.role === "Employee"
  ).length;



  const totalDepartments = departments.length;
  const getDepartmentUserCount = (departmentName) => {
  return users.filter(
    (user) =>
      user.department?.toLowerCase() ===
      departmentName.toLowerCase()
  ).length;
};

  const roleDistribution = users.reduce(
    (acc, user) => {
      const role = user.role || "Unknown";

      acc[role] = (acc[role] || 0) + 1;

      return acc;
    },
    {}
  );


  const recruitmentReports = [
  "Total Applications",
  "AI Screened",
  "Shortlisted",
  "Interviewed",
  "Selected",
  "Rejected",
  "Joined",
  "Time to Hire",
  "Time to Shortlist",
  "Offer Acceptance Rate",
  "Interview Conversion Rate",
  "Source Effectiveness",
  "Recruiter Performance",
];
const employeeReports = [
  {
    name: "Total Employees",
    value: employeeCount,
    connected: true,
  },
  {
    name: "Active Employees",
    value: users.filter(
      (user) =>
        user.role === "Employee" &&
        user.status === "Active"
    ).length,
    connected: true,
  },
  {
    name: "New Employees",
    value: "—",
    connected: false,
  },
  {
    name: "On Leave",
    value: "—",
    connected: false,
  },
  {
    name: "Open Positions",
    value: "—",
    connected: false,
  },
];

const employeeAnalytics = [
  "Employee Distribution",
  "Department Distribution",
  "Hiring Trends",
  "Attrition Trends",
  "Attendance",
  "Leave",
  "Performance",
];

  return (
    <div className="admin-reports-layout">
      <AdminSidebar />

      <div className="admin-reports-main">
        <AdminNavbar />

        <main className="admin-reports-content">
          <div className="admin-reports-header">
            <div>
              <p>ANALYTICS & REPORTING</p>

              <h1>Reports</h1>

              <span>
                View organization and recruitment
                analytics.
              </span>
            </div>
          </div>

          <div className="admin-report-stats">
            <div className="admin-report-stat-card">
              <div className="admin-report-stat-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Total Users</span>
                <strong>{totalUsers}</strong>
              </div>
            </div>

            <div className="admin-report-stat-card">
              <div className="admin-report-stat-icon">
                <UserCheck size={22} />
              </div>

              <div>
                <span>Active Users</span>
                <strong>{activeUsers}</strong>
              </div>
            </div>

            <div className="admin-report-stat-card">
              <div className="admin-report-stat-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <span>Employees</span>
                <strong>{employeeCount}</strong>
              </div>
            </div>

            <div className="admin-report-stat-card">
              <div className="admin-report-stat-icon">
                <Building2 size={22} />
              </div>

              <div>
                <span>Departments</span>
                <strong>
                  {totalDepartments}
                </strong>
              </div>
            </div>
          </div>

          <div className="admin-report-grid">
            <section className="admin-report-card">
              <div className="admin-report-card-header">
                <div>
                  <h2>Role Distribution</h2>

                  <p>
                    Number of users assigned to each
                    system role.
                  </p>
                </div>
              </div>

              <div className="admin-report-list">
                {Object.entries(
                  roleDistribution
                ).map(([role, count]) => (
                  <div
                    className="admin-report-list-item"
                    key={role}
                  >
                    <span>{role}</span>

                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="admin-report-card">
              <div className="admin-report-card-header">
                <div>
                  <h2>
                    Department Distribution
                  </h2>

                  <p>
                    Users grouped by assigned
                    department.
                  </p>
                </div>
              </div>

              <div className="admin-report-list">
                {departments.map((department) => (
  <div
  className="admin-report-list-item"
  key={department.id}
>
    <span>{department.name}</span>

    <strong>
      {getDepartmentUserCount(department.name)}
    </strong>
  </div>
))}
              </div>
            </section>
          </div>
          <section className="admin-recruitment-report-card admin-employee-report-card">
  <div className="admin-report-card-header">
    <div>
      <h2>Employee Analytics</h2>

      <p>
        Employee workforce metrics and organization
        analytics.
      </p>
    </div>

    <Users size={22} />
  </div>

  <div className="admin-employee-metric-grid">
    {employeeReports.map((report) => (
      <div
        className="admin-employee-metric-card"
        key={report.name}
      >
        <span>{report.name}</span>

        <strong>{report.value}</strong>

        {!report.connected && (
          <div className="admin-report-not-connected">
            <Clock3 size={14} />
            Not connected yet
          </div>
        )}
      </div>
    ))}
  </div>

  <div className="admin-employee-analysis-section">
    <h3>Workforce Reports</h3>

    <div className="admin-employee-analysis-grid">
      {employeeAnalytics.map((analytics) => (
        <div
          className="admin-employee-analysis-item"
          key={analytics}
        >
          <div>
            <span>{analytics}</span>

            <strong>—</strong>
          </div>

          <div className="admin-report-not-connected">
            <Clock3 size={14} />
            Not connected yet
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
          <section className="admin-recruitment-report-card">
            <div className="admin-report-card-header">
              <div>
                <h2>
                  Recruitment Analytics
                </h2>

                <p>
                  Recruitment metrics from the
                  candidate hiring pipeline.
                </p>
              </div>

              <BriefcaseBusiness size={22} />
            </div>

            <div className="admin-recruitment-report-grid">
              {recruitmentReports.map(
                (report) => (
                  <div
                    className="admin-recruitment-report-item"
                    key={report}
                  >
                    <div>
                      <span>
                        {report}
                      </span>

                      <strong>—</strong>
                    </div>

                    <div className="admin-report-not-connected">
                      <Clock3 size={14} />
                      Not connected yet
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminReports;