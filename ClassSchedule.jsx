import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Nav } from "react-bootstrap";

// ✅ Teacher Assigned Classes (dynamic source)
const teacherClasses = [
  { day: "Mon", time: "09:00-10:00", subject: "Machine Learning", class: "CSE 3rd", section: "A", room: "B-203" },
  { day: "Mon", time: "10:00-11:00", subject: "DBMS", class: "CSE 2nd", section: "B", room: "B-205" },
  { day: "Tue", time: "11:00-12:00", subject: "AI", class: "CSE 3rd", section: "A", room: "B-201" },
  { day: "Wed", time: "09:00-10:00", subject: "Data Structures", class: "CSE 2nd", section: "B", room: "B-101" },
];

// ✅ Convert into day-wise schedule
const getScheduleByDay = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const schedule = {};

  days.forEach((d) => {
    schedule[d] = teacherClasses.filter((cls) => cls.day === d);
  });

  return schedule;
};

const scheduleData = getScheduleByDay();

const TeacherClassSchedule = () => {
  const [day, setDay] = useState("Mon");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [nextClass, setNextClass] = useState(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const convertToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getCurrentTime();
      const todaySchedule = scheduleData[day];

      let foundCurrent = -1;
      let next = null;

      todaySchedule.forEach((cls, index) => {
        const [start, end] = cls.time.split("-");
        const startMin = convertToMinutes(start);
        const endMin = convertToMinutes(end);

        if (now >= startMin && now <= endMin) {
          foundCurrent = index;
        }

        if (now < startMin && !next) {
          next = cls;
        }
      });

      setCurrentIndex(foundCurrent);
      setNextClass(next);
    }, 60000);

    return () => clearInterval(interval);
  }, [day]);

  return (
    <div className="px-2 px-md-4" 
    style={{ marginTop: "80px" ,
            width : "1000px"
    }}>
      <Card className="shadow-lg border-0 w-100" style={{ borderRadius: "18px" }}>
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>📚 Teacher Schedule</h4>
            {nextClass && (
              <Badge bg="info">
                Next: {nextClass.subject} ({nextClass.time})
              </Badge>
            )}
          </div>

          {/* Day Tabs */}
          <Nav variant="pills" className="mb-3">
            {Object.keys(scheduleData).map((d) => (
              <Nav.Item key={d}>
                <Nav.Link
                  active={day === d}
                  onClick={() => setDay(d)}
                  style={{ cursor: "pointer" }}
                >
                  {d}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Table */}
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Room</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {scheduleData[day].length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Classes 🎉
                    </td>
                  </tr>
                ) : (
                  scheduleData[day].map((cls, index) => {
                    const isCurrent = index === currentIndex;

                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: isCurrent ? "#e3f2fd" : "",
                          transition: "0.3s",
                        }}
                      >
                        <td>{cls.time}</td>
                        <td><strong>{cls.subject}</strong></td>
                        <td>{cls.class} - {cls.section}</td>
                        <td>{cls.room}</td>
                        <td>
                          {isCurrent ? (
                            <Badge bg="success">Live</Badge>
                          ) : index < currentIndex ? (
                            <Badge bg="secondary">Done</Badge>
                          ) : (
                            <Badge bg="warning">Upcoming</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>

        </Card.Body>
      </Card>

      {/* Hover Animation */}
      <style>{`
        tr:hover {
          transform: scale(1.01);
          background-color: #f8f9fa !important;
        }
      `}</style>
    </div>
  );
};

export default TeacherClassSchedule; 
