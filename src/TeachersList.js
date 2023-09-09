import React, { useState, useEffect } from "react";
import "./TeachersList.css";

function TeachersList({ onAddTeacher }) {
  const [teacherData, setTeacherData] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [course, setCourse] = useState("");
  const [editMode, setEditMode] = useState(Array(teacherData.length).fill(false));


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

  const handleToggleEditMode = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };
  const handleEditInputChange = (index, fieldName, value) => {
    const updatedTeacherData = [...teacherData];
    updatedTeacherData[index][fieldName] = value;
    setTeacherData(updatedTeacherData);
  };
  const handleSaveChanges = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = false;
    setEditMode(updatedEditMode);
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
            <th>نام درس</th>
          </tr>
        </thead>
        <tbody>
        {teacherData.map((teacher, index) => (
  <tr key={index}>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={teacher.name}
          onChange={(e) => handleEditInputChange(index, "name", e.target.value)}
        />
      ) : (
        teacher.name
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={teacher.course}
          onChange={(e) => handleEditInputChange(index, "course", e.target.value)}
        />
      ) : (
        teacher.course
      )}
    </td>
    <td>
      <button
        className="delete-button"
        onClick={() => handleDeleteTeacher(index)}
      >
        حذف
      </button>
      <button
        className="edit-button"
        onClick={() => handleToggleEditMode(index)}
      >
        {editMode[index] ? "ذخیره" : "ویرایش"}
      </button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default TeachersList;
