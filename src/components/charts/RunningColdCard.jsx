import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { getDetailPlayerScores, getSessionSum } from '../../api/django';
class RunningColdCard extends Component {
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
    worstTrendingPlayer: "",
    worstTrendingPlayerScore: 0,
    bottom3players:[]
  };

  componentDidMount() {
    this.getAllPlayerTrends()
    getSessionSum().then(data => {
      // console.log(data)
      let totalScore = Number(data.map(sesh => sesh.result).reduce((a,b) => Number.parseFloat(a) + Number.parseFloat(b),0)).toFixed(2);
      console.log(totalScore)
    })
  }

  sortPlayerTrends = () => {
    let trends = this.state.playerTrends;
    let names = Object.keys(trends);
    let bottom3Names = names.sort((a, b) => trends[a] - trends[b]).slice(0, 3);
    this.setState({ bottom3players: bottom3Names });
  };

  getAllPlayerTrends = () => {
    var currentMaxAvg = Number.MAX_SAFE_INTEGER
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
          this.setState(
            prevState => ({
              playerTrends: { ...prevState.playerTrends, [name]: recentAvg }
            }),
            () => this.sortPlayerTrends()
          );

          if (recentAvg < currentMaxAvg) {
            currentMaxAvg=recentAvg
            this.setState({worstTrendingPlayerScore:recentAvg, worstTrendingPlayer:name})
          }
        }))
      }

  render() {
    return (
      <Card
        body
        inverse
        style={{
          paddingBottom: 0,
          backgroundImage: "linear-gradient(to bottom right, #2e7ad9, #27293D 20%)",
          borderColor: "#333"
        }}
      >
        <CardTitle style={{ textAlign: "center", fontSize:"1.5em" }}>Running Cold <br/> (over their last 5 games)</CardTitle>
        <CardBody>
          {this.state.bottom3players.map((player, index) => (
            <Row key={index} style={{ textAlign: "center" }}>
              <Col xs="4">{index+1  + ") "}</Col>
              <Col xs="4">{player}</Col>
              <Col xs="4">
                <p>{this.state.playerTrends[player] + " per session"}</p>
              </Col>{" "}
            </Row>
          ))}
        </CardBody>
      </Card>
    );
  }
}
export default RunningColdCard;
