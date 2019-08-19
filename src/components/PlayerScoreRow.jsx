import ScoreInputBox from "./ScoreInputBox";

const PlayerScoreRow = (props) => {
    return ( 
        <Row sm ={12}>
            <Col md={6}>
                <NameButton props = {props.buttonProps}/>
            </Col>
            <Col md = {6}>
                <ScoreInputBox props = {props.inputBoxProps}/>
            </Col>
    </Row>);
}
 
export default PlayerScoreRow;