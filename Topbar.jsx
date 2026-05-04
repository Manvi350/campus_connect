// import React from "react";
// import { motion } from "framer-motion";

// const Topbar = () => (
//   <motion.nav
//     className="navbar shadow-sm d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom"
//     style={{
//       width: "calc(100% - 250px)", // same as sidebar width
//       position: "fixed",
//       top: 0,
//       left: "250px",
//       zIndex: 100,
//     }}
//     initial={{ y: -60, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ duration: 0.5, ease: "easeOut" }}
//   >
//     <h5 className="m-0 fw-semibold text-dark">
//       Welcome back, <span className="text-primary">Ansh 👋</span>
//     </h5>

//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: "spring", stiffness: 200 }}
//       className="dropdown"
//     >
//       <button
//         className="btn btn-light border d-flex align-items-center px-3 py-2"
//         data-bs-toggle="dropdown"
//       >
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//           alt="profile"
//           width="32"
//           height="32"
//           className="me-2 rounded-circle"
//         />
//         <span className="fw-medium">Profile</span>
//       </button>

//       <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-sm">
//         <li>
//           <a className="dropdown-item" href="#">My Profile</a>
//         </li>
//         <li>
//           <a className="dropdown-item text-danger" href="#">Logout</a>
//         </li>
//       </ul>
//     </motion.div>
//   </motion.nav>
// );

// export default Topbar;
import React from "react";
import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherTopbar = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <motion.nav
      className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
      style={{
        width: "calc(100% - 250px)",
        position: "fixed",
        top: 0,
        left: "250px",
        zIndex: 100,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left */}
      <div>
        <h5 className="m-0 fw-semibold">
          Welcome back,{" "} <span className="text-primary">{user.name ? user.name : "Teacher"} 👋</span>
        </h5>
        <small className="text-muted">Have a productive day</small>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center gap-3">

        {/* Notification */}
        <div className="position-relative">
          <Bell size={20} className="text-dark" />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "10px" }}
          >
            3
          </span>
        </div>

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="dropdown"
        >
          <button
            className="btn d-flex align-items-center px-2 py-1"
            data-bs-toggle="dropdown"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              width="36"
              height="36"
              className="rounded-circle me-2"
            />
            <span className="fw-medium">{user.name || "Profile" }</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end mt-2 shadow">
            <li>
              {/* <a className="dropdown-item" href="/profile">
                My Profile
              </a> */}
              <button
                className="dropdown-item"
                onClick={() => navigate("/teacher/profile")}
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/teacher/profile-update")}
              >
                Edit Profile
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </motion.div>

      </div>
    </motion.nav>
  );
};

export default TeacherTopbar;