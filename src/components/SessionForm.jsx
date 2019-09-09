import React, { Component } from "react";
import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import {submitForm} from '../api/django.jsx'
import Swal from 'sweetalert2'

const tStyle = { color: "white", textAlign: "center", fontFamily: "Arial" };

class SessionForm extends Component {
  state = {
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
    "Izzy"    ],
    colors: ["#081B33BF", "#152642BF", "#2F4562BF", "#767D92BF", "#353C51BF"],
    cSelected: [],
    values: {},
    formData: {}
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
      return "Did not Play";
    } else {
      return "";
    }
  };

  handleClick = e => {
    e.preventDefault();
  };

  handleChange = event => {
    let newFormData = { ...this.state.formData };
    newFormData[event.target.name] = event.target.value;
    this.setState({
      ...this.state,
      formData: newFormData
    });
  };

  handleValue = index => {
    const selectedIndex = this.state.cSelected.indexOf(index);
    let newValue = this.state.value;
    if (selectedIndex < 0) {
      newValue = 0;
    }
    return newValue;
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
    submitForm(this.state.formData)

  }

  onSubmit = () => {
    this.validateAndSubmitForm(this.state.formData)
  };

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
            <Input
              id={index}
              name={playerName}
              disabled={!this.state.cSelected.includes(index)}
              type="number"
              placeholder={this.ptext(index)}
              onChange={e => this.handleChange(e)}
            ></Input>
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

          <FormGroup>{this.createForm()}</FormGroup>

          <FormGroup>
            <Row>
              <Col sm={12}>
                <Button
                  onClick={this.onSubmit}
                  style={{ backgroundColor: "#589486" }}
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
