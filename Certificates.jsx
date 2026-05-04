import React, { useState } from "react";
import { Card, Row, Col, Badge, Button, Modal, Form } from "react-bootstrap";

const Certificates = () => {
  const [show, setShow] = useState(false);

  const [certificates, setCertificates] = useState([
    {
      title: "Deep Learning",
      platform: "Coursera",
      year: "2024",
      type: "AI/ML",
      file: "#", // 👈 PDF link
    },
  ]);

  const [newCert, setNewCert] = useState({
    title: "",
    platform: "",
    year: "",
    type: "",
    file: null,
  });

  const handleChange = (e) => {
    setNewCert({ ...newCert, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setNewCert({ ...newCert, file: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAdd = () => {
    setCertificates([...certificates, newCert]);
    setShow(false);
  };

  return (
    <div className="px-2 px-md-4" 
      style={{
        marginTop: "80px", // 👈 navbar ke niche space (adjust kar sakta hai)
        width: "1000px",
      }}>
      <Card className="shadow-lg border-0 w-100" style={{ borderRadius: "18px" }}>
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between mb-4">
            <h4>🏅 Certificates</h4>
            <Button size="sm" onClick={() => setShow(true)}>
              + Add Certificate
            </Button>
          </div>

          {/* Cards */}
          <Row>
            {certificates.map((cert, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card className="h-100 shadow-sm cert-card">
                  <Card.Body>
                    <h5>{cert.title}</h5>
                    <p className="text-muted">{cert.platform}</p>

                    <div className="mb-2">
                      <Badge bg="info" className="me-1">{cert.type}</Badge>
                      <Badge bg="secondary">{cert.year}</Badge>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => window.open(cert.file)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-success"
                        href={cert.file}
                        download
                      >
                        Download
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        </Card.Body>
      </Card>

      {/* 🔥 Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Certificate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Platform</Form.Label>
              <Form.Control name="platform" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Year</Form.Label>
              <Form.Control name="year" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Control name="type" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control type="file" onChange={handleFile} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hover effect */}
      <style>{`
        .cert-card:hover {
          transform: translateY(-5px);
          transition: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Certificates;