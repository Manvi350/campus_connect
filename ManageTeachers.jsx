import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Badge,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

const ITEMS_PER_PAGE = 5;

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Load
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("teachers")) || [];
  //   setTeachers(data);
  // }, []);

  useEffect(() => {
  const fetchTeachers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8080/teacher/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("teachers:", data);

      setTeachers(data.teachers || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTeachers();
}, []);

  // Delete
  // const deleteTeacher = (id) => {
  //   const updated = teachers.filter((t) => t.id !== id);
  //   setTeachers(updated);
  //   localStorage.setItem("teachers", JSON.stringify(updated));
  // };

//   const deleteTeacher = (id) => {
//   const updated = teachers.filter((t) => t.id !== id);
//   setTeachers(updated);
// };

const deleteTeacher = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await fetch(`http://127.0.0.1:8080/teacher/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // UI update
    setTeachers((prev) => prev.filter((t) => t._id !== id));

  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};

  // Filter
  const filtered = teachers.filter(
    (t) =>
      (t.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.id || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Save Edit
  const handleEditSave = () => {
    const updated = teachers.map((t) =>
      t.id === selectedTeacher.id ? selectedTeacher : t
    );
    setTeachers(updated);
    localStorage.setItem("teachers", JSON.stringify(updated));
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
            <h4>Manage Teachers</h4>

            <Form.Control
              placeholder="Search..."
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Classes</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Teachers Found
                    </td>
                  </tr>
                ) : (
                  currentData.map((t, i) => (
                    <tr key={i}>
                      <td><strong>{t.id}</strong></td>
                      <td>{t.name}</td>
                      <td>{t.subject}</td>

                      <td>
                        {t.classes?.map((cls, idx) => (
                          <Badge key={idx} bg="warning" className="me-1">
                            {cls}
                          </Badge>
                        ))}
                      </td>

                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => {
                            setSelectedTeacher(t);
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
                            setSelectedTeacher(t);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteTeacher(t._id)}
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
          <Modal.Title>👁 Teacher Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedTeacher && (
            <>
              <p><strong>Name:</strong> {selectedTeacher.name}</p>
              <p><strong>Email:</strong> {selectedTeacher.email}</p>
              <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
              <p><strong>Designation:</strong> {selectedTeacher.designation}</p>
              <p><strong>Qualification:</strong> {selectedTeacher.qualification}</p>
              <p><strong>Experience:</strong> {selectedTeacher.experience}</p>
              <p><strong>Salary:</strong> {selectedTeacher.salary}</p>
              <p><strong>Address:</strong> {selectedTeacher.address}</p>

              <p><strong>Classes:</strong></p>
              {selectedTeacher.classes?.map((c, i) => (
                <Badge key={i} bg="warning" className="me-1">
                  {c}
                </Badge>
              ))}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg">
      <Modal.Header closeButton>
         <Modal.Title>✏️ Edit Teacher (Full Profile)</Modal.Title>
      </Modal.Header>

      <Modal.Body>
         {selectedTeacher && (
            <Form>
            <Row className="g-3">

               {/* Basic */}
               <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  value={selectedTeacher.name}
                  onChange={(e) =>
                     setSelectedTeacher({ ...selectedTeacher, name: e.target.value })
                  }
                  />
               </Col>

               <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  value={selectedTeacher.email}
                  onChange={(e) =>
                     setSelectedTeacher({ ...selectedTeacher, email: e.target.value })
                  }
                  />
               </Col>

               <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                  value={selectedTeacher.phone}
                  onChange={(e) =>
                     setSelectedTeacher({ ...selectedTeacher, phone: e.target.value })
                  }
                  />
               </Col>

               <Col md={6}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                  value={selectedTeacher.address}
                  onChange={(e) =>
                     setSelectedTeacher({ ...selectedTeacher, address: e.target.value })
                  }
                  />
               </Col>

               {/* Professional */}
               <Col md={4}>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                  value={selectedTeacher.designation}
                  onChange={(e) =>
                     setSelectedTeacher({ ...selectedTeacher, designation: e.target.value })
                  }
                  />
               </Col>

               <Col md={4}>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                  value={selectedTeacher.qualification}
                  onChange={(e) =>
                     setSelectedTeacher({
                        ...selectedTeacher,
                        qualification: e.target.value,
                     })
                  }
                  />
               </Col>

               <Col md={4}>
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                  value={selectedTeacher.experience}
                  onChange={(e) =>
                     setSelectedTeacher({
                        ...selectedTeacher,
                        experience: e.target.value,
                     })
                  }
                  />
               </Col>

               <Col md={6}>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                  value={selectedTeacher.subject}
                  onChange={(e) =>
                     setSelectedTeacher({
                        ...selectedTeacher,
                        subject: e.target.value,
                     })
                  }
                  />
               </Col>

               <Col md={6}>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                  value={selectedTeacher.salary}
                  onChange={(e) =>
                     setSelectedTeacher({
                        ...selectedTeacher,
                        salary: e.target.value,
                     })
                  }
                  />
               </Col>

               {/* Credentials */}
               <Col md={6}>
                  <Form.Label>Teacher ID</Form.Label>
                  <Form.Control value={selectedTeacher.id} disabled />
               </Col>

               <Col md={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  value={selectedTeacher.password}
                  onChange={(e) =>
                     setSelectedTeacher({
                        ...selectedTeacher,
                        password: e.target.value,
                     })
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
         <Button variant="primary" onClick={handleEditSave}>
            Save Changes
         </Button>
      </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ManageTeachers;