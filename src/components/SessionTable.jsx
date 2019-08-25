import React, { Component } from 'react';
import {Container, Col, Row, Card, Button, Collapse, CardBody,Table} from 'reactstrap'

class SessionTable extends Component {
    state = { 
        sessionResults : {},
        dummyData :[
            {
                "id": 1,
                "date": "2019-08-24",
                "results": [
                    {
                        "id": 1,
                        "name": "Joao",
                        "result":35
                    },
                    {
                        "id": 2,
                        "name": "Jacob",
                        "result": -35
                    }
                ],
                "balance": 6
            }
        ],
        dates: {},
        players: {},
        collapse:[]
     }

     getSessionInfo = () => {
         return fetch("http://127.0.0.1:8000/sessions").then(response => response.json())
         .then(session => {
            //let date = session['date']
            let results = session['results']
            console.log(session)
            let players = results.map(obj => obj['name'])
            console.log(players)
            
        
        })}
    
        toggle = (id) => {
            let isToggled = this.state.collapse.indexOf(id)
           let newCollapsed = [...this.state.collapse]

            if (isToggled < 0){
                newCollapsed.push(id)
            }
            else {
                newCollapsed.splice(isToggled,1)
            }
            console.log(newCollapsed)
            this.setState({ collapse: newCollapsed });
          }

          checkOpen = (id) => {
                return this.state.collapse.indexOf(id) > -1
          }

          
        
          render() {
            return (
              <Container className="mt-3">
                  <Row sm ={12}>
                  <Col sm={12}>
                <Button style={{ borderColor: '#f7f0c7' }} 
                        className=" mt-0 mb-0 col-12"
                        //color="warning"
                        onClick={() => this.toggle(1)}>2019-08-24</Button>
                    
                <Collapse id={1} isOpen={this.checkOpen(1)}>
                <Card body style={{ backgroundColor: '#5d84a9', borderColor: '#f7f0c7' }} outline>
                  <Table borderless striped>
                      
                  <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                <tbody>
                    <tr>
                        <th scope="row">Mark</th>
                        <td >1</td>
                    </tr>
                    <tr>
                        <th scope="row">Jacob</th>
                        <td >2</td>
                    </tr>
                    <tr>
                        <th scope="row">Larry</th>
                        <td>1</td>
                    </tr>   
                </tbody>
                  </Table>
                  </Card>
                </Collapse>
                </Col>
                    </Row>
                

                    <Row sm ={12}>
                  <Col sm={12}>
                <Button className=" mt-0 mb-0 col-12" color="primary" onClick={() => this.toggle(2)}>Toggle</Button>
                    
                <Collapse id={2} isOpen={this.checkOpen(2)}>
                  <Card>
                    <CardBody>
                    Anim pariatur cliche reprehenderit,
                     enim eiusmod high life accusamus terry richardson ad squid. Nihil
                     anim keffiyeh helvetica, craft beer labore wes anderson cred
                     nesciunt sapiente ea proident.
                    </CardBody>
                  </Card>
                </Collapse>
                </Col>
                    </Row>

              </Container>
            )}
}
 
export default SessionTable;