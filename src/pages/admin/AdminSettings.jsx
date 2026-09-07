import { useState } from "react";
import {
  Settings,
  Building2,
  Mail,
  Globe,
  Save,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./AdminSettings.css";

function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    const savedSettings =
      localStorage.getItem("adminSettings");

    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          organizationName: "TalentAI",
          supportEmail: "support@talentai.com",
          website: "https://talentai.com",
          allowRegistrations: true,
          emailNotifications: true,
          maintenanceMode: false,
        };
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    setMessage("Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="admin-settings-layout">
      <AdminSidebar />

      <div className="admin-settings-main">
        <AdminNavbar />

        <main className="admin-settings-content">

          <div className="admin-settings-header">
            <p>SYSTEM CONFIGURATION</p>

            <h1>Settings</h1>

            <span>
              Manage organization and platform settings.
            </span>
          </div>

          {message && (
            <div className="admin-settings-success">
              {message}
            </div>
          )}

          <form onSubmit={handleSave}>

            <section className="admin-settings-card">

              <div className="admin-settings-card-header">
                <Building2 size={21} />

                <div>
                  <h2>
                    Organization Settings
                  </h2>

                  <p>
                    Basic organization information.
                  </p>
                </div>
              </div>

              <div className="admin-settings-form">

                <div className="admin-settings-group">
                  <label>
                    Organization Name
                  </label>

                  <input
                    type="text"
                    name="organizationName"
                    value={
                      settings.organizationName
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-settings-group">
                  <label>
                    <Mail size={16} />
                    Support Email
                  </label>

                  <input
                    type="email"
                    name="supportEmail"
                    value={
                      settings.supportEmail
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-settings-group">
                  <label>
                    <Globe size={16} />
                    Website
                  </label>

                  <input
                    type="text"
                    name="website"
                    value={settings.website}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </section>

            <section className="admin-settings-card">

              <div className="admin-settings-card-header">
                <Settings size={21} />

                <div>
                  <h2>
                    System Preferences
                  </h2>

                  <p>
                    Configure platform behavior.
                  </p>
                </div>
              </div>

              <div className="admin-settings-toggle-list">

                <label className="admin-settings-toggle-item">

                  <div>
                    <strong>
                      Allow User Registrations
                    </strong>

                    <span>
                      Allow new users to create accounts.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="allowRegistrations"
                    checked={
                      settings.allowRegistrations
                    }
                    onChange={handleChange}
                  />

                </label>

                <label className="admin-settings-toggle-item">

                  <div>
                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Enable platform email notifications.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={
                      settings.emailNotifications
                    }
                    onChange={handleChange}
                  />

                </label>

                <label className="admin-settings-toggle-item">

                  <div>
                    <strong>
                      Maintenance Mode
                    </strong>

                    <span>
                      Temporarily restrict platform access.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={
                      settings.maintenanceMode
                    }
                    onChange={handleChange}
                  />

                </label>

              </div>

            </section>

            <div className="admin-settings-actions">

              <button type="submit">
                <Save size={17} />
                Save Settings
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default AdminSettings;