import React from "react";

export default class Frequency extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      freq : jinja.frequency
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    const value = parseInt(evt.target.value)
    const newValue = (Number.isNaN(value))? "" : value;
    this.setState({
      freq : newValue
    }, () => this.props.setFrequency(this.state.freq))
  }
  
  render() {
    return(
    <div>
      <label>
      How often would you like to give it?
      <select value={this.state.freq} onChange={this.handleChange}>
        <option value={24}>SID</option>
        <option value={12}>BID</option>
        <option value={8}>TID</option>
        <option value={6}>QID</option>
        <option value={48}>EOD</option>
        <option value={this.state.freq}>Custom</option>
      </select>
      q <input type="number" name="frequency" value={this.state.freq} onChange={this.handleChange}/>hrs 
      </label>
    </div>
  )}
}