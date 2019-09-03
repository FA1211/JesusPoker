import { Col, Container, Row, Card, CardTitle } from "reactstrap";
import React, { Component } from "react";
import BestPlayerLine from "./charts/BestPlayerLine";
import BarChart from "./charts/BarChart";
import { bgColor } from "./styles.jsx";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <Container fluid  style={bgColor} >
          <Row xs={12} className="mt-2 mb-2">
            <Col xs={12} md="12">
              <BestPlayerLine title="Current Leader"></BestPlayerLine>
            </Col>
          </Row>
          <Row xs={12} className="mt-2 mb-2">
            <Col xs={4}>
              <BarChart/>
            </Col>
            <Col xs={4}>
              <BarChart/>
            </Col>
            <Col xs={4}>
              <BarChart/>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default HomePage;
