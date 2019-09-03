import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllPlayerScores } from "../../api/django";
import Chart from "./charts"

const colorScheme = [
  "#182952",
  "#2b3595",
  "#7045af",
  "#e14594",
];

class BarChart extends Component {
  state = {
    title: this.props.title,
    labels:[],
    values:[],
    header: "gssafkldasjfk"
  };

  randomArrElement = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  getAllScores = () => {
    return getAllPlayerScores().then(data => {
        let players = data.map(obj => obj["name"]);
        let scores = data.map(obj => obj["total_score"]);

        let colors = scores.map(() => this.randomArrElement(colorScheme));
        this.setState({
            labels: players,
            values: scores,
        });
      });
  };

  componentDidMount() {
    this.getAllScores();
  }

  render() {
    //console.log(Chart.updatePlayerScores())
    return (
      <Card body inverse style={{ backgroundColor: '#27293D', borderColor: '#333' }} >
        <CardBody className="pt-1 pl-0 pr-0 pb-0">
          <CardTitle>All Scores</CardTitle>
          <HorizontalBar  width={null} height={null}
            options={{
              legend: { display: false },
              title: { text: "hello" }
            }}
            data={Chart.chartExample3(this.state.labels, this.state.values).data}
            options={Chart.chartExample3().options}
          />
        </CardBody>
      </Card>
    );
  }
}

export default BarChart;
