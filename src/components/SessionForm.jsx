import React, { Component } from "react";
import { Button, Card, CardText, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from "reactstrap";
import Swal from 'sweetalert2';
import { submitForm } from '../api/django.jsx';
import ClipLoader from 'react-spinners/ClipLoader';

const tStyle = { color: "white", textAlign: "center", fontFamily: "Arial" };

class SessionForm extends Component {
  state = {
    chipCount:0,
    cashCount:"",
    balance:0,
    names: [
      "George",
      "Philip",
      "Angus H",
      "Nick T",
      "Conall",
      "Josh",
      "Joao",
      "Ethan",
      "Joe J",
      "Harry R",
      "JT",
      "Jacob",
      "Max",
      "Imy",
      "Kyle",
      "Erica",
      "Hannah",
      "Conrad",
      "Fadle",
      "Harry H",
      "Lukas",
      "Felix",
      "Theo",
      "Curtis",
      "Izzy",
      "Ellie",
      "Alex"],
    colors: ["#081B33BF", "#152642BF", "#2F4562BF", "#767D92BF", "#353C51BF"],
    cSelected: [],
    formData: {},
    loading: false
  };

  randomColor = selected => {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      return "#6f7173";
    } else {
      return "#353C51BF";
    }
  };
  ptext = selected => {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      return "Didn't Play";
    } else {
      return "";
    }
  };


  handleChange = event => {
    let newFormData = { ...this.state.formData };
    newFormData[event.target.name] = event.target.value;
    //Turn typed score into a float
    let looseParseFloat = numAsStr => {return numAsStr===""? 0: parseFloat(numAsStr)}
    let newBalance=looseParseFloat(Object.values(newFormData).reduce((a,b) => looseParseFloat(a)+looseParseFloat(b))).toFixed(2)
    this.setState({
      ...this.state,
      balance:newBalance,
      formData: newFormData
    });
  };

  onCheckboxBtnClick = (selected, name) => {
    const index = this.state.cSelected.indexOf(selected);
    let newFormData = this.state.formData;

    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({
      cSelected: [...this.state.cSelected],
      formData: newFormData
    });
  };

  validateAndSubmitForm = (form) => {
    if (!form.hasOwnProperty("date")) {
      Swal.fire({
        title: 'No Date!',
        text: 'Please enter a date',
        type: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }
    for (var key in form) {
      if (form[key] === "") {
        delete form[key];
      }
    }
    if (Object.keys(form).length === 1) {
      Swal.fire({
        title: 'No Scores!',
        text: 'Please enter some scores',
        type: 'warning',
        confirmButtonText: 'Cool'
      })
      return
    }
    submitForm(this.state.formData).then(() => this.setState({ loading: false }))

  }

  onSubmit = () => {
    this.setState({ loading: true }, this.validateAndSubmitForm(this.state.formData))
  };

  onConvert = (event) => {
    event.preventDefault()
    let cash = parseFloat(this.state.chipCount*2/100).toFixed(2)
    this.setState({cashCount:cash})
  }

  createForm = () => {
    return this.state.names.map((playerName, index) => {
      return (
        <Row sm={12}>
          <Col xs={6}>
            <Button
              id={index}
              name={playerName}
              onClick={() => this.onCheckboxBtnClick(index, playerName)}
              className=" mt-0 mb-0 col-12"
              style={{
                backgroundColor: this.randomColor(index),
                borderColor: "#353C51BF"
              }}
            >
              {playerName}
            </Button>
          </Col>

          <Col xs={6}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">£</InputGroupAddon>
              <Input
                id={index}
                name={playerName}
                disabled={!this.state.cSelected.includes(index)}
                type="number"
                placeholder={this.ptext(index)}
                onChange={e => this.handleChange(e)} />
            </InputGroup>
          </Col>
        </Row>
      );
    });
  };

  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="date" style={{ color: "white" }}>
              Date
            </Label>
            <Input
              id="dateField"
              name="date"
              onChange={e => this.handleChange(e)}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Row sm={12}>
              <Col sm={{ size: 12 }}>
                <Card inverse color="dark" className="mt-0">
                  <CardText style={tStyle}>
                    Select players and insert balance
                  </CardText>
                </Card>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row xs={12}>
              <Col xs={12} md={{size:8, offset:2}}>
              <InputGroup>
              <Input type="number" step="1" onChange={e => this.setState({chipCount:e.target.value})} placeholder="Chips" />
                <InputGroupAddon addonType="prepend">
                    <Button block onClick={this.onConvert} style={{backgroundColor:"#353C51BF"}}>
                    Convert
                  </Button>
                </InputGroupAddon>
                <Input placeholder="Cash" value={this.state.cashCount} onChange={() => {return}}/>
              </InputGroup>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>{this.createForm()}</FormGroup>

          {/* <FormGroup>
            <Row>
              <Col xs={{size:8, offset:2}} md={{size:6, offset:3}}>
            <InputGroup>
              <InputGroupAddon style={{textAlign:""}} addonType="prepend">
                Out By
              </InputGroupAddon>
              <Input value={Math.round(this.state.balance*50)}></Input>
              <InputGroupAddon addonType="append">
                Chips
              </InputGroupAddon>
            </InputGroup>
            </Col>
            </Row>
          </FormGroup> */}
          <FormGroup>
            <Row>
              <Col sm={12}>
                {this.state.loading ? null : <Button
                  onClick={this.onSubmit}
                  style={{ backgroundColor: "#589486" }}
                  className="col-sm-12 col-md-6 offset-md-3"
                >
                  Submit
                </Button>}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <ClipLoader
                sizeUnit={"px"}
                size={50}
                color={'#123abc'}
                loading={this.state.loading}
              />
            </Row>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default SessionForm;
