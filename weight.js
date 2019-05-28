import React from "react";

class KgOrLbs extends React.Component {
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
        <label>
          <input
            type="radio"
            value="kg"
            checked={this.state.selectedOption==="kg"}
            onChange={this.handleOptionChange}
          />
          kg
        </label>
        <label>
          <input
            type="radio"
            value="lbs"
            checked={this.state.selectedOption==="lbs"}
            onChange={this.handleOptionChange}
          />
          lbs
        </label>
      </div>
    );
  }
}

// Renders a weight input form and sets weight state in Form.
export default class Weight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      units: "kg"
    };

    this.setWeightFromEvent = this.setWeightFromEvent.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
  }

  setWeightFromEvent(e) {
    this.props.setWeight(parseFloat(e.target.value));
  }

  changeUnit(newUnit) {
    this.setState({
      units: newUnit
    }, () => console.log("new unit for main weight component: ", this.state.units));
    
  }

  render() {
    return (
      <div>
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={this.props.weight}
            onChange={this.setWeightFromEvent}
          />
        </label>
        <KgOrLbs changeUnit={this.changeUnit}/>
      </div>
    );
  }
}
