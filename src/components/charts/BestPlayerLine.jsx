import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import {getBestPlayerScores} from "../../api/django.jsx"
import Chart from './charts'

class BestPlayerLine extends Component {
  state = {
    bestPlayer: {},
    labels: [],
    values:[],
    shouldHide: true
  };

  getBestPlayer = () => {
    getBestPlayerScores().then(data => {
      console.log(data)
      let bestPlayerName = data["name"];
      let sessions = data["sessions"];
      let scores = sessions.map(sess => sess["result"]).slice(0, 10);
      let ticks = [...Array(scores.length).keys()];
      console.log(ticks)
      this.setState({
        bestPlayer: bestPlayerName,
        labels: ticks,
        values: scores,
      shouldHide:false});
    })
  }


  componentDidMount() {
    this.getBestPlayer();
  }

  render() {
    const title = this.state.shouldHide
      ? null : "Best Player is " + this.state.bestPlayer;
    return (
      <Card classname="card-chart" body inverse style={{ backgroundColor: '#27293D', borderColor: '#333' }}>
        <CardBody className="p-0">
          <CardTitle>{title}</CardTitle>
          <Line 
          height={null} width={null} 
          data={Chart.chartExample1(this.state.labels,this.state.values).data1}
          options={Chart.chartExample1().options}></Line>
        </CardBody>
      </Card>
    );
  }
}

export default BestPlayerLine;
