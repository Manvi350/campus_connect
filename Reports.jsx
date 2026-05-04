import React, { useEffect, useState } from "react";
import { Card, Form, Table, Row, Col } from "react-bootstrap";

const Reports = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [marks, setMarks] = useState({});
  const [timetable, setTimetable] = useState({});

  const [selectedClass, setSelectedClass] = useState("");
  const [type, setType] = useState("attendance");

  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setTeachers(JSON.parse(localStorage.getItem("teachers")) || []);
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || {});
    setMarks(JSON.parse(localStorage.getItem("marks")) || {});
    setTimetable(JSON.parse(localStorage.getItem("timetable")) || {});
  }, []);

  // 🎯 Filter students
  const filteredStudents = students.filter((s) => {
    if (!selectedClass) return false;
    const [cls, sec] = selectedClass.split("-");
    return s.class === cls && s.section === sec;
  });

  // 📊 Attendance %
  const getAttendance = (roll) => {
    let present = 0,
      total = 0;

    Object.values(attendance).forEach((day) => {
      if (day[roll] !== undefined) {
        total++;
        if (day[roll] === "Present") present++;
      }
    });

    return total ? ((present / total) * 100).toFixed(1) : "0";
  };

  // 📝 Marks
  const getMarks = (roll) => {
    return marks[roll] || { s1: "-", s2: "-" };
  };

  return (
    <div className="container py-4 mt-5 pt-4"
    style={{width: "1000px"}}>

      <Card className="shadow-lg border-0 rounded-4 p-3">
        <h4 className="mb-4">📊 Reports Panel</h4>

        {/* Filters */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((c, i) => (
                <option key={i}>
                  {c.name}-{c.section}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="attendance">Student Attendance</option>
              <option value="marks">Student Marks</option>
              <option value="full">Full Report</option>
              <option value="teacher">Teacher Report</option>
            </Form.Select>
          </Col>
        </Row>

        {/* ================= STUDENT REPORT ================= */}
        {(type === "attendance" ||
          type === "marks" ||
          type === "full") && (
          <Table bordered hover className="text-center">
            <thead className="table-dark">
              <tr>
                <th>Roll</th>
                <th>Name</th>

                {(type === "attendance" || type === "full") && (
                  <th>Attendance %</th>
                )}

                {(type === "marks" || type === "full") && (
                  <>
                    <th>Sessional 1</th>
                    <th>Sessional 2</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5">No Data</td>
                </tr>
              ) : (
                filteredStudents.map((s, i) => {
                  const mark = getMarks(s.roll);

                  return (
                    <tr key={i}>
                      <td>{s.roll}</td>
                      <td>{s.name}</td>

                      {(type === "attendance" || type === "full") && (
                        <td>{getAttendance(s.roll)}%</td>
                      )}

                      {(type === "marks" || type === "full") && (
                        <>
                          <td>{mark.s1}</td>
                          <td>{mark.s2}</td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}

        {/* ================= TEACHER REPORT ================= */}
        {type === "teacher" && (
          <Table bordered hover className="text-center">
            <thead className="table-dark">
              <tr>
                <th>Teacher</th>
                <th>Classes</th>
                <th>Subjects</th>
                <th>Total Lectures</th>
                <th>Total Students</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="5">No Teachers Found</td>
                </tr>
              ) : (
                teachers.map((t, i) => {
                  // Classes assigned
                  const cls = classes.filter(
                    (c) => c.teacher === t.name
                  );

                  // Subjects + lectures
                  const subjects = new Set();
                  let lectures = 0;

                  Object.values(timetable).forEach((entry) => {
                    if (entry.teacher === t.name) {
                      lectures++;
                      subjects.add(entry.subject);
                    }
                  });

                  // Students count
                  let totalStudents = 0;
                  cls.forEach((c) => {
                    totalStudents += students.filter(
                      (s) =>
                        s.class === c.name &&
                        s.section === c.section
                    ).length;
                  });

                  return (
                    <tr key={i}>
                      <td>{t.name}</td>

                      <td>
                        {cls.length === 0
                          ? "-"
                          : cls.map((c, i) => (
                              <div key={i}>
                                {c.name}-{c.section}
                              </div>
                            ))}
                      </td>

                      <td>
                        {[...subjects].length === 0
                          ? "-"
                          : [...subjects].map((s, i) => (
                              <span key={i}>{s}, </span>
                            ))}
                      </td>

                      <td>{lectures}</td>
                      <td>{totalStudents}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}

      </Card>
    </div>
  );
};

export default Reports;