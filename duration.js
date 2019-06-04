import React from "react";

export default function Duration(props){

  const handleChange = (evt) => {
    const value = parseInt(evt.target.value)
    const newValue = (Number.isNaN(value))? "" : value;
    props.setDuration(newValue)
  }

  return(
    <div className="form-inline">
      <div className="form-group">
        <label for="duration">
        How long do you want to give it for? 
        </label>
        <input className="form-control" type="number" id="duration" value={props.duration} onChange={handleChange} />
        <TimeUnit updateUnit={props.updateUnit}/>
        
      </div>
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
      
      <select className="form-control" value={this.state.timeUnit} onChange={this.handleChange}>
        <option value={"days"}>days</option>
        <option value={"weeks"}>weeks</option>
        <option value={"months"}>months</option>
      </select>
      
  )}
}