import React from "react";

const low = server.lowerDose
const high = server.upperDose
const recommended = server.recommended

console.log('LOW: ', low )
console.log('HIGH: ', high )
console.log('RECOMMENDED: ', recommended )

function establishSliderValues(low, high, recommended){
  let min;
  let max;
  let defaultPos;
  // If low and high are undefined, but recommended is truthy.
  if (!(low && high) && recommended){
    defaultPos = recommended;
    min = recommended - 10;
    max = recommended + 10;
  } else if (low && high && recommended){
    defaultPos = recommended;
    min = low;
    max = high;
  } else if ((low && high) && !recommended){
    defaultPos = (low + high / 2);
    min = low;
    max = high;
  } else if ((low && recommended) && !high){
    defaultPos = recommended;
    min = low;
    max = recommended + 2;
  } else if ((high && recommended) && !low){
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
    </div> 
  )
}

class Slider extends React.Component{
  constructor(props){
    super(props);

    let [min, max, recommended] = establishSliderValues(low, high, recommended)

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
      <input type="range" min={this.state.min} max={this.state.max} value={this.state.value} onChange={this.handleChange} id="slider"></input>
    </div>
    )
  }

}

class ValueInfo extends React.Component{
  render(){
    return(
      <div>
        <h1>{this.props.value}mg/kg</h1>
      </div>
    )
  }
}