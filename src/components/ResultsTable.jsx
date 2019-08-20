import {Table} from 'reactstrap';
import config from './config.js';
import React, { Component } from 'react';
import { join } from 'path';


const tableURl = `https://sheets.googleapis.com/v4/spreadsheets/${ config.spreadsheetId }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${ config.API_KEY }`
const tableTextStyle = {
    color: "#767D92",
    fontSize: "medium",
    fontWeight: "bold"
  }

class ResultsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerRow: [],
            players : [],
            playerTotals:[],
            last10gamesbyPlayer:[]
          }
    }

    

    componentDidMount() {
        fetch(tableURl).then(response => response.json()).then(data =>
            {
                let spreadsheetData = data.valueRanges[0].values
                let tableHeader = spreadsheetData[0]
                let tableRows = spreadsheetData.filter(row => row != tableHeader)
                let tablePlayers = tableRows.map(row => row[0])
                let tablePlayerTotals = tableRows.map(
                    row => 
                        row[0].concat(
                            row.slice(1).reduce(
                                                (a,b) => (parseFloat(a)||0)+(parseFloat(b)||0)
                                                        ,0
                                                )
                                    ))

                let sessionData
                if (tableHeader.length > 10) {
                    //take the player name (first column) and only fetch last 10 games
                    tableHeader = tableHeader.splice(-11)
                    sessionData = tableRows.map(row => [row[0]].concat(row.slice(-10)))
                }
                else{
                    sessionData = tableRows
                }

                this.setState({
                    headerRow: tableHeader,
                    players: tablePlayers, 
                    last10gamesbyPlayer: sessionData
                })
            })
    }

    render() { 
        return (<Table hover bordered> 
            <thead style={{color:"white", fontSize:"large"}}>
                <tr>
                {this.state.headerRow.map(row => <th className="col-xs-12" style={tableTextStyle} key={Math.random()}>{row}</th>)}
                </tr>
            </thead>

            <tbody>
                    {this.state.last10gamesbyPlayer.map(
                        player => {
                            let playerRow = player.map(session => <td style={tableTextStyle} key={Math.random()}>{session}</td>)
                            return <tr key={Math.random()}>{playerRow}</tr>
                        }
                        )

                    }
            </tbody>
        </Table>);
    }
}
 
export default ResultsTable;