import React, { useState } from "react";
import TeachersList from "./TeachersList";
import Curriculum from "./Curriculum";
import { Link } from "react-router-dom";
const Home = () => {
    const [teacherNames, setTeacherNames] = useState([]);

    const handleAddTeacherName = (name) => {
        setTeacherNames([...teacherNames, name]);
    };

    return (
        <div>
            <Link className={"Lik"} to="/report">دریافت گزارش</Link>
            <TeachersList onAddTeacher={handleAddTeacherName} />
            <Curriculum teacherNames={teacherNames} />
        </div>
    );
};

export default Home;