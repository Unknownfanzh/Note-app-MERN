import React, { useState } from "react";

export default function Note({ note, handleDeleteNote, handleEditNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const characterLimit = 200;

  const handleEditDescriptionChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setEditDescription(event.target.value);
    }
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const onUpdate = () => {
    handleEditNote(note._id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="note new">
          <input className="note-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            rows="8"
            cols="10"
            value={editDescription}
            onChange={handleEditDescriptionChange}
            placeholder="Description"
          ></textarea>
          <div className="note-footer">
            <small>{characterLimit - editDescription.length} Remaining</small>
            <button onClick={onUpdate}>Update Note</button>
          </div>
        </div>
      ) : (
        <div className="note">
          <span>
            <p className="note-title"><strong>{note.title}</strong></p>
            <p className="note-description">{note.description}</p>
          </span>
          <div className="note-footer">
            <small>{formatDate(note.date)}</small>
            <div>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
              <button onClick={onEdit}>Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
