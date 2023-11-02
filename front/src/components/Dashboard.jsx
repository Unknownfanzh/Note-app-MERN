// Dashboard.jsx
import React, { useState, useEffect } from "react";
import NotesList from "./NotesList";
function Dashboard() {
  return (
      <div className="container">
        <NotesList />
      </div>
  );
}

export default Dashboard;
