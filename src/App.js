import React, { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Report from "./Report";
import Home from "./Home";
import TeachersList from "./TeachersList";
import Curriculum from "./Curriculum";
import ClassesList from "./ClassesList";
import "./App.css";

function App() {
  const [teacherNames, setTeacherNames] = useState([]);

  const handleAddTeacherName = (name) => {
    setTeacherNames([...teacherNames, name]);
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/report" element={<Report />} />
          <Route path="/home" element={<Home />} />
          <Route path="/teachersList" element={<TeachersList onAddTeacher={handleAddTeacherName} />} />
          <Route path="/curriculum" element={<Curriculum teacherNames={teacherNames} />} />
          <Route path="/classesList" element={<ClassesList />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
