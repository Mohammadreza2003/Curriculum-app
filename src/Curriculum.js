import React, { useState, useEffect } from "react";
import "./Curriculum.css";
const Curriculum = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    className: "",
    lessonName: "",
    teacherName: "",
    day: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClass = { ...formData };
    setClasses([...classes, newClass]);
    setFormData({
      className: "",
      lessonName: "",
      teacherName: "",
      day: "",
      time: "",
    });
  };
  const handleDeleteTeacher = (index) => {
    const updatedTeacherData = [...classes];
    updatedTeacherData.splice(index, 1);
    setClasses(updatedTeacherData);
  };

  useEffect(() => {
    const storedClasess = localStorage.getItem("classes");
    if (storedClasess) {
      setClasses(JSON.parse(storedClasess));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  return (
     <div className="container">
      <h2 className="title">برنامه درسی</h2>

      <form className="curriform" onSubmit={handleSubmit}>
        <label className="form-label">
          <input
            className="currinp"
            type="text"
            name="className"
            placeholder=" کلاس"
            value={formData.className}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label  className="form-label">
          <input
          className="currinp"
            type="text"
            name="lessonName"
            placeholder=" درس"
            value={formData.lessonName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          <input
          className="currinp"
            type="text"
            name="teacherName"
            placeholder="نام و نام خانوادگی استاد"
            value={formData.teacherName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          <input 
          className="currinp"
            type="text"
            name="day"
            placeholder="روز"
            value={formData.day}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          <input
          className="currinp"
            type="text"
            name="time"
            placeholder="ساعت"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button className="submit-button" type="submit">افزودن برنامه</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th> کلاس</th>
            <th> درس</th>
            <th>نام و نام خانوادگی استاد</th>
            <th>روز</th>
            <th>ساعت</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.className}</td>
              <td>{classItem.lessonName}</td>
              <td>{classItem.teacherName}</td>
              <td>{classItem.day}</td>
              <td>{classItem.time}</td>
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
    </div>
  );
};

export default Curriculum;