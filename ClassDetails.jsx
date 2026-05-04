import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table, Badge } from "react-bootstrap";

const ClassDetails = () => {
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    const [name, sec] = id.split("-");
    setClassName(name);
    setSection(sec);

    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const att = JSON.parse(localStorage.getItem("attendance")) || {};

    setStudents(
      allStudents.filter(
        (s) => s.class === name && s.section === sec
      )
    );

    setAttendance(att);
  }, [id]);

  // Attendance %
  const getPercentage = (roll) => {
    let present = 0;
    let total = 0;

    Object.values(attendance).forEach((day) => {
      if (day[roll] !== undefined) {
        total++;
        if (day[roll] === "Present") present++;
      }
    });

    return total ? ((present / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="container mt-5 pt-4">

      <h4>📘 {className} - Section {section}</h4>

      <Card className="mt-3">
        <Card.Body>

          <h5>👨‍🎓 Students</h5>

          <Table>
            <thead>
              <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.roll}</td>
                  <td>{s.name}</td>
                  <td>
                    <Badge bg="info">
                      {getPercentage(s.roll)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>

        </Card.Body>
      </Card>

    </div>
  );
};

export default ClassDetails;