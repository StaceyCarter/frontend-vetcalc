import React from "react";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import anime from 'animejs/lib/anime.es.js';

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
  min = min < 0 ? 0 : min

  return [min, max, defaultPos];
}

export default class MySlider extends React.Component {
  constructor(props) {
    super(props);

    let [min, max, recommended] = establishSliderValues(
      jinja.lowerDose,
      jinja.upperDose,
      jinja.recommended
    );
    
    //Sets the form default dose to the recommended dose and the chosen min and max values for the slider.
    this.props.setDose(recommended)
    this.props.setDoseMin(min)
    this.props.setDoseMax(max)

    this.state = {
      value: recommended,
      min: min,
      max: max,
      recommended: recommended,
      sliderWidth: 300,
      editOn : false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditDose = this.handleEditDose.bind(this);
    this.renderEditBox = this.renderEditBox.bind(this);
  }

  handleChange(event) {
    if (event.target.value === ""){
      this.setState({
        value : 0
      })
    } else {
      this.setState({ value: parseFloat(event.target.value) }, 
      () => this.props.setDose(this.state.value)
      )
    }
  }

  handleEditDose(evt){
    this.setState({
      editOn: true
    })
  }

  renderEditBox(){
    if(this.state.editOn === true){
      return (
      <DoseChange value={this.state.value} updateValue={this.handleChange} save={() => this.setState({ editOn : false})} />
      )
    } else {
      return ""
    }
  }

  render() {
    let [low, med, high] = calcMarkerPositions(this.state.min, this.state.max, this.state.sliderWidth)

    // Modify the lowest marker since it is too far to the left of the screen when rendered. 
    low = low + 5
    return (
      <div>
        <label> What dose would you like to use?
        <h1 onDoubleClick={this.handleEditDose}>{Math.round((this.props.dose) * 100) / 100} mg/kg</h1>
        {this.renderEditBox()}
          <input
            className="slider"
            type="range"
            min={this.state.min}
            max={this.state.max}
            step={0.01}
            value={this.state.value}
            onChange={this.handleChange}
            id="slider"
            style={{ width: `${this.state.sliderWidth}px` }}
            list="steplist"
          />
        </label>
        <div style={{ height: '50px' , width: `${this.state.sliderWidth}px` }}>
        <LabelledSlider 
          className="slider"
          min={this.state.min} 
          max={this.state.max} 
          width={this.state.sliderWidth} 
          value={this.props.dose}
          step={0.01} 
          drag={this.props.setDose}/>
        </div>
      </div>
    );
  }
}


class LabelledSlider extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 15,
    }

    this.handleChange = this.handleChange.bind(this)
    this.getLabels = this.getLabels.bind(this)
  }

  handleChange(value) {
    this.setState({
      horizontal: value
    }, () => this.props.drag(value))
    
  };

  getLabels(){
    const lowDose = jinja.lowerDose
    const highDose = jinja.upperDose
    const recommended = jinja.recommended

    let labels={};

    if (lowDose !== undefined){
      labels[lowDose] = `low (${lowDose}mg/kg)`
    }
    if (highDose !== undefined){
      labels[highDose] = `high (${highDose}mg/kg)`
    }
    if (recommended !== undefined){
      labels[recommended] = `recommended (${recommended}mg/kg)`
    }
    return labels
  }

  render () {
    const { horizontal } = this.state
    const labels = this.getLabels()

    const formatkg = value => value + ' mg/kg'

    return (
      <div className='slider custom-labels'>
        <Slider
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          labels={labels}
          format={formatkg}
          // handleLabel={horizontal}
          step={0.01}
          onChange={this.handleChange}
        />
        
      </div>
    )
  }
}

// Checks for each of low, high and recommended input doses and returns a list of the positions.
function calcMarkerPositions(min, max, width){
  const lowDose = jinja.lowerDose
  const highDose = jinja.upperDose
  const recommended = jinja.recommended

  let savedDoses = [lowDose, highDose, recommended]

  let positions = []

  for (let dose of savedDoses){
    if (dose !== undefined){
      let position = ((dose - min)/(max - min) * (width)) - 5
      positions.push(position)
    }
  }
  return positions
}

function DoseChange(props){

  return(
    <div>
      <input type="number" value={props.value === 0 ? "" : props.value} onChange={props.updateValue} step="0.01"/>
      <button onClick={props.save}>Save</button>
    </div>
  )
}
