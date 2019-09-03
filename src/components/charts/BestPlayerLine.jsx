import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import {getBestPlayerScores} from "../../api/django.jsx"

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "winnings"
        }
      }
    ],
    xAxes: [{display:false}],
  },
  aspectRatio:5
};

class BestPlayerLine extends Component {
  state = {
    title: this.props.title,
    bestPlayer: {},
    data: {},
    shouldHide: true
  };

  getBestPlayer = () => {
    getBestPlayerScores().then(data => {
      let bestPlayerName = data["name"];
      let sessions = data["sessions"];
      let scores = sessions.map(sess => sess["result"]).slice(0, 10);
      let ticks = [...Array(scores.length).keys()];
      this.setState({
        bestPlayer: bestPlayerName,
        shouldHide: !this.state.shouldHide,
        data: {
          labels: ticks,
          datasets: [
            {
              label: bestPlayerName,
              data: scores
            }
          ]
        }
      });
    });
      
  };


  componentDidMount() {
    this.getBestPlayer();
  }

  render() {
    const title = this.state.shouldHide
      ? " "
      : this.state.title + " is " + this.state.bestPlayer;
    return (
      <Card body inverse color="dark" className="mt-0">
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Line height={null} width={null} options={options} data={this.state.data}></Line>
        </CardBody>
      </Card>
    );
  }
}

export default BestPlayerLine;
