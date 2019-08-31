import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardBody, CardTitle} from 'reactstrap';

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
      return fetch(process.env.REACT_APP_BACKEND_URL+"/playerscores/get_max")
      .then(response => response.json())
      .then(data => {
        let bestPlayerName = data['name']
        let sessions = data['sessions']
        let scores = sessions.map(sess => sess['result']).slice(0,10)
        let ticks = [...  Array(scores.length).keys()]
        this.setState({ 
          bestPlayer: bestPlayerName,
          shouldHide: !this.state.shouldHide, 
          data :
          {
              labels : ticks,
              datasets: [{
              label: bestPlayerName,
              data: scores,
            }]
          }
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