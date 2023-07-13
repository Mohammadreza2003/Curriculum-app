import "./PresenceAbsence.css";
import React, { useState, useEffect } from "react";

const PresenceAbsence = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    className: "",
    courseName: "",
    teacherName: "",
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Load data from local storage on initial render
    const storedStudents = localStorage.getItem("students");
    const storedAttendance = localStorage.getItem("attendanceRecords");

    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }

    if (storedAttendance) {
      setAttendanceRecords(JSON.parse(storedAttendance));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever students or attendanceRecords change
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendanceRecords)
    );
  }, [students, attendanceRecords]);

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    const updatedStudent = {
      ...newStudent,
      isTickVisible: true,
      isCrossVisible: true,
    };

    setStudents([...students, updatedStudent]);
    setNewStudent({
      name: "",
      surname: "",
      className: "",
      courseName: "",
      teacherName: "",
    });
  };

  const handleMarkAttendance = (index, status) => {
    const newAttendanceRecords = [...attendanceRecords];
    newAttendanceRecords[index] = status;
    setAttendanceRecords(newAttendanceRecords);

    const newStudents = [...students];
    const student = newStudents[index];

    if (status === "Present") {
      student.isCrossVisible = false;
      student.isTickVisible = true;
    } else {
      student.isCrossVisible = true;
      student.isTickVisible = false;
    }

    setStudents(newStudents);
  };

  const handleDeleteTeacher = (index) => {
    const updatedAttendanceRecords = [...students];
    updatedAttendanceRecords.splice(index, 1);
    setStudents(updatedAttendanceRecords);
  };

  return (
    <div className="container">
      <h1>لیست حضور غیاب</h1>

      <div className="input-group">
        <input
          type="text"
          name="name"
          placeholder="نام و نام خانوادگی دانشجو"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="className"
          placeholder=" کلاس"
          value={newStudent.className}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="courseName"
          placeholder=" درس"
          value={newStudent.courseName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="teacherName"
          placeholder="نام و نام خانوادگی استاد"
          value={newStudent.teacherName}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleAddStudent}>
          افزودن دانشجو
        </button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>نام و نام خانوادگی دانشجو</th>
              <th> کلاس</th>
              <th> درس</th>
              <th>نام و نام خانوادگی استاد</th>
              <th>حاضر یا غایب ؟؟؟</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.courseName}</td>
                <td>{student.teacherName}</td>
                <td className="attendance-buttons">
                  {student.isTickVisible && (
                    <button
                      onClick={() => handleMarkAttendance(index, "Present")}
                    >
                      ✅
                    </button>
                  )}
                  {student.isCrossVisible && (
                    <button
                      onClick={() => handleMarkAttendance(index, "Absent")}
                    >
                      ❌
                    </button>
                  )}
                </td>
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
    </div>
  );
};

export default PresenceAbsence;
