import React, { Component } from 'react';
import { Button, Card, Col, Collapse, Container, Table } from 'reactstrap';
import * as moment from 'moment'

class SessionTable extends Component {
    state = { 
        sessionResults : {},
        dummyData : [],
        dates: {},
        players: {},
        collapse:[]
     }

     getSessionInfo = () => {
         return fetch("http://arounf.pythonanywhere.com/sessions?ordering=-date").then(response => response.json())
         .then(data => {
             this.setState({dummyData: data})
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

          componentDidMount = () => {
              this.getSessionInfo()
          }
          
        
          render() {
              //this.getSessionInfo()
              console.log(this.state.dummyData)
            return (
                    
                <Container className="mt-3">
                {this.state.dummyData.map((session,index) => {

                  return <Col sm={12}>
                <Button style={{ borderColor: '#f7f0c7' }} className=" mt-0 mb-0 col-12" color="primary" onClick={() => this.toggle(index)}>
                    {moment(session['date'], 'YYYY-MM-DD').format("Do MMMM YY")}
                </Button>
                    
                <Collapse id={2} isOpen={this.checkOpen(index)}>
                  <Card body style={{ backgroundColor: '#5d84a9', borderColor: '#f7f0c7' }}>
                    <Table borderless striped>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>

                        <tbody>
                            {session['results'].map(
                                res => {
                                    return <tr>
                                        <th scope="row">{res['player']}</th>
                                        <td>{res['result']}</td>
                                    </tr>
                                })}
                        </tbody>
                    </Table>
                  </Card>
                </Collapse>
                </Col>
            })}
                </Container>

            )}
}
 
export default SessionTable;