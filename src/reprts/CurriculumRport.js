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
  const [searchDay, setSearchDay] = useState(""); // Add state for search

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isClassTimeSlotAvailable = (classNumber, day, time) => {
    return classes.some(
      (classItem) =>
        classItem.classNumber === classNumber &&
        classItem.day === day &&
        classItem.time === time
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { classNumber, day, time } = formData;

    if (isClassTimeSlotAvailable(classNumber, day, time)) {
      setError("این کلاس در حال حاضر یک درس برنامه ریزی شده دارد.");
      return alert(error);
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

  // Function to filter classes by selected day
  const filteredClasses = classes.filter((classItem) =>
    searchDay ? classItem.day === searchDay : true
  );

  return (
    <div className="container">
      <h2 className="title">برنامه درسی</h2>

      {/* Add a search input for selecting the day */}
      <div className="search-bar">
        <label htmlFor="searchDay">جستجو بر اساس روز:</label>
        <input
          type="text"
          id="searchDay"
          name="searchDay"
          value={searchDay}
          onChange={(e) => setSearchDay(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>نوع</th>
            <th>شماره کلاس</th>
            <th>درس</th>
            <th>نام و نام خانوادگی استاد</th>
            <th>روز</th>
            <th>ساعت</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.classType}</td>
              <td>{classItem.classNumber}</td>
              <td>{classItem.lessonName}</td>
              <td>{classItem.teacherName}</td>
              <td>{classItem.day}</td>
              <td>{classItem.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className={"Lik-bak-report"} to="/report">
        برگشت به صفحه گزارشات
      </Link>
    </div>
  );
};

export default Curriculum;
