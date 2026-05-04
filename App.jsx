import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";

//  Import all pages
import Dashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import ClassSchedule from "./pages/student/ClassSchedule";
import Certificates from "./pages/student/Certificates";
import ProfileUpdate from "./pages/student/ProfileUpdate";
import Fees from "./pages/student/Fees";
import Results from "./pages/student/Results";
import Marks from "./pages/student/Marks";
import Attendance from "./pages/student/Attendance";
import Assignments from "./pages/student/Assignments";

//  Import all pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherProfile from "./pages/teacher/Profile";
import TeacherClassSchedule from "./pages/teacher/ClassSchedule";
import TeacherProfileUpdate from "./pages/teacher/ProfileUpdate";
import TeacherAttendance from "./pages/teacher/Attendance";
import Assignment from "./pages/teacher/Assignments";
import StudyMaterial from "./pages/teacher/StudyMaterial";
import SessionalMarks from "./pages/teacher/SessionalMarks";

//  Import all pages
import AdminDashboard from "./pages/admin/Dashboard";
import AddTeacher from "./pages/admin/AddTeacher";
import ManageTeachers from "./pages/admin/ManageTeachers";
import AddStudent from "./pages/admin/AddStudent";
import ManageStudents from "./pages/admin/ManageStudent";
import ManageClasses from "./pages/admin/ManageClasses";
import Timetable from "./pages/admin/Timetable";
import Reports from "./pages/admin/Reports";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<Dashboard />} />
    //     <Route path="profile" element={<Profile />} />
    //     <Route path="class-schedule" element={<ClassSchedule />} />
    //     <Route path="assignments" element={<Assignments />} />
    //     <Route path="certificates" element={<Certificates />} />
    //     <Route path="profile-update" element={<ProfileUpdate />} />
    //     <Route path="fees" element={<Fees />} />
    //     <Route path="results" element={<Results />} />
    //     <Route path="marks" element={<Marks />} />
    //     <Route path="attendance" element={<Attendance />} />
    //   </Route>
    // </Routes>

    <Routes>
      
      {/* <Route
        path="/"
        element={
          isLoggedIn
            ? role === "teacher"
              ? <Navigate to="/teacher-dashboard" replace />
              : <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      /> */}

      <Route
        path="/"
        element={
          isLoggedIn ? (
            role === "student" ? <Navigate to="/dashboard" /> :
            role === "teacher" ? <Navigate to="/teacher-dashboard" /> :
            role === "admin" ? <Navigate to="/admin-dashboard" /> :
            <Navigate to="/login" />
          ) : <Navigate to="/login" />
        }
      />

      <Route path="/login" element={<Login />} />

      {/* STUDENT ROUTES */}
      <Route
        element={
          isLoggedIn && role === "student"
            ? <Layout />
            : <Navigate to="/login" replace />
        }
      >
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
      
      {/* TEACHER ROUTE */}
      <Route
        
        element={
          isLoggedIn && role === "teacher"
            ? <Layout/>
            : <Navigate to="/login" replace />
        }
      >
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/class-schedule" element={<TeacherClassSchedule />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/assignments" element={<Assignment />} />
        <Route path="/teacher/sessional-marks" element={<SessionalMarks />} />
        <Route path="/teacher/study-material" element={<StudyMaterial />} />
        <Route path="/teacher/profile-update" element={<TeacherProfileUpdate />} />
      </Route>

        {/*Admin route*/}
      <Route
        element={
          isLoggedIn && role === "admin"
            ? <Layout />
            : <Navigate to="/login" />
        }
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
