import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { getDetailPlayerScores } from '../../api/django';
class RunningColdCard extends Component {
  state = { name: "Fadle" };

  componentDidMount() {
    let names =[
      "George",
      "Philip",
      "Nick T",
      "Conall",
      "Josh",
      "Joao",
      "Harry R",
      "JT",
      "Jacob",
      "Kyle",
      "Fadle"]
    };

  render() {
    return (
      <Card
        body
        inverse
        style={{
          paddingBottom: 0,
          background: "linear-gradient( rgba(39,41,61,1) 0%, rgba(39,41,61,0.5) 35%, rgba(39,41,61,0.1) 100%)",
          borderColor: "#333"
        }}
      >
        <CardTitle style={{ textAlign: "center" }}>Running Cold</CardTitle>
        <CardBody>
          <Row>
            <Col style={{fontSize:"1.5em"}} sm="6" md={{size:"3",offset:"1"}}>
                {this.state.name}
            </Col>
            <Col style={{color:"blue"}} sm="6" md={{size:"4",offset:"4"}}>
                <h1>£12</h1>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
export default RunningColdCard;
