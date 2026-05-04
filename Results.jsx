import React, { useState } from "react";
import { Card, Table, Badge, Nav } from "react-bootstrap";

const resultsData = {
  "Sem 3": [
    { subject: "AI & ML", internal: 28, external: 60, credits: 4 },
    { subject: "DBMS", internal: 25, external: 55, credits: 3 },
  ],
  "Sem 4": [
    { subject: "Operating Systems", internal: 27, external: 65, credits: 4 },
    { subject: "Computer Networks", internal: 26, external: 58, credits: 3 },
  ],
};

// Grade logic
const getGrade = (total) => {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B+";
  return "B";
};

const getPoint = (grade) => {
  const map = { "A+": 10, A: 9, "B+": 8, B: 7 };
  return map[grade] || 0;
};

const getBadgeColor = (grade) => {
  if (grade === "A+" || grade === "A") return "success";
  if (grade === "B+") return "info";
  return "secondary";
};

const Results = () => {
  const [sem, setSem] = useState("Sem 3");

  const subjects = resultsData[sem];

  let totalCredits = 0;
  let totalPoints = 0;

  return (
    <div className="px-2 px-md-4" 
      style={{
        marginTop: "80px", // 👈 navbar ke niche space (adjust kar sakta hai)
        width: "1000px",
      }}>
      <Card className="shadow-lg border-0 w-100" style={{ borderRadius: "18px" }}>
        <Card.Body>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>📈 Exam Results</h4>
            <Badge bg="primary">{sem}</Badge>
          </div>

          {/* Tabs */}
          <Nav variant="pills" className="mb-3">
            {Object.keys(resultsData).map((s) => (
              <Nav.Item key={s}>
                <Nav.Link
                  active={sem === s}
                  onClick={() => setSem(s)}
                  style={{ cursor: "pointer" }}
                >
                  {s}
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
                  <th>Internal</th>
                  <th>External</th>
                  <th>Total</th>
                  <th>Grade</th>
                  <th>Credits</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((s, index) => {
                  const total = s.internal + s.external;
                  const grade = getGrade(total);

                  totalCredits += s.credits;
                  totalPoints += getPoint(grade) * s.credits;

                  return (
                    <tr key={index}>
                      <td><strong>{s.subject}</strong></td>
                      <td>{s.internal}</td>
                      <td>{s.external}</td>
                      <td>{total}</td>
                      <td>
                        <Badge bg={getBadgeColor(grade)}>
                          {grade}
                        </Badge>
                      </td>
                      <td>{s.credits}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* SGPA */}
          <div className="text-end mt-3">
            <h6>
              SGPA:{" "}
              <span className="text-primary">
                {(totalPoints / totalCredits).toFixed(2)}
              </span>
            </h6>
          </div>

        </Card.Body>
      </Card>

      {/* Hover effect */}
      <style>{`
        tr:hover {
          transform: scale(1.01);
          transition: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Results;