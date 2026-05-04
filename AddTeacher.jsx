import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";

const AddTeacher = () => {
  const [showPass, setShowPass] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    qualification: "",
    experience: "",
    subject: "",
    salary: "",
    address: "",
    id: "",
    password: "",
    department: "",
    dob: "",
    publications: "",
    research: "",
  });

  const [classes, setClasses] = useState([]);
  const [classInput, setClassInput] = useState("");

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const addClass = () => {
    if (classInput.trim()) {
      setClasses([...classes, classInput]);
      setClassInput("");
    }
  };

  const removeClass = (cls) => {
    setClasses(classes.filter((c) => c !== cls));
  };

  // ⚡ Generate ID & Password
  const generateCredentials = () => {
    const id = "TCH" + Date.now().toString().slice(-6);
    const pass = Math.random().toString(36).slice(-6);

    setTeacher((prev) => ({
      ...prev,
      id,
      password: pass,
    }));
  };

  // ✅ Submit API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher.email || !teacher.password || !teacher.id) {
      alert("⚠️ Please generate ID & Password first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8080/teacher/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: teacher.id, 
          name: teacher.name,
          email: teacher.email,
          password: teacher.password,
          subject: teacher.subject,
          department: teacher.department,
          address: teacher.address,
          phone: teacher.phone,
          dob: teacher.dob,
          publications: teacher.publications || "",
          research: teacher.research || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Error adding teacher");
        return;
      }

      alert("✅ Teacher Added Successfully");

      // RESET ALL
      setTeacher({
        name: "",
        email: "",
        phone: "",
        designation: "",
        qualification: "",
        experience: "",
        subject: "",
        salary: "",
        address: "",
        id: "",
        password: "",
        department: "",
        dob: "",
        publications: "",
        research: "",
      });

      setClasses([]);
    } catch (error) {
      console.error(error);
      alert("❌ Server error");
    }
  };

  return (
    <div className="container py-4 mt-5 pt-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-lg rounded-4">
          <Card.Body className="p-4">

            <h4 className="fw-bold mb-4">👨‍🏫 Add Teacher</h4>

            <Form onSubmit={handleSubmit}>

              {/* BASIC INFO */}
              <Card className="mb-4 border-0 shadow-sm rounded-3">
                <Card.Body>
                  <h6 className="fw-semibold mb-3 text-secondary">
                    📌 Basic Information
                  </h6>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        placeholder="Full Name"
                        name="name"
                        value={teacher.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={teacher.email}
                        onChange={handleChange}
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        placeholder="Phone"
                        name="phone"
                        value={teacher.phone}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        placeholder="Address"
                        name="address"
                        value={teacher.address}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* PROFESSIONAL */}
              <Card className="mb-4 border-0 shadow-sm rounded-3">
                <Card.Body>
                  <h6 className="fw-semibold mb-3 text-secondary">
                    🎓 Professional Details
                  </h6>

                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Control
                        placeholder="Department"
                        name="department"
                        value={teacher.department}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={4}>
                      <Form.Control
                        placeholder="Subject"
                        name="subject"
                        value={teacher.subject}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={4}>
                      <Form.Control
                        placeholder="Experience"
                        name="experience"
                        value={teacher.experience}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        placeholder="Publications"
                        name="publications"
                        value={teacher.publications}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        placeholder="Research"
                        name="research"
                        value={teacher.research}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* CLASSES */}
              <Card className="mb-4 border-0 shadow-sm rounded-3">
                <Card.Body>
                  <h6 className="fw-semibold mb-3 text-secondary">
                    🏫 Assign Classes
                  </h6>

                  <Row className="g-2 mb-2">
                    <Col md={8}>
                      <Form.Control
                        placeholder="e.g. CSE 3rd-A"
                        value={classInput}
                        onChange={(e) => setClassInput(e.target.value)}
                      />
                    </Col>

                    <Col md={4}>
                      <Button variant="dark" onClick={addClass} className="w-100">
                        Add Class
                      </Button>
                    </Col>
                  </Row>

                  <div>
                    {classes.map((cls, i) => (
                      <Badge
                        key={i}
                        bg="warning"
                        className="me-2 mb-2 px-3 py-2"
                        onClick={() => removeClass(cls)}
                        style={{ cursor: "pointer" }}
                      >
                        {cls} ✕
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* LOGIN */}
              <Card className="mb-4 border-0 shadow-sm rounded-3">
                <Card.Body>
                  <h6 className="fw-semibold mb-3 text-secondary">
                    🔐 Login Credentials
                  </h6>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        placeholder="Teacher ID"
                        value={teacher.id}
                        readOnly
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        value={teacher.password}
                        readOnly
                      />

                      <Button
                        variant="secondary"
                        className="mt-2"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? "Hide Password" : "Show Password"}
                      </Button>
                    </Col>

                    <Col md={12}>
                      <Button
                        variant="dark"
                        className="w-100"
                        onClick={generateCredentials}
                      >
                        ⚡ Generate ID & Password
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* SUBMIT */}
              <div className="text-end">
                <Button type="submit" variant="primary" size="lg">
                  Submit
                </Button>
              </div>

            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddTeacher;