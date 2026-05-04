import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = ["09:00-10:00","10:00-11:00","11:30-12:30","01:00-02:00"];

const subjectColors = {
  AI: "#d1e7dd",
  DBMS: "#cff4fc",
  OS: "#f8d7da",
  CN: "#fff3cd",
};

const Timetable = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [timetable, setTimetable] = useState({});

  const [show, setShow] = useState(false);
  const [currentCell, setCurrentCell] = useState({ day: "", time: "" });

  const [entry, setEntry] = useState({
    subject: "",
    teacher: "",
    room: "",
  });

  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    setTeachers(JSON.parse(localStorage.getItem("teachers")) || []);
    setTimetable(JSON.parse(localStorage.getItem("timetable")) || {});
  }, []);

  // Open (add/edit)
  const openModal = (day, time) => {
    const key = `${selectedClass}-${day}-${time}`;
    const existing = timetable[key];

    setCurrentCell({ day, time });
    setEntry(existing || { subject: "", teacher: "", room: "" });
    setShow(true);
  };

  // Save
  const saveEntry = () => {
    const key = `${selectedClass}-${currentCell.day}-${currentCell.time}`;
    const updated = { ...timetable };

    updated[key] = entry;

    setTimetable(updated);
    localStorage.setItem("timetable", JSON.stringify(updated));
    setShow(false);
  };

  // Delete (right click)
  const handleRightClick = (e, day, time) => {
    e.preventDefault();

    const key = `${selectedClass}-${day}-${time}`;
    const updated = { ...timetable };

    delete updated[key];

    setTimetable(updated);
    localStorage.setItem("timetable", JSON.stringify(updated));
  };

  return (
    <div className="container py-4 mt-5 pt-4"
    style={{width : "1000px"}}>

      <Card className="shadow-lg border-0 rounded-4 p-3">
        <h4 className="mb-4">📅 Timetable Manager</h4>

        <Form.Select
          className="mb-4"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((c, i) => (
            <option key={i}>{c.name}-{c.section}</option>
          ))}
        </Form.Select>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">

            <thead className="table-dark">
              <tr>
                <th>Time</th>
                {days.map((d) => <th key={d}>{d}</th>)}
              </tr>
            </thead>

            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td className="fw-bold">{time}</td>

                  {days.map((day) => {
                    const key = `${selectedClass}-${day}-${time}`;
                    const data = timetable[key];

                    return (
                      <td
                        key={day}
                        onClick={() => openModal(day, time)}
                        onContextMenu={(e) => handleRightClick(e, day, time)}
                        style={{
                          cursor: "pointer",
                          height: "90px",
                          transition: "0.2s",
                          backgroundColor: data
                            ? subjectColors[data.subject] || "#f8f9fa"
                            : "",
                        }}
                        className="hover-cell"
                      >
                        {data ? (
                          <>
                            <strong>{data.subject}</strong><br />
                            <small>{data.teacher}</small><br />
                            <small>{data.room}</small>
                          </>
                        ) : (
                          <span className="text-muted">+</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </Card>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Edit Lecture</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={entry.subject}
                onChange={(e) =>
                  setEntry({ ...entry, subject: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teacher</Form.Label>
              <Form.Select
                value={entry.teacher}
                onChange={(e) =>
                  setEntry({ ...entry, teacher: e.target.value })
                }
              >
                <option value="">Select</option>
                {teachers.map((t, i) => (
                  <option key={i}>{t.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Room</Form.Label>
              <Form.Control
                value={entry.room}
                onChange={(e) =>
                  setEntry({ ...entry, room: e.target.value })
                }
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hover Effect */}
      <style>{`
        .hover-cell:hover {
          transform: scale(1.03);
          background-color: #eef3ff !important;
        }
      `}</style>

    </div>
  );
};

export default Timetable;