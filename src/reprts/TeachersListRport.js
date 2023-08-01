import React, { useState, useEffect } from "react";
import "./TeachersListRport.css";
import { Link } from "react-router-dom";
function TeachersList({ onAddTeacher }) {
  const [teacherData, setTeacherData] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [course, setCourse] = useState("");
  const [classNumber, setClassNumber] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("teacherData");
    if (storedData) {
      setTeacherData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
  }, [teacherData]);

  const handleAddTeacher = () => {
    if (teacherName && course) {
      const newTeacher = {
        name: teacherName,
        number:classNumber,
        course: course,
      };
      setTeacherData([...teacherData, newTeacher]);
      setTeacherName("");
      setCourse("");
      onAddTeacher(teacherName);
    }
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeacherData = [...teacherData];
    updatedTeacherData.splice(index, 1);
    setTeacherData(updatedTeacherData);
  };

  return (
    <div className="container">
      <h1>لیست اساتید</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="نام و نام خانوادگی استاد"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
            type="text"
            name="classNumber"
            placeholder=" شماره کلاس "
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
            required
          />
        <input
          type="text"
          placeholder="نام درس"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button className="button" onClick={handleAddTeacher}>
          افزودن استاد
        </button>
      </div>
      <table>
      <thead>
        <tr>
          <th>نام و نام خانوادگی استاد</th>
          <th> شماره کلاس</th>
          <th>نام درس</th>
        </tr>
      </thead>
      <tbody>
        {teacherData.map((teacher, index) => (
          <tr key={index}>
            <td>{teacher.name}</td>
            <td>{teacher.number}</td>
            <td>{teacher.course}</td>
            <td>
              <button
                className="delete-button"
                onClick={() => handleDeleteTeacher(index)}
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
}

export default TeachersList;
