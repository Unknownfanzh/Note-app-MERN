// Dashboard.jsx
import React, { useState, useEffect } from "react";
import AddNote from "./AddNote";
import Note from "./Note";
function NotesList() {
  const [notes, setNotes] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  // Fetch notes when the component mounts
  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (title, description) => { // Accept title and description as parameters
    try {
      const response = await fetch("/api/add-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, description, date: new Date() }),
      });

      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditNote = async (id, title, description) => {
    if (id) {
      try {
        await fetch(`/api/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, description }),
        });
        setNotes(
          notes.map((note) =>
            note._id === id
              ? { ...note, title, description }
              : note
          )
        );
      } catch (error) {
        console.error("Error editing note:", error);
      }
    }
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      ))}

      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
}

export default NotesList;
