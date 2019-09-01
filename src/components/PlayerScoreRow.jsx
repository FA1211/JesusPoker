import ScoreInputBox from "./ScoreInputBox";
import NameButton from './NameButton'
import React from 'react';
import {Row, Col} from 'reactstrap';

const PlayerScoreRow = props => {
    return ( 
        <Row sm ={12}>
            <Col md={6}>
                <NameButton {...props.buttonProps} />
            </Col>
            <Col md = {6}>
                <ScoreInputBox {...props.inputBoxProps}/>
            </Col>
    </Row>);
}
 
export default PlayerScoreRow;