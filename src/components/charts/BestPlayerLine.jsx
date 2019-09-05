import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import {getBestPlayerScores} from "../../api/django.jsx"
import Chart from './charts';


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
      let to2dp = num => {return Math.round(num*100)/100}
      let options = {month: 'short', day: 'numeric' };
      let bestPlayerName = data["name"];
      let sessions = data["sessions"];
      const cumulativeSum = (sum => value => sum += value)(0);

      let scores = sessions.map(sess => Number(sess["result"])).map(cumulativeSum).map(num => to2dp(num))//.slice(-10);
      let ticks = sessions.map(sess => (new Date(sess["session"]).toLocaleDateString('en-GB',options)))//.slice(-10);
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
      <Card classname="card-chart pt-0 mt-0" body inverse style={{backgroundColor: '#27293D', borderColor: '#333' }}>
        <CardBody className="p-0">
          <CardTitle>{title}</CardTitle>
          <Line style={{padding:0}}
          height={null} width={null} 
          data={Chart.chartExample1(this.state.labels,this.state.values).data1}
          options={Chart.chartExample1().options}></Line>
        </CardBody>
      </Card>
    );
  }
}

export default BestPlayerLine;
