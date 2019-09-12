import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardGroup, Col, Container, Row } from 'reactstrap';
import { bgColor } from "./styles.jsx";
import { getDetailPlayerScores } from '../api/django.jsx';

class PersonalProfile extends Component {

    state = {
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
            let results = responseJSON['sessions'].map(session => parseFloat(session['result']))
            let _name = responseJSON['name']
            let maxWin = results.reduce((a,b) => a>b?a:b)
            let maxLoss = results.reduce((a,b) => a<b?a:b)
            let _avgWin = results.reduce((a,b) => a+b/results.length,0)
            let _gamesWon = results.reduce((a,b) => b>= 0? a+1:a, 0)
            let _gamesLost = results.reduce((a,b) => b<0 ? a+1:a,0)
            this.setState({
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
            let results = responseJSON['sessions'].map(session => Number(session['result']))
            let maxWin = results.reduce((a,b) => a>b?a:b)
            let maxLoss = results.reduce((a,b) => a<b?a:b)
            let _avgWin = results.reduce((a,b) => a+b/results.length,0)
            let _gamesWon = results.reduce((a,b) => b>0? a+1:a, 0)
            let _gamesLost = results.reduce((a,b) => b<0 ? a+1:a,0)
            this.setState({
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
                            backgroundColor: "#27293D",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader>
                            Biggest Win
                        </CardHeader>
                        <CardBody>
                            {this.state.biggestWin}
                        </CardBody>
                    </Card>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#27293D",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader>
                            Average Return
                        </CardHeader>
                        <CardBody>
                            {this.state.avgWin}
                        </CardBody>
                    </Card>
                    <Card
                        className="text-center"
                        body
                        inverse
                        style={{
                            backgroundColor: "#27293D",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader>
                            Biggest Loss
                        </CardHeader>
                        <CardBody>
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
                            backgroundColor: "#27293D",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader>
                            Games Won
                        </CardHeader>
                        <CardBody>
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
                            backgroundColor: "#27293D",
                            borderColor: "#333"
                        }}
                    >
                        <CardHeader>
                            Games Lost
                    </CardHeader>
                        <CardBody>
                            {this.state.gamesLost}
                    </CardBody>
                    </Card>
                </Col>
            </Row>


        </Container>
    }
}

export default PersonalProfile;