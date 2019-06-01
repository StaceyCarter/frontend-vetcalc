import React from "react"
import { calcAmount } from './calc_amount'

export default class Label extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      editOn: false  
    }

    this.handleEdit = this.handleEdit.bind(this)
  }

  // Handles event when user clicks edit.
  handleEdit(instructions, evt){
    this.setState({
      editOn : true
    })
  }

  renderEditBox(instructions) {
    if (this.state.editOn === true){
      return <Instructions setInstructions={this.props.setInstructions} save={() => this.setState({ editOn : false})} instructions={this.props.instructions} />
    } else {
      return <button onClick={this.handleEdit.bind(this, instructions)}>Edit</button>
    }  
  }

  render(){

  return(
    <div>
      <h3>Label instructions:</h3>
      <div>
      <p onDoubleClick={this.handleEdit}> {this.props.instructions} </p>
      </div>
      {/* <button onClick={this.handleEdit.bind(this, instructions)}>Edit</button> */}
      { this.renderEditBox(this.props.instructions) }
      <div className="edit"></div>
      <h2>MAKE LABEL EDITABLE</h2>
      <ul>
        <li>Weight: {this.props.weight} {this.props.units}</li>
        <li>Weight in kg: {this.props.kgWeight}kg</li>
        <li>Drug form: {this.props.drugForm}</li>
        <li>Concentration: {this.props.concentration}</li>
        <li>Divisions: {this.props.divisions}</li>
        <li>Dose: {this.props.dose}</li>
        <li>Amount: {this.props.amount}</li>
        <li>Dose min: {this.props.minDose}</li>
        <li>Dose max: {this.props.maxDose}</li>
        <li>Frequency: {this.props.frequency}</li>
        <li>Duration: {this.props.duration}</li>
        <li>Time unit: {this.props.timeUnit}</li>
        <li>Route: {this.props.route}</li>
        <li>Instructions: {this.props.instructions}</li>
      </ul>

    </div>
  )}
}

// Renders the edit box and calls set instructions when the user types them in.  
function Instructions(props){
  return(
    <div>
    <textarea onChange={props.setInstructions} value={props.instructions}>  </textarea>
    <button onClick={props.save}>Save </button>
    </div>
  )
}
