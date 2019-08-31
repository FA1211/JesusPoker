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
       return fetch(process.env.REACT_APP_BACKEND_URL+"/playerscores/")
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