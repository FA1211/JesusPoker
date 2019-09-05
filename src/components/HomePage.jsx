import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles.scss";
import BarChart from "./charts/BarChart";
import BestPlayerLine from "./charts/BestPlayerLine";
import { bgColor } from "./styles.jsx";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <Container fluid  style={bgColor} >
          <Row xs={12} className="mt-2 mb-2">
            <Col xs={12} md="12">
            <BestPlayerLine className="p-0 m-0"/>
            </Col>
          </Row>
          <Row xs={12} className="mt-2 mb-2">
            <Col xs={12} md={4} >
              <BarChart />
            </Col>
            <Col xs={12} md={4}>
              <BarChart/>
            </Col>
            <Col xs={12} md={4}>
              <BarChart/>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default HomePage;
