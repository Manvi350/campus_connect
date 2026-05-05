import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ClassSchedule from "./ClassSchedule";
import Certificates from "./Certificates";
import ProfileUpdate from "./ProfileUpdate";
import Fees from "./Fees";
import Results from "./Results";
import Marks from "./Marks";
import Attendance from "./Attendance";
import Assignments from "./Assignments";
import StudyMaterial from "./StudyMaterial";
import SessionalMarks from "./SessionalMarks";
import AddTeacher from "./AddTeacher";
import ManageTeachers from "./ManageTeachers";
import AddStudent from "./AddStudent";
import ManageStudents from "./ManageStudent";
import ManageClasses from "./ManageClasses";
import Timetable from "./Timetable";
import Reports from "./Reports";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? (
          role === "student" ? <Navigate to="/dashboard" /> :
          role === "teacher" ? <Navigate to="/teacher-dashboard" /> :
          role === "admin" ? <Navigate to="/admin-dashboard" /> :
          <Navigate to="/login" />
        ) : <Navigate to="/login" />
      }/>

      <Route path="/login" element={<Login />} />

      <Route element={isLoggedIn && role === "student" ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/class-schedule" element={<ClassSchedule />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/results" element={<Results />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/assignments" element={<Assignments />} />
      </Route>

      <Route element={isLoggedIn && role === "teacher" ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/teacher-dashboard" element={<Dashboard />} />
        <Route path="/teacher/profile" element={<Profile />} />
        <Route path="/teacher/class-schedule" element={<ClassSchedule />} />
        <Route path="/teacher/attendance" element={<Attendance />} />
        <Route path="/teacher/assignments" element={<Assignments />} />
        <Route path="/teacher/sessional-marks" element={<SessionalMarks />} />
        <Route path="/teacher/study-material" element={<StudyMaterial />} />
        <Route path="/teacher/profile-update" element={<ProfileUpdate />} />
      </Route>

      <Route element={isLoggedIn && role === "admin" ? <Layout /> : <Navigate to="/login" />}>
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/classes" element={<ManageClasses />} />
        <Route path="/admin/timetable" element={<Timetable />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default App;
