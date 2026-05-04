import React, { useState,useEffect, use } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherProfileUpdate = () => {
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "Dr. Rakesh Sharma",
    employeeId: "TCH102",
    designation: "Assistant Professor",
    qualification: "PhD (AI & ML)",
    experience: "8",
    email: "rakesh@college.edu",
    phone: "+91 9876543210",
    address: "Rohtak, Haryana",
    dob: "1985-01-10",
    salary: "80000",
    subjects: "Machine Learning, Data Structures, AI",
    classes: "CSE 3rd Year - A, CSE 2nd Year - B",
    research: "Artificial Intelligence, Deep Learning",
    publications: "12",
  });

  useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  setFormData((prev) => ({
    ...prev,   // 👈 old data preserve
    ...savedUser, // 👈 new data override
  }));
}, []);

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://127.0.0.1:8080/teacher/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        email: user.email // ✅ IMPORTANT (identify teacher)
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Update failed");
    }

    // ✅ update localStorage
    const updatedUser = {
      ...user,
      ...formData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("✅ Profile updated successfully");
    navigate("/teacher/profile");

  } catch (err) {
    console.error("Update error:", err);
  }
};

  return (
    <div className="px-3" 
    style={{ marginTop: "80px",
             width: "1000px"
     }}>
      <Card className="shadow-lg border-0">
        <Card.Body>

          <h4 className="mb-4">✏️ Edit Profile</h4>

          <Form onSubmit={handleSubmit}>

            {/* Basic Info */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  name="employeeId"
                  value={formData.employeeId}
                  disabled
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  disabled
                />
              </Col>

              <Col md={6}>
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  disabled
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Experience (Years)</Form.Label>
                <Form.Control
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  disabled
                />
              </Col>

              <Col md={6}>
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  disabled
                />
              </Col>
            </Row>

            <hr />

            {/* Contact */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <hr />

            {/* Academic */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Subjects (comma separated)</Form.Label>
                <Form.Control
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  disabled
                />
              </Col>

              <Col md={6}>
                <Form.Label>Assigned Classes</Form.Label>
                <Form.Control
                  name="classes"
                  value={formData.classes}
                  onChange={handleChange}
                  disabled
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Research Area</Form.Label>
                <Form.Control
                  name="research"
                  value={formData.research}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Publications</Form.Label>
                <Form.Control
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {/* Button */}
            <div className="text-end mt-3">
              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherProfileUpdate