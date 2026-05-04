
import React from "react";
import { Card, Table, Badge, Button, Row, Col } from "react-bootstrap";

const feesData = [
  { sem: "Sem 1", amount: 45000, status: "Paid" },
  { sem: "Sem 2", amount: 45000, status: "Paid" },
  { sem: "Sem 3", amount: 48000, status: "Pending" },
];

const Fees = () => {
  const total = feesData.reduce((sum, f) => sum + f.amount, 0);
  const paid = feesData
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);
  const pending = total - paid;

  return (
    <div className="px-2 px-md-4" 
      style={{
        marginTop: "80px", // 👈 navbar ke niche space (adjust kar sakta hai)
        width: "1000px",
      }}>
      <Card className="shadow-lg border-0 w-100" style={{ borderRadius: "18px" }}>
        <Card.Body className="p-3 p-md-4">

          {/* Header */}
          <h4 className="fw-bold mb-4">💰 Fees Details</h4>

          {/* Summary Cards */}
          <Row className="mb-4">
            <Col md={4} xs={12} className="mb-2">
              <Card className="shadow-sm border-0 text-center p-3">
                <h6>Total Fees</h6>
                <h5>₹{total.toLocaleString()}</h5>
              </Card>
            </Col>

            <Col md={4} xs={12} className="mb-2">
              <Card className="shadow-sm border-0 text-center p-3">
                <h6>Paid</h6>
                <h5 className="text-success">₹{paid.toLocaleString()}</h5>
              </Card>
            </Col>

            <Col md={4} xs={12} className="mb-2">
              <Card className="shadow-sm border-0 text-center p-3">
                <h6>Pending</h6>
                <h5 className="text-danger">₹{pending.toLocaleString()}</h5>
              </Card>
            </Col>
          </Row>

          {/* Table */}
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Semester</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {feesData.map((f, index) => (
                  <tr key={index}>
                    <td>{f.sem}</td>
                    <td>₹{f.amount.toLocaleString()}</td>
                    <td>
                      {f.status === "Paid" ? (
                        <Badge bg="success">Paid</Badge>
                      ) : (
                        <Badge bg="warning">Pending</Badge>
                      )}
                    </td>
                    <td>
                      {f.status === "Pending" && (
                        <Button size="sm" variant="primary">
                          Pay Now
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default Fees;