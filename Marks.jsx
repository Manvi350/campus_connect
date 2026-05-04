import React, { useState, useEffect } from "react";
import { Card, Table, Nav, Badge } from "react-bootstrap";

const Marks = () => {
  const [sem, setSem] = useState(3);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetchMarks();
  }, [sem]);

  const fetchMarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `http://127.0.0.1:8080/student/marks/${user.college_id}/${sem}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("MARKS API:", data);

      setMarks(data.marks); // ✅ IMPORTANT

    } catch (err) {
      console.error("Error fetching marks:", err);
    }
  };

  return (
    <div className="px-2 px-md-4"
      style={{ marginTop: "80px", width: "1000px" }}>
      
      <Card className="shadow-lg border-0 w-100" style={{ borderRadius: "18px" }}>
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>📊 Internal Marks</h4>
            <Badge bg="info">Sessional</Badge>
          </div>

          {/* Semester Tabs */}
          <Nav variant="pills" className="mb-3">
            {[3, 4].map((s) => (
              <Nav.Item key={s}>
                <Nav.Link
                  active={sem === s}
                  onClick={() => setSem(s)}
                >
                  Sem {s}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Table */}
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Subject</th>
                  <th>Sessional 1</th>
                  <th>Sessional 2</th>
                  <th>Average</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((m, index) => (
                  <tr key={index}>
                    <td><strong>{m.subject}</strong></td>
                    <td>{m.sessional_1}</td>
                    <td>{m.sessional_2}</td>
                    <td>{m.average}</td>
                    <td>
                      <Badge bg={m.status === "Good" ? "success" : "warning"}>
                        {m.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>

        </Card.Body>
      </Card>
    </div>
  );
};

export default Marks;