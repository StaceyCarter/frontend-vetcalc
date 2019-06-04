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

  render() {
    return (
      <div className="weight-selector">
      <div className="form-check form-check-inline">
        <label className="form-check-label" for="kg">
        kg
        </label>
          <input
            type="radio"
            className="form-check-input"
            id="kg"
            value="kg"
            checked={this.state.selectedOption==="kg"}
            onChange={this.handleOptionChange}
          />
        </div>
        <div className="form-check form-check-inline">
        <label className="form-check-label" for="lbs">
        lbs
        </label>
          <input
            type="radio"
            value="lbs"
            id="lbs"
            className="form-check-input"
            checked={this.state.selectedOption==="lbs"}
            onChange={this.handleOptionChange}
          />
          
      </div>
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
          Weight:
        </label>
          <input
            type="number"
            id="weight"
            className="form-control"
            step="0.01"
            value={this.props.weight}
            onChange={this.setWeightFromEvent}
            
          />
        
   
      </div>
    );
  }
}
