import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ClassesList.css";
const ClassesList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState("");
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    const storedTeachers = localStorage.getItem("teachers");
    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  const handleAddTeacher = () => {
    const teacher = {
      id: uuidv4(),
      name: newTeacher,
      course: newCourse,
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher("");
    setNewCourse("");
  };

  const handleDeleteTeacher = (id) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    setTeachers(updatedTeachers);
  };

  return (
    <div className="container">
      <h1>لیست کلاس ها</h1>
      <div className="input-group">
        <input
          type="text"
          value={newTeacher}
          placeholder=" کلاس"
          onChange={(e) => setNewTeacher(e.target.value)}
        />
        <input
          type="text"
          value={newCourse}
          placeholder=" درس"
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <button className="button" onClick={handleAddTeacher}>
        افزودن کلاس
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th> کلاس</th>
            <th> درس</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.course}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTeacher(teacher.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesList;
