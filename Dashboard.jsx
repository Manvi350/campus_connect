// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
// import { BookOpen, ClipboardList, CalendarDays, Bell } from "lucide-react";

// const Dashboard = () => {
//   const cardVariants = {
//     hidden: { opacity: 0, y: 25 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
//     }),
//   };

//   return (
//     <div className="container-fluid py-4 mt-5 pt-5">
//       {/* Title */}
//       <h3 className="fw-semibold mb-4 text-dark">
//         📋 Dashboard Overview
//       </h3>

//       {/* Info Cards */}
//       <Row className="g-4">
//         {[
//           {
//             title: "Today's Classes",
//             text: "3 lectures scheduled for today.",
//             icon: <BookOpen size={26} className="text-primary" />,
//           },
//           {
//             title: "Pending Assignments",
//             text: "2 assignments due this week.",
//             icon: <ClipboardList size={26} className="text-success" />,
//           },
//           {
//             title: "Upcoming Exams",
//             text: "Mid Sem exams start on Nov 12.",
//             icon: <CalendarDays size={26} className="text-warning" />,
//           },
//         ].map((card, i) => (
//           <Col md={4} key={i}>
//             <motion.div
//               custom={i}
//               initial="hidden"
//               animate="visible"
//               variants={cardVariants}
//               whileHover={{
//                 scale: 1.04,
//                 boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Card
//                 className="border-0 rounded-4 p-3"
//                 style={{
//                   backgroundColor: "#fff",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <div className="d-flex align-items-center gap-3">
//                   <div
//                     className="p-3 rounded-4"
//                     style={{
//                       backgroundColor: "#f5f7fa",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {card.icon}
//                   </div>
//                   <div>
//                     <h6 className="fw-semibold mb-1">{card.title}</h6>
//                     <p className="text-muted small mb-0">{card.text}</p>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           </Col>
//         ))}
//       </Row>

//       {/* Notice Board */}
//       <motion.div
//         className="mt-5"
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="d-flex align-items-center mb-3">
//           <Bell className="text-warning me-2" size={20} />
//           <h5 className="fw-semibold mb-0">Notice Board</h5>
//         </div>

//         <ul className="list-group border-0">
//           {[
//             { text: "🎉 Campus Fest registration open!" },
//             { text: "📚 Library timings extended till 9 PM." },
//             { text: "💼 Placement drive for final years on Friday." },
//           ].map((notice, i) => (
//             <motion.li
//               key={i}
//               className="list-group-item border-0 rounded-3 px-3 py-2 mb-2"
//               style={{
//                 backgroundColor: "#fff",
//                 boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
//               }}
//               whileHover={{
//                 scale: 1.02,
//                 backgroundColor: "#f9fafc",
//               }}
//             >
//               {notice.text}
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  ClipboardList,
  BarChart3,
  Bell,
} from "lucide-react";

const TeacherDashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  return (
    <div className="container-fluid py-4 mt-5 pt-5">

      {/* Title */}
      <h3 className="fw-semibold mb-4">📋 Dashboard Overview</h3>

      {/* Top Cards */}
      <Row className="g-4">
        {[
          {
            title: "Today's Classes",
            text: "4 lectures scheduled",
            icon: <BookOpen size={26} className="text-primary" />,
          },
          {
            title: "Total Students",
            text: "120 students",
            icon: <Users size={26} className="text-success" />,
          },
          {
            title: "Pending Assignments",
            text: "18 submissions pending",
            icon: <ClipboardList size={26} className="text-warning" />,
          },
          {
            title: "Avg Attendance",
            text: "78%",
            icon: <BarChart3 size={26} className="text-info" />,
          },
        ].map((card, i) => (
          <Col md={3} key={i}>
            <motion.div
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="border-0 rounded-4 p-3 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-light rounded-4">
                    {card.icon}
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">{card.title}</h6>
                    <p className="text-muted small mb-0">{card.text}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Middle Section */}
      <Row className="mt-5 g-4">

        {/* Attendance Overview */}
        <Col md={6}>
          <Card className="border-0 rounded-4 shadow-sm p-3">
            <h6 className="fw-semibold mb-3">📊 Attendance Overview</h6>

            <p className="mb-1">CSE 3rd-A</p>
            <ProgressBar now={82} className="mb-3" />

            <p className="mb-1">CSE 2nd-B</p>
            <ProgressBar now={74} className="mb-3" />

            <p className="mb-1">AI Batch</p>
            <ProgressBar now={88} />
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col md={6}>
          <Card className="border-0 rounded-4 shadow-sm p-3">
            <h6 className="fw-semibold mb-3">⚡ Recent Activity</h6>

            <ul className="list-group border-0">
              <li className="list-group-item border-0 px-0">
                📄 Assignment 2 uploaded for CSE 3rd-A
              </li>
              <li className="list-group-item border-0 px-0">
                ✅ Attendance marked for today
              </li>
              <li className="list-group-item border-0 px-0">
                📊 Sessional 1 marks updated
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Notice Board */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="d-flex align-items-center mb-3">
          <Bell className="text-warning me-2" size={20} />
          <h5 className="fw-semibold mb-0">Announcements</h5>
        </div>

        <ul className="list-group border-0">
          {[
            "📅 Faculty meeting on Monday",
            "📝 Submit internal marks by Friday",
            "🎓 Workshop on AI this weekend",
          ].map((text, i) => (
            <li
              key={i}
              className="list-group-item border-0 rounded-3 mb-2 shadow-sm"
            >
              {text}
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
};

export default TeacherDashboard;