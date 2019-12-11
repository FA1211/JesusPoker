import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles.scss";
import AllTimeScoresChart from "./charts/AllTimeScoresChart";
import BestPlayerLine from "./charts/BestPlayerLine";
import CurrentTotalScoresChart from "./charts/CurrentTotalScoresChart";
import RunningColdCard from "./charts/RunningHotCard"
import RunningHotCard from "./charts/RunningColdCard"
import { bgColor } from "./styles.jsx";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <Container fluid style={bgColor}>
        <Row xs={12} className="mt-2 mb-2">
          <Col xs={12} md="12">
            <BestPlayerLine className="p-0 m-0" />
          </Col>
        </Row>
        <Row>
          <Col sm="6" md={{size:"4", offset:"1"}}>
            <RunningHotCard />
          </Col>
          <Col sm="6" md={{size:"4", offset:"2"}}>
            <RunningColdCard />
          </Col>
        </Row>
        <Row xs={12} className="mt-2 mb-2">
          <Col xs={12} md={6}>
            <AllTimeScoresChart />
          </Col>
          <Col xs={12} md={6}>
            <CurrentTotalScoresChart />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
