import React from 'react';
import { Link } from "react-router-dom";
import "./Report.css"

const Report = () => {
    return (
        <div className='container-report'>
            <h1>گزارشات</h1>
            <Link className={"Lik"} to="/teachersList">لسیت معلمین</Link>
            
            <Link className={"Lik"} to="/curriculum">برنامه درسی</Link>
           
            <Link className={"Lik"} to="/classesList">لیست کلاس ها</Link>
        </div>
    );
};

export default Report;