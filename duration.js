import React from "react";

export default function Duration(props){

  const handleChange = (evt) => {
    const value = parseInt(evt.target.value)
    const newValue = (Number.isNaN(value))? "" : value;
    props.setDuration(newValue)
  }

  return(
    <div>
      <label>
      How long do you want to give it for? <input type="number" name="duration" value={props.duration} onChange={handleChange} />
      <TimeUnit updateUnit={props.updateUnit}/>
      </label>
    </div>
  )
}

class TimeUnit extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      timeUnit : 'days'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      timeUnit : evt.target.value
    }, () => this.props.updateUnit(this.state.timeUnit))
  }

  render() {
    return(
      <select value={this.state.timeUnit} onChange={this.handleChange}>
        <option value={"days"}>days</option>
        <option value={"weeks"}>weeks</option>
        <option value={"months"}>months</option>
      </select>
  )}
}