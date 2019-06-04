import React from "react";

export default function Duration(props){

  const handleChange = (evt) => {
    const value = parseInt(evt.target.value)
    const newValue = (Number.isNaN(value))? "" : value;
    props.setDuration(newValue)
  }

  return(
    <div className="form-inline duration-block">
      <div className="form-group">
        <div className="container">
          <div className="row">
            <label for="duration">
            How long do you want to give it for? 
            </label>
          </div>
          <div className="row">
            <input className="form-control" type="number" id="duration" value={props.duration} onChange={handleChange} />
            <TimeUnit updateUnit={props.updateUnit}/>
          </div>
        </div>
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