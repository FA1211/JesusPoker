const tableTextStyle = {
    color: "#767D92",
    fontSize: "medium",
    fontWeight: "bold"
}

class TableText extends Component {
    state = { content: this.props.content }
    render() { 
        return (
        <div style={tableTextStyle}>
            this.state.content
        </div>  );
    }
}
 
export default TableText;