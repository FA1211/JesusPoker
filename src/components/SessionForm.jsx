import React, { Component } from 'react';
import {Button, Card, CardText, Col, Container, Label, Form, FormGroup, Input,Row } from 'reactstrap';


const tStyle = { color:"white", textAlign:"center", fontFamily: "Arial"}

class SessionForm extends Component {
    state = { 
        data:["Joao","Fadle","Kyle","Jacob","Josh", "George", "Harry","Philip","JT"],
        colors:["#081B33BF","#152642BF","#2F4562BF","#767D92BF","#353C51BF"],
        cSelected: [],
        value: "" }

    randomColor = (selected) => {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
          return "#081B33BF"
        } else {
          return "#353C51BF"
        }
    }
    ptext = (selected) => {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            return "Did not Play" }
        else {
            return ""
          }
    }

    handleClick = (e) => {
        e.preventDefault()
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        console.log(this.state.value)
    }

    handleValue = (index) => {
        const selectedIndex = this.state.cSelected.indexOf(index);
        let newValue = this.state.value
        if (selectedIndex < 0){
            newValue = 0;
        }
        return newValue
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
          this.state.cSelected.push(selected);
        } else {
          this.state.cSelected.splice(index, 1);
        }
        console.log(this.state.cSelected)
        this.setState({ cSelected: [...this.state.cSelected] });
      }

      componentDidMount() {
          
      }

    render() { 
        return (
            <Container>
            <Form >

                <FormGroup >
                    <Label for="exampleDate" style={{color:"white"}}>
                        Date
                    </Label>
                    <Input id= "exampleDate" type="date"/>
                </FormGroup>
                <FormGroup >
                    <Row sm={12} >
                        <Col sm={{size:12}} >
                            <Card inverse color="dark" className="mt-0" > 
                                <CardText style={tStyle}>Select players and insert balance</CardText>
                            </Card>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    {this.state.data.map(
                        (p, index) => {
                        return <Row sm ={12}>

                            <Col md={6} >
                                <Button
                                    id = {index}
                                    onClick={() => this.onCheckboxBtnClick(index)}
                                    className=" mt-0 mb-0 col-12"
                                    style ={{backgroundColor:this.randomColor(index)}}>
                                {p}
                                </Button>
                            </Col>

                            <Col md = {6}>
                                <Input
                                value={this.handleValue(index)} 
                                disabled={!this.state.cSelected.includes(index)}
                                id= "exampleNumber" 
                                type="number"
                                placeholder={this.ptext(index)} 
                                onChange={e => this.handleChange(e)}>
                                </Input>
                            </Col>
                            
                        </Row>
                    })}
                </FormGroup>  

                <FormGroup>
                    <Row>
                        <Col sm={12}>
                            <Button className="col-sm-12 col-md-6 offset-md-3 ">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
            </Container>
          );
    }
}
 
export default SessionForm;