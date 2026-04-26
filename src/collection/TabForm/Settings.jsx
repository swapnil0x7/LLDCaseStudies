import React from "react";

const Settings = ({ data, onChange }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h3>Settings</h3>

      <label>
        <input
          type="checkbox"
          checked={data.notifications}
          onChange={(e) => onChange("notifications", e.target.checked)}
        />
        Enable Notifications
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.darkMode}
          onChange={(e) => onChange("darkMode", e.target.checked)}
        />
        Dark Mode
      </label>
    </div>
  );
};

export default Settings;
