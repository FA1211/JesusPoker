import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {spreadsheetURL} from './config';


const colorScheme = ["#081B33BF","#152642BF","#2F4562BF","#767D92BF","#353C51BF"]

class BarChart extends Component {
  
    state = { 
        title: this.props.title,
        data: {},
        header: "gssafkldasjfk"
      }
     
      randomArrElement = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
      }

     getChartData = () => {
       return fetch("http://127.0.0.1:8000/playerscores/")
       .then(response => response.json())
       .then(data => {
         

         let players = data.map(obj => obj['name'])
         let scores = data.map(obj => obj['total_score'])

         
         let colors = scores.map(() => this.randomArrElement(colorScheme))
         console.log(this.randomArrElement(colorScheme))
         console.log(colors)

         


        this.setState({ data: {
                                labels:players,
                                    datasets:[{
                                      label: 'My First dataset',
                                      data: scores,
                                      backgroundColor: colors
                                    }],
                                  }
                                  })


       })
     }
      // return fetch(spreadsheetURL).then(response => response.json()).then(
      //   data => {
      //   let allRows = data.valueRanges[0].values;
      //   let headerRow = allRows[0]
      //   let otherRows = allRows.slice(1)
      //   let players = allRows.map(row => row[0]).slice(1)
      //   let scores = otherRows.map(row => [row[0]].concat([row.slice(1)]));
      //   let totalScores = scores.map(pl => pl[1].reduce((a,b) => parseFloat(a)+parseFloat(b)))
      //   let colorScheme = ["#081B33BF","#152642BF","#2F4562BF","#767D92BF","#353C51BF"]
      //   const colors = players.map(pl => colorScheme[Math.floor(Math.random() * colorScheme.length)])
      //   console.log(totalScores)
        
      //   this.setState({header: headerRow, data: {
      //                                         labels:players,
      //                                         datasets:[{
      //                                           label: 'My First dataset',
      //                                           data: totalScores,
      //                                           backgroundColor: colors,
      //                                         }],
      //                                       }
      //                                       })
      //                                       } 
      // )};

       componentDidMount() {
        this.getChartData()
        
       }


    render() { 
        return ( 
            <Card body inverse color="dark" className="mt-0">
                <CardBody>
                  <CardTitle>{this.state.title}</CardTitle>
                  <Bar options={{
                                  legend: {display: false},
                                  title: {text: "hello"}
                                }} 
                        data = {this.state.data}/>
                </CardBody>
            </Card>
        );
    }
  }

export default BarChart;