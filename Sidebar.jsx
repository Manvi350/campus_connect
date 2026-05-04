// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => (
//   <div className="bg-dark text-white p-3 shadow-lg" style={{ width: "250px" }}>
//     <h4 className="text-warning text-center mb-4">👨‍🏫 Teacher</h4>
//     <ul className="nav flex-column">
//       <li className="nav-item"><Link className="nav-link text-white" to="/">Dashboard</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/profile">Profile</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/class-schedule">Class Schedule</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/attendence">Attendence</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/assignments">Assignments</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/sessionalMarks">Sessional Marks</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/studyMaterial">Study Material</Link></li>
//       <li className="nav-item"><Link className="nav-link text-white" to="/profile-update">Profile Update</Link></li>
//     </ul>
//   </div>
// );

// export default Sidebar;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Calendar,
  ClipboardList,
  BookOpen,
  FileText,
  BarChart3,
  Edit,
} from "lucide-react";

const TeacherSidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/teacher-dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Profile", path: "/teacher/profile", icon: <User size={18} /> },
    { name: "Class Schedule", path: "/teacher/class-schedule", icon: <Calendar size={18} /> },
    { name: "Attendance", path: "/teacher/attendance", icon: <ClipboardList size={18} /> },
    { name: "Assignments", path: "/teacher/assignments", icon: <FileText size={18} /> },
    { name: "Sessional Marks", path: "/teacher/sessional-marks", icon: <BarChart3 size={18} /> },
    { name: "Study Material", path: "/teacher/study-material", icon: <BookOpen size={18} /> },
    { name: "Profile Update", path: "/teacher/profile-update", icon: <Edit size={18} /> },
  ];

  return (
    <div
      className="bg-dark text-white p-3 shadow-lg d-flex flex-column"
      style={{
        width: "250px",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <h4 className="text-warning text-center mb-4">👨‍🏫 Teacher</h4>

      {/* Menu */}
      <ul className="nav flex-column gap-1">
        {menu.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                  isActive
                    ? "bg-warning text-dark fw-semibold"
                    : "text-white"
                }`
              }
              style={{ transition: "0.3s" }}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bottom */}
      <div className="mt-auto text-center text-muted small">
        © 2026 Teacher Panel
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .nav a:hover {
            background-color: #343a40;
            transform: translateX(4px);
          }
        `}
      </style>
    </div>
  );
};

export default TeacherSidebar;