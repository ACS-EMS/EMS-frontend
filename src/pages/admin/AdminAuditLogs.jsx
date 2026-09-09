import { useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  User,
  ShieldCheck,
  Building2,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "../../context/AdminContext";

import "./AdminAuditLogs.css";

function AdminAuditLogs() {
  const { auditLogs = [] } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const filteredLogs = useMemo(() => {
  return auditLogs.filter((log) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      log.action.toLowerCase().includes(search) ||
      log.details.toLowerCase().includes(search) ||
      log.module.toLowerCase().includes(search) ||
      log.performedBy.toLowerCase().includes(search);

    const matchesAction =
      actionFilter === "All" ||
      log.type === actionFilter;

    let matchesDate = true;

if (dateFilter) {
  if (!log.timestamp) {
    return false;
  }

  const selectedDate =
    new Date(dateFilter).toLocaleDateString();

  const logDate =
    new Date(log.timestamp).toLocaleDateString();

  matchesDate =
    selectedDate === logDate;
}
    return (
      matchesSearch &&
      matchesAction &&
      matchesDate
    );
  });
}, [
  auditLogs,
  searchTerm,
  actionFilter,
  dateFilter,
]);
  const getIcon = (module) => {
    if (module === "Users") {
      return <User size={17} />;
    }

    if (module === "Roles") {
      return <ShieldCheck size={17} />;
    }

    if (module === "Departments") {
      return <Building2 size={17} />;
    }

    return <ClipboardList size={17} />;
  };

  return (
    <div className="admin-audit-layout">
      <AdminSidebar />

      <div className="admin-audit-main">
        <AdminNavbar />

        <main className="admin-audit-content">
          <div className="admin-audit-header">
            <p>SYSTEM ACTIVITY</p>

            <h1>Audit Logs</h1>

            <span>
              Track administrative actions performed across
              the platform.
            </span>
          </div>

          <section className="admin-audit-card">
            <div className="admin-audit-toolbar">
  <div className="admin-audit-search">
    <Search size={17} />

    <input
      type="text"
      placeholder="Search audit logs..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />
  </div>

  <div className="admin-audit-filters">
    <select
      value={actionFilter}
      onChange={(e) =>
        setActionFilter(e.target.value)
      }
    >
      <option value="All">
        All Actions
      </option>

      <option value="Create">
        Create
      </option>

      <option value="Update">
        Update
      </option>

      <option value="Status">
        Status Change
      </option>

      <option value="Delete">
        Delete
      </option>
    </select>

    <input
      type="date"
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      className="admin-audit-date"
    />

    <button
      className="admin-audit-clear-filter"
      onClick={() => {
        setSearchTerm("");
        setActionFilter("All");
        setDateFilter("");
      }}
    >
      Reset Filters
    </button>

    
  </div>
</div>

            <div className="admin-audit-table-wrapper">
              <table className="admin-audit-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Performed By</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <div className="admin-audit-module">
                            <div className="admin-audit-icon">
                              {getIcon(log.module)}
                            </div>

                            <strong>
                              {log.module}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`admin-audit-action ${log.type.toLowerCase()}`}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td>
                          {log.details}
                        </td>

                        <td>
                          {log.performedBy}
                        </td>

                        <td>
                          {log.date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="admin-audit-empty"
                      >
                        No audit logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminAuditLogs;