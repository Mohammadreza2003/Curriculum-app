import React from "react";
import Curriculum from "./Curriculum";
import PresenceAbsence from "./PresenceAbsence";
import TeachersList from "./TeachersList";
import ClassesList from "./ClassesList";
import "./App.css"
const App = () => {
  return (
    <>
      <Curriculum />
      <PresenceAbsence />
      <TeachersList />
      <ClassesList />
    </>
  );
};

export default App;
