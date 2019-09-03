import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllPlayerScores } from "../../api/django";

const colorScheme = [
  "#000272",
  "#341677",
  "#a32f80",
  "#ff6363",
];

class BarChart extends Component {
  state = {
    title: this.props.title,
    data: {},
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
          data: {
            labels: players,
            datasets: [
              {
                label: "My First dataset",
                data: scores,
                backgroundColor: colors
              }
            ]
          }
        });
      });
  };

  componentDidMount() {
    this.getAllScores();
  }

  render() {
    return (
      <Card body inverse color="dark" >
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
          <Bar
            options={{
              legend: { display: false },
              title: { text: "hello" }
            }}
            data={this.state.data}
          />
        </CardBody>
      </Card>
    );
  }
}

export default BarChart;
