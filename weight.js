import React from "react";

export class KgOrLbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "kg"
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(evt) {
    this.setState({
      selectedOption: evt.target.value
    }, 
    () => this.props.changeUnit(this.state.selectedOption));
  }

  handleChange(selected){
    console.log(selected)
    this.setState({
      selectedOption: selected
    },
    this.props.changeUnit(selected));
  }

  render() {
    return (
      <div>
        <button 
          onClick={() => this.handleChange("kg")} 
          id="kg"
          class={"btn btn-outline-secondary kg-lb-button " + (this.state.selectedOption === "kg"? "active" : "" )} 
          type="button">kg</button>
        <button 
          onClick={() => this.handleChange("lbs")} 
          id="lbs"
          class={"btn btn-outline-secondary kg-lb-button " + (this.state.selectedOption === "lbs"? "active" : "")} 
          type="button">lbs</button>
      </div>
    );
  }
}

// Renders a weight input form and sets weight state in Form.
export default class Weight extends React.Component {
  constructor(props) {
    super(props);

    this.setWeightFromEvent = this.setWeightFromEvent.bind(this);
  }
// Sets the state as the new weight. If the input is NaN converts it to an empty string. 
  setWeightFromEvent(e) {
    const value = parseFloat(e.target.value)
    const newValue = (Number.isNaN(value))? "" : value;
    this.props.setWeight(newValue)
  }

  render() {
    return (
      <div className="form-group">
        <label for="weight">
          What is the patient's weight?
        </label>
        <div class="input-group">
          <input 
            type="number" 
            class="form-control" 
            placeholder="Patient's weight"
            step="0.01"
            value={this.props.weight}
            onChange={this.setWeightFromEvent}  />
          <div class="input-group-append" id="button-addon4">
            <KgOrLbs changeUnit={this.props.changeUnit}/>
        </div>
        
      </div>
      </div>
    );
  }
}
