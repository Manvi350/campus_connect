import React, { useState } from "react";
import { Card, Table, Button, Form, Row, Col } from "react-bootstrap";

// Classes
const teacherClasses = ["CSE 3rd-A", "CSE 2nd-B"];

// Students
const studentsData = {
  "CSE 3rd-A": [
    { id: 1, name: "Aman" },
    { id: 2, name: "Rohit" },
    { id: 3, name: "Neha" },
  ],
  "CSE 2nd-B": [
    { id: 4, name: "Simran" },
    { id: 5, name: "Karan" },
  ],
};

const TeacherAttendance = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(today);

  // Report states
  const [reportClass, setReportClass] = useState("");
  const [reportMode, setReportMode] = useState("all");
  const [reportDate, setReportDate] = useState("");

  // Class select
  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    const data = studentsData[cls] || [];
    setStudents(data);

    const init = {};
    data.forEach((s) => (init[s.id] = false));
    setAttendance(init);
  };

  // Date change
  const handleDateChange = (newDate) => {
    setDate(newDate);

    if (!selectedClass) return;

    const updated = {};
    students.forEach((s) => {
      updated[s.id] =
        records[selectedClass]?.[newDate]?.[s.id] || false;
    });

    setAttendance(updated);
  };

  // Toggle
  const toggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Save
  const handleSave = () => {
    const updated = { ...records };

    if (!updated[selectedClass]) updated[selectedClass] = {};
    if (!updated[selectedClass][date]) updated[selectedClass][date] = {};

    students.forEach((s) => {
      updated[selectedClass][date][s.id] = attendance[s.id];
    });

    setRecords(updated);
    alert("Saved ✅");
  };

  // Percentage
  const getPercent = (cls, id) => {
    if (!records[cls]) return 0;

    const dates = Object.keys(records[cls]);
    const total = dates.length;

    let present = 0;
    dates.forEach((d) => {
      if (records[cls][d][id]) present++;
    });

    return total ? Math.round((present / total) * 100) : 0;
  };

  // Report data
  const reportStudents = studentsData[reportClass] || [];
  const reportDates =
    reportMode === "all"
      ? Object.keys(records[reportClass] || {})
      : reportDate
      ? [reportDate]
      : [];

  return (
    <div className="px-3" 
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0">
        <Card.Body>

          <h4 className="mb-4">📊 Attendance Panel</h4>

          {/* ATTENDANCE SECTION */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Select onChange={(e) => handleClassChange(e.target.value)}>
                <option>Select Class</option>
                {teacherClasses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Button onClick={handleSave}>Save</Button>
            </Col>
          </Row>

          {/* Attendance Table */}
          {selectedClass && (
            <Table bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Today</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={attendance[s.id] || false}
                        onChange={() => toggle(s.id)}
                        label={attendance[s.id] ? "Present" : "Absent"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* ================= REPORT SECTION ================= */}

          <hr className="my-4" />
          <h4 className="mb-3">📄 Attendance Report</h4>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Select onChange={(e) => setReportClass(e.target.value)}>
                <option>Select Class</option>
                {teacherClasses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Select onChange={(e) => setReportMode(e.target.value)}>
                <option value="all">Full Report</option>
                <option value="date">Single Date</option>
              </Form.Select>
            </Col>

            {reportMode === "date" && (
              <Col md={3}>
                <Form.Control
                  type="date"
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </Col>
            )}
          </Row>

          {/* REPORT TABLE */}
          {reportClass && reportDates.length > 0 && (
            <Table bordered>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  {reportDates.map((d) => (
                    <th key={d}>{d}</th>
                  ))}
                  <th>Percentage</th>
                </tr>
              </thead>

              <tbody>
                {reportStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>

                    {reportDates.map((d) => (
                      <td key={d}>
                        {records[reportClass]?.[d]?.[s.id]
                          ? "✅"
                          : "❌"}
                      </td>
                    ))}

                    <td>
                      {reportMode === "all"
                        ? getPercent(reportClass, s.id) + "%"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherAttendance;