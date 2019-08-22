import { Col, Container, Row } from 'reactstrap';
<<<<<<< HEAD
import ChartWindow from './poker-chart';
import React, { Component } from 'react';
import BestPlayerLine from './BestPlayerLine'
=======
import ChartWindow from './ChartWindow';
import React, { Component } from 'react';
import BestPlayerLine from './BestPlayerLine'
import { bgColor } from './styles.jsx'  
>>>>>>> 7ef6b1d810f2ba5e1a620bf2ea0fc83b77d69a09


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