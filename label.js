import React from "react"
import Popup from 'reactjs-popup'

export default class Label extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      editOn: false,
      popupOpen : false,
      instructions : '',
      phone : '',
      sent : false
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleText = this.handleText.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.sendText = this.sendText.bind(this)
    this.setPhone = this.setPhone.bind(this)
  }

  setPhone(evt){
    this.setState({
      phone : evt.target.value
    })
  }

  closeModal(){
    this.setState({
      popupOpen : false
    })
  }

  // Handles event when user clicks edit.
  handleEdit(instructions, evt){
    this.setState({
      editOn : true
    })
  }

  handleText(instructions, evt){
    this.setState({
      popupOpen : true,
      instructions : instructions
    })
  }

  sendText(){
    fetch('/text-client', {
      method : 'POST',
      body : JSON.stringify({
        instructions : this.state.instructions,
        phone : this.state.phone
        })
      })
      .then(this.setState({ sent : true }, this.closeModal))
  }

  renderEditBox(instructions) {
    if (this.state.editOn === true){
      return <Instructions setInstructions={this.props.setInstructions} save={() => this.setState({ editOn : false})} instructions={this.props.instructions} />
    } else {
      return (
      <div>
        <button onClick={this.handleEdit.bind(this, instructions)}>Edit</button>
        <button onClick={this.handleText.bind(this, instructions)}>Text to client</button>
      </div>)
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
      <Popup 
        open={this.state.popupOpen}
        closeOnDocumentClick
        onClose={this.closeModal}
      >

      <h3>Enter the client's phone number:</h3>
      <input 
        type='tel' 
        placeholder='Enter number with no gaps'
        value={this.state.phone}
        onChange={this.setPhone}></input>
      <button onClick={this.sendText}>Send</button>
      <button onClick={this.closeModal}>Cancel</button>
      </Popup>

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

