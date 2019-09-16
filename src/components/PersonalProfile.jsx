import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardGroup, Col, Container, Row, Table } from 'reactstrap';
import { bgColor } from "./styles.jsx";
import { getDetailPlayerScores } from '../api/django.jsx';
import * as moment from "moment";

class PersonalProfile extends Component {

    state = {
        sessions:[],
        biggestWin:0,
        biggestLoss:0,
        avgWin:0,
        gamesWon:0,
        gamesLost:0,
        name:""   }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)
        const name = params.get('name')
        getDetailPlayerScores(name)
        .then(responseJSON => {
            let _sessions=responseJSON['sessions']
            let results = _sessions.map(session => parseFloat(session['result']))
            let _name = responseJSON['name']
            let maxWin = results.reduce((a,b) => a>b?a:b)
            let maxLoss = results.reduce((a,b) => a<b?a:b)
            let _avgWin = results.reduce((a,b) => a+b/results.length,0).toFixed(2)
            let _gamesWon = results.reduce((a,b) => b>= 0? a+1:a, 0)
            let _gamesLost = results.reduce((a,b) => b<0 ? a+1:a,0)
            this.setState({
                sessions:_sessions,
                name:_name,
                biggestLoss:maxLoss,
                biggestWin:maxWin,
                avgWin:_avgWin,
                gamesWon:_gamesWon,
                gamesLost:_gamesLost
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const params = new URLSearchParams(this.props.location.search)
        const newName = params.get('name')
        if(prevState['name']===newName){
            return
        }
        getDetailPlayerScores(newName)
        .then(responseJSON => {
            let _sessions = responseJSON['sessions']
            let results = _sessions.map(session => parseFloat(session['result']))
            let maxWin = results.reduce((a,b) => a>b?a:b)
            let maxLoss = results.reduce((a,b) => a<b?a:b)
            let _avgWin = results.reduce((a,b) => a+b/results.length,0).toFixed(2)
            let _gamesWon = results.reduce((a,b) => b>0? a+1:a, 0)
            let _gamesLost = results.reduce((a,b) => b<0 ? a+1:a,0)
            console.log(_sessions)
            this.setState({
                sessions:_sessions,
                name:newName,
                biggestLoss:maxLoss,
                biggestWin:maxWin,
                avgWin:_avgWin,
                gamesWon:_gamesWon,
                gamesLost:_gamesLost
            })
        })
    }

    render() {
        return <Container fluid styles={bgColor}>
            <Row xs={12}>
                <Col xs={12}>
            <CardGroup>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#9B72A3",
                        }}
                    >
                        <CardHeader style={{fontSize:24}}>
                            Biggest Win
                        </CardHeader>
                        <CardBody style={{fontSize:20,fontFamily:"monospace"}}>
                            {this.state.biggestWin}
                        </CardBody>
                    </Card>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#9B72A3",
                        }}
                        >
                        <CardHeader style={{fontSize:24}}>
                            Average Return
                        </CardHeader>
                        <CardBody style={{fontSize:20,fontFamily:"monospace"}}>
                            {this.state.avgWin}
                        </CardBody>
                    </Card>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#9B72A3"
                        }}
                    >
                        <CardHeader style={{fontSize:24}}>
                            Biggest Loss
                        </CardHeader>
                        <CardBody style={{fontSize:20,fontFamily:"monospace"}}>
                            {this.state.biggestLoss}
                        </CardBody>
                    </Card>
                </CardGroup>
                </Col>
            </Row>

            <Row xs={12}>
                <Col xs={12} md={6}>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#605680",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader style={{fontSize:24}}>
                            Games Won
                        </CardHeader>
                        <CardBody style={{fontSize:20,fontFamily:"monospace"}}>
                            {this.state.gamesWon}
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#605680",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader style={{fontSize:24}}>
                            Games Lost
                    </CardHeader>
                        <CardBody style={{fontSize:20,fontFamily:"monospace"}}>
                            {this.state.gamesLost}
                    </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                <Card className="mt-5 pb-0" style={{backgroundColor:"#343A40"}}>
            <Table dark responsive >
        <thead>
          <tr>
            <th>Date</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
            {this.state.sessions.reverse().map(session => <tr>
                <th scope="row">{moment(session["session"]).format("Do MMM YY")}</th>
                <td>{session['result']}</td>
            </tr>)}
        </tbody>
      </Table>
      </Card>
      </Col>
            </Row>


        </Container>
    }
}

export default PersonalProfile;