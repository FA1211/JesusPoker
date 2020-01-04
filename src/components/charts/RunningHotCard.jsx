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
    bestTrendingPlayerScore: 0,
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
          var cumulativeScores = lastFiveScores.map(cumulativeSum)
          var recentAvg = to2dp(cumulativeScores[4]/5)

          if (recentAvg > currentMaxAvg) {
            currentMaxAvg=recentAvg
            this.setState({bestTrendingPlayerScore:recentAvg, bestTrendingPlayer:name})
          }
        }).then(() => console.log(this.state)))
  };

  render() {
    return (
      <Card
        body
        inverse
        style={{
          paddingBottom: 0,
          backgroundImage: "linear-gradient(to bottom right, red, #27293D 20%)",
          borderColor: "#333"
        }}
      >
        <CardTitle style={{ textAlign: "center", fontSize:"1.5em" }}>Running Hot (over last 5 games)</CardTitle>
        <CardBody>
          <Row style={{textAlign:"center"}}>
            <Col
              style={{ fontSize: "1.5em" }}
              sm="6"
              md={{ size: "3", offset: "1" }}
            >
              {this.state.bestTrendingPlayer}
            </Col>
            <Col
              sm="6"
              md={{ size: "4", offset: "4" }}
            >
              <p>{this.state.bestTrendingPlayerScore + " per session (last 5)"}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default RunningHotCard;
