import React from 'react';
import {Button} from 'reactstrap'

const NameButton = (props) => {
    return ( 
    <Button
        id = {props.index}
        onClick={() => props.onCheckboxBtnClick(props.index)}
        active={props.isSelected}
        className= "col-12"
        style ={{backgroundColor:"#FFFFFF"}}> {props.name} </Button> );
}
 
export default NameButton;