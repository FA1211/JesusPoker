import { Col, Container, Row, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import React, { Component } from "react";
import BestPlayerLine from "./charts/BestPlayerLine";
import BarChart from "./charts/BarChart";
import { bgColor } from "./styles.jsx";
import Chart from "./charts/charts.jsx";
import {Line} from 'react-chartjs-2'
import "../styles.scss"

class HomePage extends Component {
  state = {};
  render() {
    return (
      <Container fluid  style={bgColor} >
          <Row xs={12} className="mt-2 mb-2">
            <Col xs={12} md="12">
            <Card classname="card-chart" body inverse style={{ backgroundColor: '#27293D', borderColor: '#333' }}>
            <CardHeader>
                      <CardTitle tag="h6">Monthly Top Score</CardTitle>
            </CardHeader>
            <CardBody className="pt-1 pl-0 pr-0 pb-0">
            <Line height={null}
                  width={null}
                  data={Chart.chartExample1([],[]).data1}
                  options={Chart.chartExample1().options}
                    />
            </CardBody>
                    </Card>
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
