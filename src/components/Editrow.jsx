import React from "react";

export default function Editrow({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <div>
      <input
        type="text"
        name="name"
        required="required"
        value={editFormData.name}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="type"
        required="required"
        value={editFormData.type}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="company"
        required="required"
        value={editFormData.company}
        onChange={handleEditFormChange}
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
}
