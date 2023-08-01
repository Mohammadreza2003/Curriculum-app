import React, { useState, useEffect } from "react";
import "./CurriculumRport.css";
import { Link } from "react-router-dom";
const Curriculum = ({ teacherNames }) => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    classType: "",
    classNumber: "",
    lessonName: "",
    teacherName: "",
    day: "",
    time: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isClassTimeSlotAvailable = (classNumber, day, time) => {
    return classes.some(
      (classItem) =>
        classItem.classNumber === classNumber && classItem.day === day && classItem.time === time
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { classNumber, day, time } = formData;

    if (isClassTimeSlotAvailable(classNumber, day, time)) {
      setError("این کلاس در حال حاضر یک درس برنامه ریزی شده دارد.");
      return alert(error)
    } else {
      setError("");

      const newClass = { ...formData };
      setClasses([...classes, newClass]);
      setFormData({
        classType: "",
        classNumber: "",
        lessonName: "",
        teacherName: "",
        day: "",
        time: "",
      });
    }
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeacherData = [...classes];
    updatedTeacherData.splice(index, 1);
    setClasses(updatedTeacherData);
  };

  useEffect(() => {
    const storedClasses = localStorage.getItem("classes");
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
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
          <select
            className="select"
            type="text"
            name="classType"
            value={formData.classType}
            onChange={handleChange}
            required
          >
            <option >نوع کلاس</option>
            <option>  کلاس</option>
            <option>سایت</option>
            <option>کارگاه</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          <input
            className="currinp"
            type="text"
            name="classNumber"
            placeholder=" شماره کلاس "
            value={formData.classNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
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
          <select
            className="select"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            required
          >
            <option value="">انتخاب استاد</option>
            {teacherNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
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
        <button className="submit-button" type="submit">
          افزودن برنامه
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>نوع</th>
            <th>شماره کلاس </th>
            <th> درس</th>
            <th>نام و نام خانوادگی استاد</th>
            <th>روز</th>
            <th>ساعت</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.classType}</td>
              <td>{classItem.classNumber}</td>
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
      <Link className={"Lik-bak-report"} to="/report"> برگشت به صفحه گزارشات </Link>
    </div>
  );
};

export default Curriculum;