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

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    section: "",
    teacher: "",
    students: "",
  });

  // Load data
  // useEffect(() => {
  //   const cls = JSON.parse(localStorage.getItem("classes")) || [];
  //   const t = JSON.parse(localStorage.getItem("teachers")) || [];

  //   setClasses(cls);
  //   setTeachers(t);
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8080/teacher/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

  // Save class
  const handleSave = () => {
    let updated;

    if (editMode) {
      updated = classes.map((c) =>
        c.name === form.name && c.section === form.section ? form : c
      );
    } else {
      updated = [...classes, form];
    }

    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));

    setShowModal(false);
    setForm({ name: "", section: "", teacher: "", students: "" });
    setEditMode(false);
  };

  // Delete
  const deleteClass = (index) => {
    const updated = classes.filter((_, i) => i !== index);
    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
  };

  // Edit
  const handleEdit = (cls) => {
    setForm(cls);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container py-4 mt-5 pt-4" style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between mb-3">
            <h4>🏫 Manage Classes</h4>

            <Button onClick={() => setShowModal(true)}>
              ➕ Add Class
            </Button>
          </div>

          {/* Table */}
          <Table hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Classes Found
                  </td>
                </tr>
              ) : (
                classes.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>
                      <Badge bg="info">{c.section}</Badge>
                    </td>
                    <td>{c.teacher}</td>
                    <td>{c.students}</td>

                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        className="me-2"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteClass(i)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

        </Card.Body>
      </Card>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "✏️ Edit Class" : "➕ Add Class"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row className="g-3">

              <Col md={6}>
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </Col>

              <Col md={6}>
                <Form.Label>Section</Form.Label>
                <Form.Select
                  value={form.section}
                  onChange={(e) =>
                    setForm({ ...form, section: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Assign Teacher</Form.Label>
                <Form.Select
                  value={form.teacher}
                  onChange={(e) =>
                    setForm({ ...form, teacher: e.target.value })
                  }
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t, i) => (
                    <option key={i} value={t.id}>{t.name}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Student Count</Form.Label>
                <Form.Control
                  type="number"
                  value={form.students}
                  onChange={(e) =>
                    setForm({ ...form, students: e.target.value })
                  }
                />
              </Col>

            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ManageClasses;