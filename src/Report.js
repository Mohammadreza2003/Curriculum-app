import React from 'react';
import { Link } from "react-router-dom";
import "./Report.css"

const Report = () => {
    return (
        <>
            <div className='container-report'>
                <h1 className='h1-report'>گزارشات</h1>
                <Link className={"Lik"} to="/teachersListRport">لسیت معلمین</Link>

                <Link className={"Lik"} to="/curriculumRport">برنامه درسی</Link>

                <Link className={"Lik"} to="/classesListRport">لیست کلاس ها</Link>
            </div>
            <Link className={"Lik-bak"} to="/home">برگشت به صفحه اصلی</Link>
        </>

    );
};

export default Report;