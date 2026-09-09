import { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  ClipboardList,
  CalendarCheck,
  Clock3,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

function AdminDashboard() {
  const navigate = useNavigate();

  const { users, activities } = useAdmin();

  const [dashboardSummary, setDashboardSummary] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalCandidates: 0,
    totalApplications: 0,
    totalInterviews: 0,
    pendingApplications: 0,
  });

  const [summaryLoading, setSummaryLoading] = useState(true);

  const recentUsers = users.slice(0, 4);

  const recentActivities = activities.slice(0, 5);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
  "/api/dashboard/summary",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Dashboard request failed: ${response.status}`
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardSummary(result.data);
        }
      } catch (error) {
        console.error("Dashboard summary error:", error);
      } finally {
        setSummaryLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  const stats = [
    {
      title: "Total Jobs",
      value: summaryLoading
        ? "..."
        : dashboardSummary.totalJobs,
      description: "All recruitment jobs",
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Active Jobs",
      value: summaryLoading
        ? "..."
        : dashboardSummary.activeJobs,
      description: "Currently active jobs",
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Candidates",
      value: summaryLoading
        ? "..."
        : dashboardSummary.totalCandidates,
      description: "Registered candidates",
      icon: <Users size={24} />,
    },
    {
      title: "Total Applications",
      value: summaryLoading
        ? "..."
        : dashboardSummary.totalApplications,
      description: "Candidate applications",
      icon: <ClipboardList size={24} />,
    },
    {
      title: "Total Interviews",
      value: summaryLoading
        ? "..."
        : dashboardSummary.totalInterviews,
      description: "Interview records",
      icon: <CalendarCheck size={24} />,
    },
    {
      title: "Pending Applications",
      value: summaryLoading
        ? "..."
        : dashboardSummary.pendingApplications,
      description: "Waiting for review",
      icon: <Clock3 size={24} />,
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="admin-content">
          <div className="admin-page-header">
            <div>
              <p className="admin-page-label">
                OVERVIEW
              </p>

              <h1>Super Admin Dashboard</h1>

              <p>
                Manage your organization, users and platform settings.
              </p>
            </div>

            <div className="admin-header-date">
              Platform Overview
            </div>
          </div>

          <section className="admin-stats-grid">
            {stats.map((stat) => (
              <div
                className="admin-stat-card"
                key={stat.title}
              >
                <div className="admin-stat-card-top">
                  <div className="admin-stat-icon">
                    {stat.icon}
                  </div>

                  <ArrowUpRight size={18} />
                </div>

                <p>{stat.title}</p>

                <h2>{stat.value}</h2>

                <span>
                  {stat.description}
                </span>
              </div>
            ))}
          </section>

          <section className="admin-dashboard-grid">
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2>Recent Users</h2>

                  <p>
                    Recently added platform users
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/super-admin/users")
                  }
                >
                  View All
                </button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.email}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-user-avatar">
                              {user.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div>
                              <strong>
                                {user.name}
                              </strong>

                              <span>
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          {user.role}
                        </td>

                        <td>
                          <span
                            className={
                              user.status === "Active"
                                ? "admin-status active"
                                : "admin-status inactive"
                            }
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {recentUsers.length === 0 && (
                      <tr>
                        <td colSpan="3">
                          No users available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2>Recent Activity</h2>

                  <p>
                    Latest administrative actions
                  </p>
                </div>

                <Activity size={20} />
              </div>

              <div className="admin-activity-list">
                {recentActivities.map((activity) => (
                  <div
                    className="admin-activity-item"
                    key={activity.id}
                  >
                    <div className="admin-activity-dot"></div>

                    <div>
                      <strong>
                        {activity.message}
                      </strong>

                      <span>
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}

                {recentActivities.length === 0 && (
                  <p>No recent activity.</p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;