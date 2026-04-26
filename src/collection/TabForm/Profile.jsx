import React from "react";

const Profile = ({ data, onChange, errors }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h3>Profile</h3>

      <label>
        Name
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </label>

      <label>
        Phone
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
        {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
      </label>
    </div>
  );
};

export default Profile;
