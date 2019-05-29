import React from "react";

function establishSliderValues(low, high, recommended){
  let min;
  let max;
  let defaultPos;
  // If low and high are undefined, but recommended is truthy.
  if (!low && !high && recommended){
    // If only a recommended dose is given
    console.log('IN 1st IF')
    defaultPos = recommended;
    min = recommended - 10;
    max = recommended + 10;
  } else if (low && high && recommended){
    // If all 3 are provided
    console.log('IN 2nd IF')
    defaultPos = recommended;
    min = low;
    max = high;
  } else if ((low && high) && !recommended){
    // If a range is given, but no recommended dose
    console.log('IN 3rd IF')
    defaultPos = ((low + high) / 2);
    min = low;
    max = high;
  } else if ((low && recommended) && !high){
    // If a low and recommended is given, but no high.
    console.log('IN 4th IF')
    defaultPos = recommended;
    min = low;
    max = recommended + 2;
  } else if ((high && recommended) && !low){
    // If a high and recommended is given, but no low
    console.log('IN 5th IF')
    defaultPos = recommended;
    min = recommended - 2;
    max = high;
  }
  return [min, max, defaultPos]
}

export default function DosePicker(props){
  return (
    <div>
      <label>
        What dose do you want to use? (in mg/kg) <input type="number" name="dose" step="0.01" readOnly />
      </label>
      <Slider />
      <Amount drugForm={props.drugForm} divisions={props.divisions}/>
    </div> 
  )
}

class Slider extends React.Component{
  constructor(props){
    super(props);
    let [min, max, recommended] = establishSliderValues(server.lowerDose, server.upperDose, server.recommended)

    this.state = {
      value: recommended,
      min: min,
      max: max,
      recommended: recommended
    }

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event){
    this.setState({value : event.target.value})
  }

  render() {
    return(
    <div>
      <ValueInfo value={this.state.value} />
      <input className="slider" type="range" min={this.state.min} max={this.state.max} value={this.state.value} onChange={this.handleChange} id="slider"></input>
    </div>
    )
  }

}

function ValueInfo(props){
    return(
      <div>
        <h1>{props.value}mg/kg</h1>
      </div>
    )
}

// Caluclates the amount of drug required for the chosen mg per kg dose. 
// Calculates in mls for liquids and in number of tablets for tablets - pass in divisions to be used for tablets.
function Amount(props){
  return(
    <h3>{props.drugForm} divisions: {props.divisions}</h3>

  )
}

