import React from "react";
// import Slider from 'react-rangeslider';

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

// const sliderLabelStyle = {

// }

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
      recommended: recommended,
      sliderWidth: 300
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: parseFloat(event.target.value) }, 
    () => this.props.setDose(this.state.value)
    );
  }

  calcMarkerPositions(){
    const lowDose = jinja.lowerDose
    const highDose = jinja.upperDose
    const recommended = jinja.recommended

    let savedDoses = [lowDose, highDose, recommended]

    //loop through each of the doses.
    //check if they are undefined 
    // if they are undefined don't render a marker
    //if they have a value, figure out where they should sit in the div. 

    let positions = []

    for (let dose of savedDoses){
      if (dose !== undefined){
        let position = ((dose - this.state.min)/(this.state.max - this.state.min) * (this.state.sliderWidth)) - 5
        positions.push(position)
      }
    }
    return positions
  }

  render() {
    let [low, med, high] = this.calcMarkerPositions()

    // Modify the lowest marker since it is too far to the left of the screen when rendered. 
    low = low + 5
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
            style={{ width: `${this.state.sliderWidth}px` }}
          />
          <div className="slider-label" style={{ height: '50px' , width: `${this.state.sliderWidth}px` }}>
          
            <div style={{ transform : `translateX(${low}px)` , display: 'inline-block' }}> | </div>
            <div style={{ transform : `translateX(${med}px)` , display: 'inline-block'}}> | </div>
            <div style={{ transform : `translateX(${high}px)` , display: 'inline-block' }}> | </div>
          
          </div>
          
        </label>
      </div>
    );
  }
}

function SliderLabels(props){
  
}

