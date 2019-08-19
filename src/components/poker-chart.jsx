import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle } from 'reactstrap';
import config from './config.js';

const tableURl = `https://sheets.googleapis.com/v4/spreadsheets/${ config.spreadsheetId }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${ config.API_KEY }`

class ChartWindow extends Component {
    state = { 
        title: this.props.title,
        data: {},
        header: "gssafkldasjfk"
      }
     

     getChartData = () => {
      return fetch(tableURl).then(response => response.json()).then(
        data => {
        let allRows = data.valueRanges[0].values;
        let headerRow = allRows[0]
        let otherRows = allRows.slice(1)
        let players = allRows.map(row => row[0]).slice(1)
        let scores = otherRows.map(row => [row[0]].concat([row.slice(1)]));
        let totalScores = scores.map(pl => pl[1].reduce((a,b) => parseFloat(a)+parseFloat(b)))
        let colorScheme = ["#081B33BF","#152642BF","#2F4562BF","#767D92BF","#353C51BF"]
        const colors = players.map(pl => colorScheme[Math.floor(Math.random() * colorScheme.length)])
        console.log(totalScores)
        
        this.setState({header: headerRow, data: {
                                              labels:players,
                                              datasets:[{
                                                label: 'My First dataset',
                                                data: totalScores,
                                                backgroundColor: colors,
                                              }],
                                            }
                                            })
                                            }
      )};

       componentDidMount() {
        this.getChartData()
        
       }


    render() { 
        return ( 
            <Card body inverse color="dark" className="mt-0">
                <CardBody>
                    <CardTitle>{this.state.title}</CardTitle>
                <Bar options={{
       legend: {
         display: false
       },
       scales: {
         yAxes: [{
           ticks: {
              beginAtZero:true
            }
          }]
         },
        title: {
         text: "hello"
        }
     }} data = {this.state.data}>
                </Bar>
                </CardBody>
            </Card>
        );
    }
  }

export default ChartWindow;