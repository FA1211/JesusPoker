import React, { Component } from 'react';
import { Button, Card, CardText, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const tStyle = { color:"white", textAlign:"center", fontFamily: "Arial"}

class SessionForm extends Component {
    state = { 
        names:["Joao","Fadle","Kyle","Jacob","Josh", "George", "Harry","Philip","JT"],
        colors:["#081B33BF","#152642BF","#2F4562BF","#767D92BF","#353C51BF"],
        cSelected: [],
        formData:{}
     }

    randomColor = (selected) => {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
          return "#6f7173"
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
        console.log(this.state.formData)
        this.setState({submittable:false})
        let newFormData = {...this.state.formData}
        newFormData[event.target.name] = event.target.value
        console.log(this.state)
        this.setState({
            ...this.state,
            formData:newFormData
          }, this.makeSubmittable)
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
        this.setState({ cSelected: [...this.state.cSelected] });
      }

      onSubmit = () => {
          let form = this.state.formData
        if (!(form.hasOwnProperty('date'))) {
            alert("Please Enter a Date")
            return
        }

        for(var key in form){
            if (form[key] === ""){
                delete form[key]
            }
        }
        this.setState({}, this.submitForm)

      }

      submitForm = () => {

        
        fetch("http://127.0.0.1:8000/sessions/",
            {method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},

            body: JSON.stringify(this.state.formData)
            }).then(response => 
                console.log(response))//.then(data => window.location.reload(false));
      }

      createForm = () => {
          return this.state.names.map(
            (playerName, index) => {
            return <Row sm ={12}>

                <Col xs={6} >
                    <Button
                        id = {index}
                        onClick={() => this.onCheckboxBtnClick(index)}
                        className=" mt-0 mb-0 col-12"
                        style ={{backgroundColor:this.randomColor(index), borderColor: '#353C51BF' }}>
                    {playerName}
                    </Button>
                </Col>

                <Col xs = {6}>
                    <Input
                    id= {index}
                    name={playerName}
                    disabled={!this.state.cSelected.includes(index)} 
                    type="number"
                    placeholder={this.ptext(index)} 
                    onChange={e => this.handleChange(e)}>
                    </Input>
                </Col>
                
            </Row>
        })
      }

    render() { 
        return (
            <Container>
            <Form >

                <FormGroup >
                    <Label for="date" style={{color:"white"}}>
                        Date
                    </Label>
                    <Input 
                        id= "dateField"
                        name="date"
                        onChange={e => this.handleChange(e)}
                        type="date"/>
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
                    {this.createForm()}
                </FormGroup>  

                <FormGroup>
                    <Row>
                        <Col sm={12}>
                            <Button 
                            onClick={this.onSubmit}
                            style={{backgroundColor:"#589486"}}
                            className="col-sm-12 col-md-6 offset-md-3 ">
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