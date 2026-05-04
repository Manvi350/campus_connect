import React, { useState } from "react";
import { Card, Table, Button, Form, Row, Col } from "react-bootstrap";

// Classes
const teacherClasses = ["CSE 3rd-A", "CSE 2nd-B"];

const StudyMaterial = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [materials, setMaterials] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Upload Material
  const handleUpload = () => {
    if (!selectedClass || !title || !file) {
      alert("Fill all fields + upload file");
      return;
    }

    const newMaterial = {
      id: Date.now(),
      title,
      description,
      fileName: file.name,
      date: new Date().toLocaleDateString(),
    };

    const updated = { ...materials };

    if (!updated[selectedClass]) updated[selectedClass] = [];

    updated[selectedClass].push(newMaterial);
    setMaterials(updated);

    // reset
    setTitle("");
    setDescription("");
    setFile(null);

    alert("Study Material Uploaded ✅");
  };

  return (
    <div className="px-3" 
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0">
        <Card.Body>

          <h4 className="mb-4">📚 Study Material Panel</h4>

          {/* Upload Section */}
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
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Control
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>

            <Col md={2}>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Col>

            <Col md={1}>
              <Button variant="success" onClick={handleUpload}>
                Upload
              </Button>
            </Col>
          </Row>

          {/* Material List */}
          {selectedClass && materials[selectedClass] && (
            <>
              <h5>📄 Uploaded Materials</h5>

              <Table bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {materials[selectedClass].map((m) => (
                    <tr key={m.id}>
                      <td>{m.title}</td>
                      <td>{m.description || "-"}</td>
                      <td>{m.fileName}</td>
                      <td>{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

        </Card.Body>
      </Card>
    </div>
  );
};

export default StudyMaterial;