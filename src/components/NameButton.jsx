import React from 'react';
import {Button} from 'reactstrap'

const NameButton = props => {
    console.log(props)
    return ( 
    <Button
        id = {props.index}
        onClick={props.onClick}
        active={props.isSelected}
        className= "col-12"
        style ={props.style}> {props.name} </Button> );
}
 
export default NameButton;