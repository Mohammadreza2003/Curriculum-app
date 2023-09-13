import React, { useState, useEffect } from "react";
import "./TeachersListRport.css";
import { Link } from "react-router-dom";

function TeachersList() {
  const [teacherData, setTeacherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("teacherData");
    if (storedData) {
      setTeacherData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
  }, [teacherData]);

  

  const filteredTeachers = teacherData.filter((teacher) =>
    teacher.name.includes(searchQuery)
  );

  return (
    <div className="container">
      <h1>لیست اساتید</h1>
      <input
        type="text"
        placeholder="جستجو بر اساس نام استاد"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>نام و نام خانوادگی استاد</th>
            <th>نام درس</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.name}</td>
              <td>{teacher.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className={"Lik-bak-report"} to="/report">
        برگشت به صفحه گزارشات
      </Link>
    </div>
  );
}

export default TeachersList;

