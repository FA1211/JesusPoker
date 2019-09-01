import React, { Component } from "react";
import { Button, Card, Col, Collapse, Container, Table } from "reactstrap";
import * as moment from "moment";

class SessionTable extends Component {
  state = {
    sessionData: [],
    dates: {},
    players: {},
    collapse: []
  };


  toggle = id => {
    let isToggled = this.state.collapse.indexOf(id);
    let newCollapsed = [...this.state.collapse];

    if (isToggled < 0) {
      newCollapsed.push(id);
    } else {
      newCollapsed.splice(isToggled, 1);
    }
    this.setState({ collapse: newCollapsed });
  };


  checkOpen = id => {
    return this.state.collapse.indexOf(id) > -1;
  };

  componentDidMount = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/sessions?ordering=-date")
      .then(response => response.json())
      .then(data => {
        this.setState({ sessionData: data })
        })
    }

  render() {
    return (
      <Container className="mt-3">
        {this.state.sessionData.map((session, index) => {
          return (
            <Col sm={12}>
              <Button
                style={{ borderColor: "#f7f0c7" }}
                className=" mt-0 mb-0 col-12"
                color="primary"
                onClick={() => this.toggle(index)}
              >
                {moment(session["date"], "YYYY-MM-DD").format("Do MMMM YY")}
              </Button>

              <Collapse id={2} isOpen={this.checkOpen(index)}>
                  <Card>
                      <Button>
                          Added by {session['creator']}
                      </Button>
                  </Card>
                <Card
                  body
                  style={{ backgroundColor: "#5d84a9", borderColor: "#f7f0c7" }}
                >
                  <Table borderless striped>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      {session["results"].map(rslt => {
                        return (
                          <tr>
                            <th scope="row">{rslt["player"]}</th>
                            <td>{rslt["result"]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </Collapse>
            </Col>
          );
        })}
      </Container>
    );
  }
}

export default SessionTable;
