import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import login_bg from "../assets/login-bg.jpg.jpeg"; // 🔥 change image

function Login() {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      const url =
        role === "teacher"
          ? "http://127.0.0.1:8080/teacher/auth/login"
          : role === "admin"
          ? "http://127.0.0.1:8080/admin/auth/login"
          : "http://127.0.0.1:8080/auth/login";

      const body =
        role === "teacher"
          ? { email: identifier, password }
          : role === "admin"
          ? { username: identifier, password }
          : { college_id: identifier, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", role);

      window.location.href =
        role === "teacher"
          ? "/teacher-dashboard"
          : role === "admin"
          ? "/admin-dashboard"
          : "/dashboard";

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, rgba(10,10,40,0.9), rgba(0,0,0,0.8)), url(${login_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        // className="p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          margin:"auto",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          color: "#fff",
          padding: "25px"
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>

        {/* Role Toggle */}
        <div className="d-flex mb-4 bg-dark rounded-pill p-1">
          {["student", "teacher", "admin"].map((r) => (
            <button
              key={r}
              className={`flex-fill btn rounded-pill ${
                role === r ? "btn-warning text-dark fw-bold" : "text-light"
              }`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder={
                role === "teacher"
                  ? "Enter Email"
                  : role === "admin"
                  ? "Enter Username"
                  : "Enter Campus ID"
              }
              className="form-control bg-transparent text-light border-light rounded-pill px-3"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{ height: "45px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control bg-transparent text-light border-light rounded-pill px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: "45px" }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-warning w-100 rounded-pill fw-bold"
            style={{ height: "45px" }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3 text-light" style={{ fontSize: "14px" }}>
          Forgot password?
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import login_bg from "../assets/login-bg.jpg.jpeg";

// function Login() {
//   const [role, setRole] = useState("student");
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!identifier || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const url =
//         role === "teacher"
//           ? "http://127.0.0.1:8080/teacher/auth/login"
//           : role === "admin"
//           ? "http://127.0.0.1:8080/admin/auth/login"
//           : "http://127.0.0.1:8080/auth/login";

//       const body =
//         role === "teacher"
//           ? { email: identifier, password }
//           : role === "admin"
//           ? { username: identifier, password }
//           : { college_id: identifier, password };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.detail || "Login failed");
//         setLoading(false);
//         return;
//       }

//       if (remember) {
//         localStorage.setItem("token", data.access_token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//       } else {
//         sessionStorage.setItem("token", data.access_token);
//         sessionStorage.setItem("user", JSON.stringify(data.user));
//       }

//       localStorage.setItem("role", role);

//       window.location.href =
//         role === "teacher"
//           ? "/teacher-dashboard"
//           : role === "admin"
//           ? "/admin-dashboard"
//           : "/dashboard";

//     } catch (err) {
//       setError("Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         background: darkMode
//           ? `linear-gradient(rgba(0,0,0,0.8), rgba(10,10,40,0.9)), url(${login_bg})`
//           : "#f5f7fa",
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         width:"100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         transition: "0.3s",
//       }}
//     >
//       {/* 🌙 Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           border: "none",
//           background: "transparent",
//           fontSize: "20px",
//           color: darkMode ? "#fff" : "#000",
//         }}
//       >
//         {darkMode ? "☀️" : "🌙"}
//       </button>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         style={{
//           width: "100%",
//           maxWidth: "420px",
//           margin:"auto",
//           padding: "25px",
//           borderRadius: "20px",
//           backdropFilter: "blur(15px)",
//           background: darkMode
//             ? "rgba(255,255,255,0.08)"
//             : "#fff",
//           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
//           color: darkMode ? "#fff" : "#000",
//         }}
//       >
//         <h2 className="text-center mb-4">Welcome Back 👋</h2>

//         {/* Role */}
//         <div className="d-flex mb-4">
//           {["student", "teacher", "admin"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRole(r)}
//               className={`btn flex-fill mx-1 ${
//                 role === r ? "btn-warning" : "btn-outline-secondary"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Floating Input */}
//           <div className="form-floating mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="id"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//             />
//             <label>
//               {role === "teacher"
//                 ? "Email"
//                 : role === "admin"
//                 ? "Username"
//                 : "Campus ID"}
//             </label>
//           </div>

//           {/* Password */}
//           <div className="form-floating mb-3 position-relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               className="form-control"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <label>Password</label>

//             {/* 👁️ icon */}
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: "absolute",
//                 right: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//               }}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>

//           {/* Remember Me */}
//           <div className="form-check mb-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               checked={remember}
//               onChange={() => setRemember(!remember)}
//             />
//             <label className="form-check-label">
//               Remember Me
//             </label>
//           </div>

//           {/* Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="btn btn-warning w-100"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="spinner-border spinner-border-sm"></span>
//             ) : (
//               "Login"
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;