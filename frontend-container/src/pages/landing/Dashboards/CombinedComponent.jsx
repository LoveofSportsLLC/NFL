import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Dashboards from "./Dashboards";
import TeamSelectorAndDesignOptions from "./TeamSelectorAndDesignOptions";

const CombinedComponent = () => {
  return (
    <Container className="py-5">
      <Card
        className="p-4"
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "10px",
        }}
      >
        <Row className="mb-4">
          <Col md="12">
            <Dashboards />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TeamSelectorAndDesignOptions />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CombinedComponent;
