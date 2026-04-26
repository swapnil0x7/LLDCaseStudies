import React from "react";

const Interest = ({ data, onChange, errors }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h3>Interest</h3>

      <label>
        Hobbies
        <input
          type="text"
          value={data.hobbies}
          onChange={(e) => onChange("hobbies", e.target.value)}
        />
        {errors.hobbies && <span style={{ color: "red" }}>{errors.hobbies}</span>}
      </label>

      <label>
        Favourite Book
        <input
          type="text"
          value={data.favoriteBook}
          onChange={(e) => onChange("favoriteBook", e.target.value)}
        />
        {errors.favoriteBook && <span style={{ color: "red" }}>{errors.favoriteBook}</span>}
      </label>
    </div>
  );
};

export default Interest;
