import React from "react";
import Curriculum from "./Curriculum";
import TeachersList from "./TeachersList";
import ClassesList from "./ClassesList";
import "./App.css";
const App = () => {
  return (
    <>
      <TeachersList />
      <Curriculum />
      <ClassesList />
    </>
  );
};

export default App;
