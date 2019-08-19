import { Col, Container, Row } from 'reactstrap';
import NavigationBar from './components/navbar';
import ChartWindow from './components/poker-chart';
import React, { Component } from 'react';
import BestPlayerLine from './components/BestPlayerLine'
const bgStyle = {
    display: "flex",
    flexDirection : "column",
    backgroundColor: "#17223b",
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
  
  }

class HomePage extends Component {
    state = {  }
    render() { 
        return (
        <div style ={bgStyle} className="App">
        <NavigationBar>
        </NavigationBar>
        <div  style = {{ backgroundColor:"#081B33"}}>
        <Container fluid>

          <Row className="mt-4">
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
    </div>
          );
    }
}
 
export default HomePage;