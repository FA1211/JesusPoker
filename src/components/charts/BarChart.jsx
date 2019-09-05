import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllPlayerScores } from "../../api/django";
import Chart from "./charts";


class BarChart extends Component {
  state = {
    labels:[],
    values:[],
  };

  componentDidMount() {
    getAllPlayerScores().then(data => {
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
        "Fadle",]
      let players = data.map(obj => obj["name"]).filter(name => names.includes(name) );
      let scores = data.map(obj => obj["total_score"]);
      this.setState({
          labels: players,
          values: scores,
      });
    });
  }

  render() {
    return (
      <Card body inverse style={{ backgroundColor: '#27293D', borderColor: '#333' }} >
        <CardBody className="pt-1 pl-0 pr-0 pb-0">
          <CardTitle>All Scores</CardTitle>
          <HorizontalBar
            width={null}
            height={null}
            data={Chart.chartExample3(this.state.labels, this.state.values).data}
            options={Chart.chartExample3().options}
          />
        </CardBody>
      </Card>
    );
  }
}

export default BarChart;
