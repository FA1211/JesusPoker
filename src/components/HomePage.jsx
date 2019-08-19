import { Col, Container, Row } from 'reactstrap';
import NavigationBar from './navbar';
import ChartWindow from './poker-chart';
import React, { Component } from 'react';
import BestPlayerLine from './BestPlayerLine'
const bgStyle = {
    display: "flex",
    flexDirection : "column",
    backgroundColor: "#17223b",
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
  
  }

const bgColor = { backgroundColor:"#081B33"}

class HomePage extends Component {
    state = {  }
    render() { 
        return (
        <div style = {bgColor} >
        <Container fluid>
          <Row className="mt-2 mb-2">
              <Col xs ="12" md="6">
                <BestPlayerLine title="Current Leader">
                </BestPlayerLine>
              </Col>

              <Col xs ="12" md="6">
                <ChartWindow  title={"Overall Scores"}/>
              </Col>

          </Row>
        </Container>
        </div>
          );
    }
}
 
export default HomePage;