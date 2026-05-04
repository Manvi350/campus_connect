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

const SessionalMarks = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [sessional, setSessional] = useState("1");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [records, setRecords] = useState({});

  // Report
  const [reportClass, setReportClass] = useState("");
  const [reportSessional, setReportSessional] = useState("1");

  // 🔹 Class Change
  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    const data = studentsData[cls] || [];
    setStudents(data);

    const existing = records[cls]?.[sessional] || {};
    const init = {};

    data.forEach((s) => {
      init[s.id] = existing[s.id] || "";
    });

    setMarks(init);
  };

  // 🔹 Sessional Change (FIX)
  const handleSessionalChange = (sess) => {
    setSessional(sess);

    if (!selectedClass) return;

    const existing = records[selectedClass]?.[sess] || {};
    const updated = {};

    students.forEach((s) => {
      updated[s.id] = existing[s.id] || "";
    });

    setMarks(updated);
  };

  // 🔹 Marks Change
  const handleMarksChange = (id, value) => {
    setMarks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🔹 Save
  const handleSave = () => {
    if (!selectedClass) return alert("Select class");

    const updated = { ...records };

    if (!updated[selectedClass]) updated[selectedClass] = {};
    if (!updated[selectedClass][sessional])
      updated[selectedClass][sessional] = {};

    students.forEach((s) => {
      updated[selectedClass][sessional][s.id] = marks[s.id] || 0;
    });

    setRecords(updated);
    alert("Marks Saved ✅");
  };

  const reportStudents = studentsData[reportClass] || [];

  return (
    <div className="px-3" 
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0">
        <Card.Body>

          <h4 className="mb-4">📊 Sessional Marks Panel</h4>

          {/* ENTRY */}
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
              <Form.Select onChange={(e) => handleSessionalChange(e.target.value)}>
                <option value="1">Sessional 1</option>
                <option value="2">Sessional 2</option>
              </Form.Select>
            </Col>

            <Col md={4}>
              <Button onClick={handleSave}>Save Marks</Button>
            </Col>
          </Row>

          {/* TABLE */}
          {selectedClass && (
            <Table bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Marks</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={marks[s.id] || ""}
                        onChange={(e) =>
                          handleMarksChange(s.id, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* REPORT */}
          <hr className="my-4" />
          <h4>📄 Marks Report</h4>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Select onChange={(e) => setReportClass(e.target.value)}>
                <option>Select Class</option>
                {teacherClasses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Select onChange={(e) => setReportSessional(e.target.value)}>
                <option value="1">Sessional 1</option>
                <option value="2">Sessional 2</option>
              </Form.Select>
            </Col>
          </Row>

          {reportClass && records[reportClass]?.[reportSessional] && (
            <Table bordered>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Marks</th>
                </tr>
              </thead>

              <tbody>
                {reportStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                      {records[reportClass][reportSessional][s.id] ?? "-"}
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

export default SessionalMarks;