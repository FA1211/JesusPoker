import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardBody, CardTitle} from 'reactstrap';
import config from './config.js';

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#2F4562',
        pointStrokeColor: '#2F4562',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  }
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
const tableURl = `https://sheets.googleapis.com/v4/spreadsheets/${ config.spreadsheetId }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${ config.API_KEY }`

class BestPlayerLine extends Component {
    
    state = { 
        title: this.props.title,
        bestPlayer: {},
        data: {},
        shouldHide: true
      }
     

     getChartData = () => {
        return fetch(tableURl).then(response => response.json()).then(
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