import axios from "axios";
import React, { useState } from "react";
import { Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";

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

const Assignment = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [assignments, setAssignments] = useState({});
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [file, setFile] = useState(null);

    const [reportClass, setReportClass] = useState("");
    const [selectedAssignment, setSelectedAssignment] = useState("");

  // 🔹 Upload Assignment
  const handleUpload = () => {
    if (!selectedClass || !title || !deadline || !file) {
      alert("Fill all fields + upload file");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      deadline,
      fileName: file.name,
      submissions: {},
    };

    const updated = { ...assignments };

    if (!updated[selectedClass]) updated[selectedClass] = [];

    // initialize submissions
    studentsData[selectedClass].forEach((s) => {
      newAssignment.submissions[s.id] = false;
    });

    updated[selectedClass].push(newAssignment);
    setAssignments(updated);

    // reset
    setTitle("");
    setDeadline("");
    setFile(null);

    alert("Assignment Uploaded ✅");
  };

  //   const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("class", selectedClass);
  //   formData.append("title", title);
  //   formData.append("deadline", deadline);
  //   formData.append("file", file);

  //   await axios.post("http://localhost:8080/teacher/assignment", formData);

  //   alert("Uploaded to server ✅");
  // };

  // useEffect(() => {
  //   if (selectedClass) {
  //     axios
  //       .get(`http://localhost:8080/teacher/assignment/${selectedClass}`)
  //       .then((res) => setAssignments(res.data));
  //   }
  // }, [selectedClass]);

  

  // 🔹 Toggle submission (simulate)
  const toggleSubmit = (cls, assId, studentId) => {
    const updated = { ...assignments };

    const ass = updated[cls].find((a) => a.id === assId);
    ass.submissions[studentId] = !ass.submissions[studentId];

    setAssignments(updated);
  };

  // const giveMarks = async (assignmentId, studentId, marks) => {
  //   await axios.put(
  //     `http://localhost:8080/teacher/assignment/${assignmentId}/marks`,
  //     {
  //       studentId,
  //       marks,
  //     }
  //   );
  // };

  return (
    <div className="px-3" 
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0">
        <Card.Body>

          <h4 className="mb-4">📚 Assignment Panel</h4>

          {/* ================= UPLOAD ================= */}
          <Row className="mb-4">
            <Col md={3}>
              <Form.Select onChange={(e) => setSelectedClass(e.target.value)}>
                <option>Select Class</option>
                {teacherClasses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Control
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Col>

            <Col md={2}>
              <Button variant="success" onClick={handleUpload}>
                Upload
              </Button>
            </Col>
          </Row>

          {/* ================= ASSIGNMENT LIST ================= */}
          {selectedClass && assignments[selectedClass] && (
            <>
              <h5>📄 Uploaded Assignments</h5>

              <Table bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>File</th>
                    <th>Deadline</th>
                  </tr>
                </thead>

                <tbody>
                  {assignments[selectedClass].map((a) => (
                    <tr key={a.id}>
                      <td>{a.title}</td>
                      <td>{a.fileName}</td>
                      <td>{a.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {/* ================= REPORT ================= */}
          <hr className="my-4" />
          <h4>📊 Assignment Report</h4>

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
              <Form.Select onChange={(e) => setSelectedAssignment(e.target.value)}>
                <option>Select Assignment</option>
                {(assignments[reportClass] || []).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* ================= REPORT TABLE ================= */}
          {reportClass && selectedAssignment && (
            <Table bordered>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Mark</th>
                </tr>
              </thead>

              <tbody>
                {studentsData[reportClass].map((s) => {
                  const ass = assignments[reportClass]?.find(
                    (a) => a.id == selectedAssignment
                  );

                  const submitted = ass?.submissions[s.id];

                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>

                      <td>
                        {submitted ? (
                          <Badge bg="success">Submitted</Badge>
                        ) : (
                          <Badge bg="danger">Pending</Badge>
                        )}
                      </td>

                      <td>
                        <Form.Check
                          type="switch"
                          checked={submitted || false}
                          onChange={() =>
                            toggleSubmit(reportClass, ass.id, s.id)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}

        </Card.Body>
      </Card>
    </div>
  );
};

export default Assignment;