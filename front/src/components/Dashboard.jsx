// Dashboard.jsx
import React, { useState, useEffect } from "react";
import NotesList from "./NotesList";
import "../css/Dashboard.css";
function Dashboard() {
  return (
    <div className="container">
      <NotesList />
    </div>
  );
}

export default Dashboard;
