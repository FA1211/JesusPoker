import React from 'react';
import {Input} from 'reactstrap';

const ScoreInputBox = (props) => {
    return (<Input
        active={props.active}
        value={props.value} 
        disabled={!props.disabled}
        id={props.number} 
        type="number"
        placeholder={props.placeholder} 
        onChange={e => props.handleChange(e)}/>);
}
 
export default ScoreInputBox;