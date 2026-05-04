import React from "react";
import StudentSidebar from "./components/student/Sidebar";
import StudentTopbar from "./components/student/Topbar";

import TeacherSidebar from "./components/teacher/Sidebar";
import TeacherTopbar from "./components/teacher/Topbar";

import AdminSidebar from "./components/admin/Sidebar";
import AdminTopbar from "./components/admin/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // return (
  //   <div className="d-flex" style={{ minHeight: "100vh" }}>
  //     <Sidebar />
  //     <div className="flex-grow-1">
  //       <Topbar />
  //       <div className="p-4" style={{ marginTop: "80px" }}>
  //         <Outlet /> {/* Page content changes here */}
  //       </div>
  //     </div>
  //   </div>
  // );

  const role = localStorage.getItem("role");
  let Sidebar,Topbar;

  if (role === "teacher") {
    Sidebar = TeacherSidebar;
    Topbar = TeacherTopbar;
  } else if (role === "admin") {
    Sidebar = AdminSidebar;
    Topbar = AdminTopbar;
  } else {
    // default = student
    Sidebar = StudentSidebar;
    Topbar = StudentTopbar;
  }


  // const Sidebar = role === "teacher" ? TeacherSidebar : StudentSidebar;
  // const Topbar = role === "teacher" ? TeacherTopbar : StudentTopbar;

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      <div className="flex-grow-1">
        <Topbar />

        <div className="p-4" style={{ marginTop: "80px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

