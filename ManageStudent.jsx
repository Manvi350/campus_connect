import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

const ITEMS_PER_PAGE = 5;

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("students")) || [];
  //   setStudents(data);
  // }, []);

  useEffect(() => {
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8080/teacher/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("students:", data);

      setStudents(data.students || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStudents();
}, []);

  // Delete
  // const deleteStudent = (roll) => {
  //   const updated = students.filter((s) => s.roll !== roll);
  //   setStudents(updated);
  //   localStorage.setItem("students", JSON.stringify(updated));
  // };
  const deleteStudent = (id) => {
  const updated = students.filter((s) => s.college_id !== id);
  setStudents(updated);
};

  // Filter
  // const filtered = students.filter(
  //   (s) =>
  //     s.name.toLowerCase().includes(search.toLowerCase()) ||
  //     s.roll.toLowerCase().includes(search.toLowerCase())
  // );

  const filtered = students.filter((s) =>
  (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
  (s.college_id || "").toLowerCase().includes(search.toLowerCase())
);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Save Edit
  const handleSave = () => {
    const updated = students.map((s) =>
      s.roll === selectedStudent.roll ? selectedStudent : s
    );
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setShowEdit(false);
  };

  return (
    <div className="container py-4 mt-5 pt-4"
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between mb-3">
            <h4>👨‍🎓 Manage Students</h4>

            <Form.Control
              placeholder="Search by name / roll..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Roll</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Students Found
                    </td>
                  </tr>
                ) : (
                  currentData.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.college_id}</strong></td>
                      <td>{s.name}</td>
                      <td>{s.class}</td>
                      
                      <td>
                        <Badge bg="info">{s.section}</Badge>
                      </td>

                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => {
                            setSelectedStudent(s);
                            setShowView(true);
                          }}
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="primary"
                          className="me-2"
                          onClick={() => {
                            setSelectedStudent(s);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteStudent(s.college_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                size="sm"
                className="me-2"
                variant={currentPage === i + 1 ? "dark" : "outline-dark"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

        </Card.Body>
      </Card>

      {/* VIEW MODAL */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>👁 Student Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedStudent && (
            <>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Roll:</strong> {selectedStudent.roll}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Section:</strong> {selectedStudent.section}</p>
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>✏️ Edit Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedStudent && (
            <Form>
              <Row className="g-3">

                <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={selectedStudent.name}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, name: e.target.value })
                    }
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, email: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    value={selectedStudent.class}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, class: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    value={selectedStudent.section}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, section: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    value={selectedStudent.semester}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, semester: e.target.value })
                    }
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={selectedStudent.phone}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, phone: e.target.value })
                    }
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={selectedStudent.password}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, password: e.target.value })
                    }
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={selectedStudent.address}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, address: e.target.value })
                    }
                  />
                </Col>

              </Row>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ManageStudents;