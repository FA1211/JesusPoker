import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { ButtonDropdown, Card, CardBody, CardTitle, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { getDetailPlayerScores } from "../../api/django.jsx";
import Chart from "./charts";

class BestPlayerLine extends Component {
  state = {
    bestPlayer: {},
    labels: [],
    values: [],
    shouldHide: true,
    dropdownOpen: false,
    dropdownTitle: "",
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
    selectedPlayer: "JT"
  };

  getBestPlayer = () => {
    getDetailPlayerScores(this.state.selectedPlayer).then(data => {
      let to2dp = num => {
        return Math.round(num * 100) / 100;
      };
      let options = { month: "short", day: "numeric" };
      let bestPlayerName = data["name"];
      let sessions = data["sessions"];
      const cumulativeSum = (sum => value => (sum += value))(0);

      let scores = sessions
        .map(sess => Number(sess["result"]))
        .map(cumulativeSum)
        .map(num => to2dp(num))
        .filter((_elem, index) => index % 2 === 0);
      let ticks = sessions
        .map(sess =>
          new Date(sess["session"]).toLocaleDateString("en-GB", options)
        )
        .filter((_elem, index) => index % 2 === 0); //.slice(-10);
      this.setState({
        bestPlayer: bestPlayerName,
        dropdownTitle: bestPlayerName,
        labels: ticks,
        values: scores,
        shouldHide: false
      });
    });
  };


  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  changeValue = (e) => {
    this.setState({ selectedPlayer: e.target.textContent },this.getBestPlayer);
  }

  componentDidMount() {
    this.getBestPlayer()
  }

  render() {
    return (
      <Card
        className="pb-2 mt-0 border-0"
        body
        inverse
        style={{
          paddingBottom: 0,
          backgroundColor: "#27293D",
          borderColor: "#333"
        }}
      >
        <CardBody className="p-0">
          <CardTitle>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle caret>
                {this.state.selectedPlayer}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.names.map(name => {
                  return (
                    <DropdownItem key={name} id={name} onClick={this.changeValue}>{name}</DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </CardTitle>
          <Line
            style={{ padding: 0 }}
            height={null}
            width={null}
            data={
              Chart.chartExample1(this.state.labels, this.state.values).data1
            }
            options={Chart.chartExample1().options}
          ></Line>
        </CardBody>
      </Card>
    );
  }
}

export default BestPlayerLine;
