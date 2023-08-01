import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./ClassesListRport.css";

const ClassesList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newClassType, setNewClassType] = useState("");
  const [newClassNumber, setNewClassNumber] = useState("");

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
      classType: newClassType,
      classNumber: newClassNumber,
    };

    setTeachers([...teachers, teacher]);
    setNewCourse("");
    setNewClassType("");
    setNewClassNumber("");
  };

  const handleDeleteTeacher = (id) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    setTeachers(updatedTeachers);
  };

  return (
    <div className="container">
      <h1>لیست کلاس ها</h1>
      <div className="input-group">
        <select
        className="select"
          type="text"
          value={newClassType}
          onChange={(e) => setNewClassType(e.target.value)}
        >
          <option value="">نوع کلاس</option>
              <option>  کلاس</option>
              <option>سایت</option>
              <option>کارگاه</option>
        </select>
        <input
          type="text"
          value={newClassNumber}
          placeholder="شماره کلاس"
          onChange={(e) => setNewClassNumber(e.target.value)}
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
            <th>نوع</th>
            <th> شماره کلاس</th>
            <th> درس</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.classType}</td>
              <td>{teacher.classNumber}</td>
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
      <Link className={"Lik-bak-report"} to="/report"> برگشت به صفحه گزارشات </Link>
    </div>
  );
};

export default ClassesList;

