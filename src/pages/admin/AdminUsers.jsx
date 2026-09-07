import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Pencil,
  Power,
  X,
  Users,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./AdminUsers.css";
import { useAdmin } from "../../context/AdminContext";
import { useSearchParams } from "react-router-dom";
function AdminUsers() {
  const {
  users,
  addUser,
  updateUser,
  toggleUserStatus,
} = useAdmin();
  
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    department: "",
    status: "Active",
  });
  const [searchParams] = useSearchParams();

const initialSearch = searchParams.get("search") || "";
const [searchTerm, setSearchTerm] =
  useState(initialSearch);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.department.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const openAddModal = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      role: "Employee",
      department: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.department.trim()
  ) {
    alert("Please fill all required fields.");
    return;
  }

  if (editingUser) {
    updateUser(
      editingUser.id,
      formData
    );
  } else {
    addUser(formData);
  }

  closeModal();
};

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div className="admin-users-layout">
      <AdminSidebar />

      <div className="admin-users-main">
        <AdminNavbar />

        <main className="admin-users-content">
          <div className="admin-users-header">
            <div>
              <p className="admin-users-label">
                USER MANAGEMENT
              </p>

              <h1>Users</h1>

              <p>
                Manage platform users, roles, departments and
                account status.
              </p>
            </div>

            <button
              className="admin-add-user-button"
              onClick={openAddModal}
            >
              <UserPlus size={18} />
              Add User
            </button>
          </div>

          <section className="admin-users-summary">
            <div className="admin-user-summary-card">
              <div className="admin-summary-icon">
                <Users size={21} />
              </div>

              <div>
                <span>Total Users</span>
                <strong>{users.length}</strong>
              </div>
            </div>

            <div className="admin-user-summary-card">
              <div className="admin-summary-icon">
                <Power size={21} />
              </div>

              <div>
                <span>Active Users</span>
                <strong>{activeUsers}</strong>
              </div>
            </div>

            <div className="admin-user-summary-card">
              <div className="admin-summary-icon">
                <Power size={21} />
              </div>

              <div>
                <span>Inactive Users</span>
                <strong>{inactiveUsers}</strong>
              </div>
            </div>
          </section>

          <section className="admin-users-panel">
            <div className="admin-users-toolbar">
              <div className="admin-users-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search by name, email or department..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>

              <div className="admin-users-filters">
                <div className="admin-filter-group">
                  <Filter size={16} />

                  <select
                    value={roleFilter}
                    onChange={(e) =>
                      setRoleFilter(e.target.value)
                    }
                  >
                    <option value="All">All Roles</option>
                    <option value="Super Admin">
                      Super Admin
                    </option>
                    <option value="HR Manager">
                      HR Manager
                    </option>
                    <option value="Recruiter">
                      Recruiter
                    </option>
                    <option value="Hiring Manager">
                      Hiring Manager
                    </option>
                    <option value="Interviewer">
                      Interviewer
                    </option>
                    <option value="Employee">
                      Employee
                    </option>
                  </select>
                </div>

                <div className="admin-filter-group">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                  >
                    <option value="All">
                      All Status
                    </option>
                    <option value="Active">
                      Active
                    </option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="admin-users-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="admin-users-user-cell">
                            <div className="admin-users-avatar">
                              {user.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
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
                          <span className="admin-user-role">
                            {user.role}
                          </span>
                        </td>

                        <td>{user.department}</td>

                        <td>
                          <span
                            className={
                              user.status === "Active"
                                ? "admin-user-status active"
                                : "admin-user-status inactive"
                            }
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>
                          <div className="admin-user-actions">
                            <button
                              className="admin-action-button"
                              title="Edit user"
                              onClick={() =>
                                openEditModal(user)
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              className={
                                user.status === "Active"
                                  ? "admin-action-button deactivate"
                                  : "admin-action-button activate"
                              }
                              title={
                                user.status === "Active"
                                  ? "Deactivate user"
                                  : "Activate user"
                              }
                              onClick={() =>
                                toggleUserStatus(user.id)
                              }
                            >
                              <Power size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="admin-no-users"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {showModal && (
        <div className="admin-user-modal-overlay">
          <div className="admin-user-modal">
            <div className="admin-user-modal-header">
              <div>
                <h2>
                  {editingUser
                    ? "Edit User"
                    : "Add New User"}
                </h2>

                <p>
                  {editingUser
                    ? "Update user information and access."
                    : "Create a new platform user."}
                </p>
              </div>

              <button
                className="admin-modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="admin-user-form"
              onSubmit={handleSubmit}
            >
              <div className="admin-user-form-group">
                <label>
                  Full Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="admin-user-form-group">
                <label>
                  Email
                  <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="admin-user-form-row">
                <div className="admin-user-form-group">
                  <label>Role</label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Super Admin">
                      Super Admin
                    </option>

                    <option value="HR Manager">
                      HR Manager
                    </option>

                    <option value="Recruiter">
                      Recruiter
                    </option>

                    <option value="Hiring Manager">
                      Hiring Manager
                    </option>

                    <option value="Interviewer">
                      Interviewer
                    </option>

                    <option value="Employee">
                      Employee
                    </option>
                  </select>
                </div>

                <div className="admin-user-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              <div className="admin-user-form-group">
                <label>
                  Department
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="Example: Engineering"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>

              <div className="admin-user-form-actions">
                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-save-user-button"
                >
                  {editingUser
                    ? "Save Changes"
                    : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;