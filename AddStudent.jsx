import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const AddStudent = () => {
    const [student, setStudent] = useState({
      name: "",
      father_name: "",
      roll: "",
      year: "",
      semester: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      password: "",
    });

  const generateCredentials = () => {
    const id = "CLG" + Date.now().toString().slice(-6);
    const pass = Math.random().toString(36).slice(-6);

    setStudent({ ...student, roll: id, password: pass });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:8080/auth/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        college_id: student.roll,
        name: student.name,
        father_name: student.father_name,
        year: Number(student.year),
        sem: Number(student.semester),
        password: student.password,
        gender: student.gender,
        email: student.email,
        address: student.address,
        phone: student.phone,
        dob: student.dob,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Error adding student");
      return;
    }

    alert("✅ Student Added Successfully");

    // reset form
    setStudent({
      name: "",
      father_name: "",
      roll: "",
      year: "",
      semester: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      password: "",
    });

  } catch (error) {
    console.error(error);
    alert("❌ Server error");
  }
};

  return (
    <div className="container py-4 mt-5 pt-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>

          {/* Header */}
          <h4 className="fw-bold mb-4">👨‍🎓 Add Student</h4>

          <Form onSubmit={handleSubmit}>

            {/* 🔵 Academic Section */}
            <Card className="mb-4 border-0 shadow-sm rounded-4 p-3">
              <h5 className="mb-3">📚 Academic Details</h5>

              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter full name"
                    value={student.name}
                    onChange={(e) =>
                      setStudent({ ...student, name: e.target.value })
                    }
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control
                    value={student.father_name}
                    onChange={(e) =>
                      setStudent({ ...student, father_name: e.target.value })
                    }
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Roll No</Form.Label>
                  <Form.Control value={student.roll} disabled />
                </Col>

                {/* <Col md={4}>
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    value={student.year}
                    onChange={(e) =>
                      setStudent({ ...student, year: e.target.value })
                    }
                  >
                    <option value="">Select Year</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Form.Select>
                </Col> */}

                <Col md={6}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={student.gender}
                    onChange={(e) =>
                      setStudent({ ...student, gender: e.target.value })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Col>

                <Col md={4}>
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    value={student.class}
                    onChange={(e) =>
                      setStudent({ ...student, class: e.target.value })
                    }
                  >
                    <option value="">Select Class</option>
                    <option>CSE 1st Year</option>
                    <option>CSE 2nd Year</option>
                    <option>CSE 3rd Year</option>
                  </Form.Select>
                </Col>

                {/* <Col md={4}>
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    value={student.section}
                    onChange={(e) =>
                      setStudent({ ...student, section: e.target.value })
                    }
                  >
                    <option value="">Select Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </Form.Select>
                </Col> */}

                <Col md={4}>
                  <Form.Label>Semester</Form.Label>
                  <Form.Select
                    value={student.semester}
                    onChange={(e) =>
                      setStudent({ ...student, semester: e.target.value })
                    }
                  >
                    <option value="">Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Card>

            {/* 🟢 Personal Section */}
            <Card className="mb-4 border-0 shadow-sm rounded-4 p-3">
              <h5 className="mb-3">👤 Personal Details</h5>

              <Row className="g-3">
                <Col md={4}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={student.email}
                    onChange={(e) =>
                      setStudent({ ...student, email: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={student.phone}
                    onChange={(e) =>
                      setStudent({ ...student, phone: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    value={student.dob}
                    onChange={(e) =>
                      setStudent({ ...student, dob: e.target.value })
                    }
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="Enter address"
                    value={student.address}
                    onChange={(e) =>
                      setStudent({ ...student, address: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Card>

            {/* 🟣 Credentials Section */}
            <Card className="mb-4 border-0 shadow-sm rounded-4 p-3">
              <h5 className="mb-3">🔐 Login Credentials</h5>

              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={student.password}
                    onChange={(e) =>
                      setStudent({ ...student, password: e.target.value })
                    }
                  />
                </Col>

                <Col md={6} className="d-flex align-items-end">
                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={generateCredentials}
                  >
                    ⚡ Generate ID & Password
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Submit */}
            <div className="text-end">
              <Button type="submit" size="lg" variant="primary">
                ➕ Add Student
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddStudent;