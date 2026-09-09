import {
  Users,
  Building2,
  BriefcaseBusiness,
  UserCheck,
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

const {
  users,
  activities,
} = useAdmin();

const recentUsers = users.slice(0, 4);

const recentActivities =
  activities.slice(0, 5);

  const totalDepartments = [
  ...new Set(users.map((user) => user.department).filter(Boolean)),
].length;

const activeEmployees = users.filter(
  (user) =>
    user.role === "Employee" &&
    user.status === "Active"
).length;

const stats = [
  {
    title: "Total Users",
    value: users.length,
    description: "Across all roles",
    icon: <Users size={24} />,
  },
  {
    title: "Departments",
    value: totalDepartments,
    description: "Active departments",
    icon: <Building2 size={24} />,
  },
  {
    title: "Active Employees",
    value: activeEmployees,
    description: "Currently active",
    icon: <UserCheck size={24} />,
  },
  {
    title: "Open Jobs",
    value: 0,
    description: "Backend not connected yet",
    icon: <BriefcaseBusiness size={24} />,
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

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;