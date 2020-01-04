import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { getDetailPlayerScores } from "../../api/django";
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
    playerTrends: {},
    top3players: [],
    bestTrendingPlayerScore: 0
  };

  componentDidMount() {
    this.getAllPlayerTrends();
  }

  sortPlayerTrends = () => {
    let trends = this.state.playerTrends;
    let names = Object.keys(trends);
    let top3Names = names.sort((a, b) => trends[b] - trends[a]).slice(0, 3);
    this.setState({ top3players: top3Names });
  };

  getAllPlayerTrends = () => {
    var currentMaxAvg = Number.MIN_SAFE_INTEGER;
    this.state.names.forEach(name =>
      getDetailPlayerScores(name).then(data => {
        let to2dp = num => {
          return Math.round(num * 100) / 100;
        };
        var lastFiveScores = data["sessions"]
          .slice(-5)
          .map(session => Number(session["result"]));
        var cumulativeSum = (sum => value => (sum += value))(0);
        var cumulativeScores = lastFiveScores.map(cumulativeSum);
        var recentAvg = to2dp(cumulativeScores[4] / 5);
        this.setState(
          prevState => ({
            playerTrends: { ...prevState.playerTrends, [name]: recentAvg }
          }),
          () => this.sortPlayerTrends()
        );
        if (recentAvg > currentMaxAvg) {
          currentMaxAvg = recentAvg;
          this.setState({
            bestTrendingPlayerScore: recentAvg,
            bestTrendingPlayer: name
          });
        }
      })
    );
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
        <CardTitle style={{ textAlign: "center", fontSize: "1.5em" }}>
          Running Hot (over last 5 games)
        </CardTitle>
        <CardBody>
          {this.state.top3players.map((player, index) => (
            <Row style={{ textAlign: "center" }}>
              <Col sm="4">{index+1  + ") "}</Col>
              <Col sm="4">{player}</Col>
              <Col sm="4">
                <p>{this.state.playerTrends[player] + " per session"}</p>
              </Col>{" "}
            </Row>
          ))}
        </CardBody>
      </Card>
    );
  }
}

export default RunningHotCard;
