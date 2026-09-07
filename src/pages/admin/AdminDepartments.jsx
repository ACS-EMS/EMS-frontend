import { useMemo, useState } from "react";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Users,
  X,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "../../context/AdminContext";

import "./AdminDepartments.css";

function AdminDepartments() {
    const { users } = useAdmin();
  const defaultDepartments = [
    {
      id: 1,
      name: "Engineering",
      manager: "Kiran Kumar",
      employees: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Human Resources",
      manager: "Anjali Reddy",
      employees: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Design",
      manager: "Priya Singh",
      employees: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Analytics",
      manager: "Rahul Sharma",
      employees: 3,
      status: "Inactive",
    },
  ];

  const [departments, setDepartments] = useState(() => {
  const savedDepartments =
    localStorage.getItem("adminDepartments");

  return savedDepartments
    ? JSON.parse(savedDepartments)
    : [];
});

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    status: "Active",
  });

  const filteredDepartments = useMemo(() => {
    const value = searchTerm.toLowerCase().trim();

    if (!value) {
      return departments;
    }

    return departments.filter(
      (department) =>
        department.name
          .toLowerCase()
          .includes(value) ||
        department.manager
          .toLowerCase()
          .includes(value)
    );
  }, [departments, searchTerm]);

  const saveDepartments = (updatedDepartments) => {
    setDepartments(updatedDepartments);

    localStorage.setItem(
      "adminDepartments",
      JSON.stringify(updatedDepartments)
    );
  };

  const openCreateModal = () => {
    setEditingDepartment(null);

    setFormData({
      name: "",
      manager: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name,
      manager: department.manager,
      status: department.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);

    setFormData({
      name: "",
      manager: "",
      status: "Active",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Department name is required.");
      return;
    }

    if (editingDepartment) {
      const updatedDepartments =
        departments.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...formData,
              }
            : department
        );

      saveDepartments(updatedDepartments);
    } else {
      const newDepartment = {
  id: Date.now(),
  ...formData,
};

      saveDepartments([
        newDepartment,
        ...departments,
      ]);
    }

    closeModal();
  };

  const deleteDepartment = (department) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${department.name}?`
    );

    if (!confirmed) {
      return;
    }

    const updatedDepartments =
      departments.filter(
        (item) => item.id !== department.id
      );

    saveDepartments(updatedDepartments);
  };

  const activeDepartments =
    departments.filter(
      (department) =>
        department.status === "Active"
    ).length;
    const getEmployeeCount = (departmentName) => {
  return users.filter(
    (user) =>
      user.department?.toLowerCase() ===
      departmentName.toLowerCase()
  ).length;
};

  const totalEmployees = departments.reduce(
  (total, department) =>
    total + getEmployeeCount(department.name),
  0
);
  return (
    <div className="admin-departments-layout">
      <AdminSidebar />

      <div className="admin-departments-main">
        <AdminNavbar />

        <main className="admin-departments-content">
          <div className="admin-departments-header">
            <div>
              <p>ORGANIZATION</p>

              <h1>Departments</h1>

              <span>
                Manage organization departments
                and department managers.
              </span>
            </div>

            <button
              className="admin-add-department-button"
              onClick={openCreateModal}
            >
              <Plus size={18} />
              Add Department
            </button>
          </div>

          <div className="admin-department-stats">
            <div className="admin-department-stat-card">
              <div className="admin-department-stat-icon">
                <Building2 size={22} />
              </div>

              <div>
                <span>Total Departments</span>
                <strong>
                  {departments.length}
                </strong>
              </div>
            </div>

            <div className="admin-department-stat-card">
              <div className="admin-department-stat-icon">
                <Building2 size={22} />
              </div>

              <div>
                <span>Active Departments</span>
                <strong>
                  {activeDepartments}
                </strong>
              </div>
            </div>

            <div className="admin-department-stat-card">
              <div className="admin-department-stat-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Total Employees</span>
                <strong>
                  {totalEmployees}
                </strong>
              </div>
            </div>
          </div>

          <section className="admin-departments-card">
            <div className="admin-departments-toolbar">
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <div className="admin-departments-table-wrapper">
              <table className="admin-departments-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Manager</th>
                    <th>Employees</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDepartments.length >
                  0 ? (
                    filteredDepartments.map(
                      (department) => (
                        <tr key={department.id}>
                          <td>
                            <div className="admin-department-name">
                              <div className="admin-department-avatar">
                                <Building2
                                  size={18}
                                />
                              </div>

                              <strong>
                                {
                                  department.name
                                }
                              </strong>
                            </div>
                          </td>

                          <td>
                            {department.manager ||
                              "Not Assigned"}
                          </td>

                          <td>
  {getEmployeeCount(department.name)}
</td>

                          <td>
                            <span
                              className={`admin-department-status ${
                                department.status ===
                                "Active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {
                                department.status
                              }
                            </span>
                          </td>

                          <td>
                            <div className="admin-department-actions">
                              <button
                                title="Edit department"
                                onClick={() =>
                                  openEditModal(
                                    department
                                  )
                                }
                              >
                                <Pencil
                                  size={16}
                                />
                              </button>

                              <button
                                title="Delete department"
                                className="delete"
                                onClick={() =>
                                  deleteDepartment(
                                    department
                                  )
                                }
                              >
                                <Trash2
                                  size={16}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="admin-department-empty"
                      >
                        No departments found.
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
        <div className="admin-department-modal-overlay">
          <div className="admin-department-modal">
            <div className="admin-department-modal-header">
              <div>
                <h2>
                  {editingDepartment
                    ? "Edit Department"
                    : "Add Department"}
                </h2>

                <p>
                  Configure department details.
                </p>
              </div>

              <button
                className="admin-department-modal-close"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-department-form-group">
                <label>
                  Department Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter department name"
                />
              </div>

              <div className="admin-department-form-group">
                <label>
                  Department Manager
                </label>

                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  placeholder="Enter manager name"
                />
              </div>

              <div className="admin-department-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <div className="admin-department-modal-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save"
                >
                  {editingDepartment
                    ? "Update Department"
                    : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDepartments;