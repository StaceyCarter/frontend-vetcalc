import React from "react";

function establishSliderValues(low, high, recommended) {
  let min;
  let max;
  let defaultPos;
  // If low and high are undefined, but recommended is truthy.
  if (!low && !high && recommended) {
    // If only a recommended dose is given
    console.log("IN 1st IF");
    defaultPos = recommended;
    min = recommended - 10;
    max = recommended + 10;
  } else if (low && high && recommended) {
    // If all 3 are provided
    console.log("IN 2nd IF");
    defaultPos = recommended;
    min = low;
    max = high;
  } else if (low && high && !recommended) {
    // If a range is given, but no recommended dose
    console.log("IN 3rd IF");
    defaultPos = (low + high) / 2;
    min = low;
    max = high;
  } else if (low && recommended && !high) {
    // If a low and recommended is given, but no high.
    console.log("IN 4th IF");
    defaultPos = recommended;
    min = low;
    max = recommended + 2;
  } else if (high && recommended && !low) {
    // If a high and recommended is given, but no low
    console.log("IN 5th IF");
    defaultPos = recommended;
    min = recommended - 2;
    max = high;
  }
  return [min, max, defaultPos];
}

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    let [min, max, recommended] = establishSliderValues(
      jinja.lowerDose,
      jinja.upperDose,
      jinja.recommended
    );

    this.props.setDose(recommended)

    this.state = {
      value: recommended,
      min: min,
      max: max,
      recommended: recommended
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: parseFloat(event.target.value) }, 
    () => this.props.setDose(this.state.value)
    );
  }

  render() {
    {
    }
    return (
      <div>
        <label> What dose would you like to use?
        <h1>{this.state.value} mg/kg</h1>
          <input
            className="slider"
            type="range"
            min={this.state.min}
            max={this.state.max}
            value={this.state.value}
            onChange={this.handleChange}
            id="slider"
          />
        </label>
      </div>
    );
  }
}

