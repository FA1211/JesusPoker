import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { getDetailPlayerScores } from '../../api/django';
class RunningHotCard extends Component {
  state = {
    names: [
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
      "Fadle"
    ],
    bestTrendingPlayer: "",
    bestTrendingPlaerScore: 0,
  };

  componentDidMount() {
    this.getAllPlayerTrends()
  }

  getAllPlayerTrends = () => {
    var currentMaxAvg = Number.MIN_SAFE_INTEGER
    this.state.names.forEach(name =>
      getDetailPlayerScores(name)
      .then(data =>
        {
          let to2dp = num => {
            return Math.round(num * 100) / 100;
          };
          var lastFiveScores = data['sessions'].slice(-5).map(session => Number(session['result']));
          const cumulativeSum = (sum => value => (sum += value))(0);
          var cumulativeScores = lastFiveScores.map(cumulativeSum).map(score => to2dp(score))
          // console.log(lastFiveScores)
          // console.log(cumulativeScores[4])
          var recentAvg = cumulativeScores[4]
          console.log(name + " : " + recentAvg)
          if (recentAvg > currentMaxAvg) {
            currentMaxAvg = recentAvg
          }
          console.log("current max " + currentMaxAvg + ", Recent avg " + recentAvg)
        }))
  };

  render() {
    return (
      <Card
        body
        inverse
        style={{
          paddingBottom: 0,
          background: "#27293D",
          borderColor: "#333"
        }}
      >
        <CardTitle style={{ textAlign: "center" }}>Running Hot</CardTitle>
        <CardBody>
          <Row>
            <Col
              style={{ fontSize: "1.5em" }}
              sm="6"
              md={{ size: "3", offset: "1" }}
            >
              {this.state.bestTrendingPlayer}
            </Col>
            <Col
              style={{ color: "red" }}
              sm="6"
              md={{ size: "4", offset: "4" }}
            >
              <h1>{this.state.bestTrendingPlayerScore}</h1>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default RunningHotCard;
