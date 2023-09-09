import React, { useState, useEffect } from "react";
import "./Curriculum.css";

const Curriculum = () => {
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
  const [editMode, setEditMode] = useState(Array(classes.length).fill(false));


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isClassTimeSlotAvailable = (classNumber, day, time,teacherName,) => {
    return classes.some(
      (classItem) =>
        classItem.classNumber === classNumber && classItem.day === day && classItem.time === time && classItem.teacherName === teacherName 
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { classNumber, day, time ,teacherName} = formData;

    const [startHour, endHour] = time.split('-');
    const startHourInt = parseInt(startHour);
    const endHourInt = parseInt(endHour);
  
    if (
      !/^\d{1,2}-\d{1,2}$/.test(time) ||
      startHourInt < 1 || startHourInt > 24 ||
      endHourInt < 1 || endHourInt > 24 ||
      startHourInt > endHourInt
    ) {
      setError("فرمت بازه‌ی زمانی نامعتبر است. مثال معتبر: 8-10 یا 13-14");
      return;
    }

    if (isClassTimeSlotAvailable(classNumber, day, time,teacherName)) {
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


  const handleToggleEditMode = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };

  const handleEditInputChange = (index, fieldName, value) => {
    const updatedClasses = [...classes];
    updatedClasses[index][fieldName] = value;
    setClasses(updatedClasses);
  };

  const handleSaveChanges = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = false;
    setEditMode(updatedEditMode);
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
            <option>آتلیه</option>
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
          <select
            className="select"
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          >
            <option >روز</option>
            <option>شنبه  </option>
            <option>یکشنبه</option>
            <option>دوشنبه</option>
            <option>سه شنبه</option>
            <option>چهارشنبه</option>
            <option>پنجشنبه</option>
            <option>جمعه</option>
          </select>
        </label>
        <br />

        <label className="form-label">
          <input
            className="currinp"
            type="text"
            name="time"
            placeholder="مثال: 12-13"
            value={formData.time}
            onChange={handleChange}
            pattern="\d{1,2}-\d{1,2}"
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
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.classType}
          onChange={(e) => handleEditInputChange(index, "classType", e.target.value)}
        />
      ) : (
        classItem.classType
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.classNumber}
          onChange={(e) => handleEditInputChange(index, "classNumber", e.target.value)}
        />
      ) : (
        classItem.classNumber
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.lessonName}
          onChange={(e) => handleEditInputChange(index, "lessonName", e.target.value)}
        />
      ) : (
        classItem.lessonName
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.teacherName}
          onChange={(e) => handleEditInputChange(index, "teacherName", e.target.value)}
        />
      ) : (
        classItem.teacherName
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.day}
          onChange={(e) => handleEditInputChange(index, "day", e.target.value)}
        />
      ) : (
        classItem.day
      )}
    </td>
    <td>
      {editMode[index] ? (
        <input
          type="text"
          value={classItem.time}
          onChange={(e) => handleEditInputChange(index, "time", e.target.value)}
        />
      ) : (
        classItem.time
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
};

export default Curriculum;