import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardBody, CardTitle} from 'reactstrap';
import {spreadsheetURL} from './config';

const options ={
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
           beginAtZero:true
         },
         scaleLabel: {
            display: true,
            labelString: 'winnings'
          },
       }],
       xAxes:[{

       }]
      },
  }


class BestPlayerLine extends Component {
    
    state = { 
        title: this.props.title,
        bestPlayer: {},
        data: {},
        shouldHide: true
      }
     

     getChartData = () => {
        return fetch(spreadsheetURL).then(response => response.json()).then(
            data => {
            let allRows = data.valueRanges[0].values;
            let otherRows = allRows.slice(1)
            let players = otherRows.map(row => [row[0]].concat([row.slice(1)]));
            let totalScores = players.map(pl => pl[1].reduce((a,b) => Number(a)+Number(b)))

            let bestPlayerIndex = totalScores.indexOf(Math.max(...totalScores))
            let bestPlayer = players[bestPlayerIndex]
            let bestPlayerName = bestPlayer[0]
            let bestPlayerScores = bestPlayer[1].map(sc => Number(sc))
            this.setState({ 
                bestPlayer: bestPlayerName,
                shouldHide: !this.state.shouldHide, 
                data :
                {
                    labels : [1,2,3,4,5,6,7,8,9,10],
                    datasets: [{
                    label: bestPlayerName,
                    data: bestPlayerScores,
                }]}
            })

        })
       }

       componentDidMount() {
           this.getChartData()
       }


    render() { 
        const title = this.state.shouldHide ? " " : this.state.title + " is " + this.state.bestPlayer
        console.log("titleBool", this.state.shouldHide)
        return ( 

            <Card body inverse color="dark" className="mt-0">
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                <Line options={options} data = {this.state.data}>
                </Line>
                </CardBody>
            </Card>
        );
    }
  }

export default BestPlayerLine;