import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { getBiggestWin } from "../../api/django";

class BiggestWinCard extends Component {
  state = {
    result: 0,
    player: "",
    date: "",
    mounted:false
  };

  componentDidMount = () => {
    getBiggestWin().then(filteredData => {
      let biggestWin = filteredData[0];
      this.setState({
        player: biggestWin["player"],
        result: biggestWin["result"],
        date: biggestWin["session"],
        mounted:true
      });
    });
  };

  render() {
    return (
      <Card
        body
        inverse
        style={{paddingTop:0, paddingLeft:0, paddingRight:0, backgroundColor: "#27293D", borderColor: "#333" }}
      >
        <CardHeader>
          Biggest Win
        </CardHeader>
        <CardBody>
            {!  this.state.mounted? "" : this.state.player + " won " + this.state.result}
        </CardBody>
      </Card>
    );
  }
}

export default BiggestWinCard;
