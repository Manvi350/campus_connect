import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <h3>No user data</h3>;
  return (
    <div
      className="px-2 px-md-4"
      style={{
        marginTop: "80px",
        width: "1000px",
      }}
    >
      <Card
        className="shadow-lg border-0 w-100"
        style={{ borderRadius: "18px" }}
      >
        <Card.Body className="p-3 p-md-4">

          {/* Header */}
          <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="teacher"
              width="80"
              className="mb-2 mb-md-0 me-md-3"
            />
            <div>
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <Badge bg="success" className="mb-1">Active Faculty</Badge>
              <p className="text-muted mb-0">{user.department}</p>
            </div>
          </div>

          <hr />

          {/* Basic Info */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <p><strong>Employee ID:</strong> TCH102</p>
              <p><strong>Designation:</strong> Assistant Professor</p>
              <p><strong>Qualification:</strong> PhD (AI & ML)</p>
              <p><strong>Experience:</strong> 8 Years</p>
            </Col>

            <Col xs={12} md={6}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || "—"}</p>
              <p><strong>Address:</strong> {user.address || "—"}</p>
              <p><strong>DOB:</strong> {user.dob || "—"}</p>
            </Col>
          </Row>

          <hr />

          {/* Professional Info */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <p>
                <strong>Salary:</strong>{" "}
                <Badge bg="info">₹80,000 / month</Badge>
              </p>

              <p><strong>Subjects:</strong></p>
              <div>
                <Badge bg="primary" className="me-1 mb-1"> {user.subject || "—"}</Badge>
                {/* <Badge bg="secondary" className="me-1 mb-1">Data Structures</Badge>
                <Badge bg="dark" className="mb-1">AI</Badge> */}
              </div>
            </Col>

            <Col xs={12} md={6}>
              <p><strong>Assigned Classes:</strong></p>
              <div>
                <Badge bg="warning" className="me-1 mb-1">CSE 3rd Year - A</Badge>
                <Badge bg="warning" className="me-1 mb-1">CSE 2nd Year - B</Badge>
                <Badge bg="warning" className="mb-1">AI Special Batch</Badge>
              </div>
            </Col>
          </Row>

          <hr />

          {/* Extra Section */}
          <Row>
            <Col>
              <p><strong>Research Area:</strong>{user.research || "—"}</p>
              <p><strong>Publications:</strong> {user.publications || "—"}</p>
            </Col>
          </Row>

          {/* Button */}
          <div className="text-center text-md-end mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/teacher/profile-update")}
            >
              Edit Profile
            </Button>
          </div>

        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherProfile;