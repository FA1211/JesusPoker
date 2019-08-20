import { Col, Container, Row } from 'reactstrap';
import ChartWindow from './poker-chart';
import React, { Component } from 'react';
import BestPlayerLine from './BestPlayerLine'
import { bgColor } from './styles.jsx'  


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