import React, {Component} from 'react'
import { bgColor } from "./styles.jsx";
import {Container, Row, Col, ButtonDropdown,Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Card, CardBody, Input} from 'reactstrap'

class AddPayments extends Component {
    
    render(){
        return <Container fluid styles={bgColor}>
            <Row xs={12}>
            <Col>
            <Card body inverse style={{backgroundColor: "#27293D", borderColor: "#333"}}>
                <CardBody>
            <Row>
                <Col xs={6} style={{color: "white", textAlign: "center"}}>
                    From
                </Col>
                <Col xs={6} style={{textAlign:"center"}}>
                    <Dropdown isOpen={false}>
                        <DropdownToggle>
                            Choose Player
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                Player 1
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col xs={6} style={{color: "white", textAlign: "center"}}>
                    To
                </Col>
                <Col xs={6} style={{color: "white", textAlign: "center"}}>
                <ButtonDropdown isOpen={false}>
                        <DropdownToggle>
                            Choose Player
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                Player 1
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
            </Row>
            <Row>
                <Col xs={6} style={{color: "white", textAlign: "center"}}>
                    Amount
                </Col>
                <Col xs={6}>
                    <Input type="number"></Input>
                </Col>
            </Row>
            </CardBody>
            </Card>
            </Col>
            </Row>
        </Container> 
    }
}

export default AddPayments;