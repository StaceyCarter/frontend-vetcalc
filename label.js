import React from "react"
import { calcAmount } from './calc_amount'

export default class Label extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      text : 'Give {this.props.amount} {this.props.drugForm === "liq" ? "mls" : "tablets"} by {this.props.route},every {this.props.frequency} hours {freqVerbose !== "" ? `(${freqVerbose})` : ""} for {this.props.duration} {this.props.timeUnit}.'
    }
  }

  calcTimesPerDay(freq){
    if (freq === 24){
      return "once per day"
    } else if (freq === 12){
      return "twice a day"
    } else if (freq === 8){
      return "three times per day"
    } else if (freq === 6){
      return "four times per day"
    } else if (freq === 48){
      return "every other day"
    } else if (freq === 72){
      return "every third day"
    } else {
      return ""
    }
  }

  render(){
    const freqVerbose = this.calcTimesPerDay(this.props.frequency);
    const amount = calcAmount(this.props.dose, this.props.weight, this.props.concentration, this.props.drugForm, this.props.divisions, this.props.minDose, this.props.maxDose);

  return(
    <div>
      <h3>Label instructions:</h3>
      <p> 
        Give {amount} {this.props.drugForm === "liq" ? "mls" : "tablets"} by {this.props.route},
        every {this.props.frequency} hours {freqVerbose !== "" ? `(${freqVerbose})` : ""} for {this.props.duration} {this.props.timeUnit}.
      </p>
      
      <button onClick={() => alert("clicked button")}>Edit</button>
      <h2>MAKE LABEL EDITABLE</h2>
      <ul>
        <li>Weight: {this.props.weight} {this.props.units}</li>
        <li>Weight in kg: {this.props.kgWeight}kg</li>
        <li>Drug form: {this.props.drugForm}</li>
        <li>Concentration: {this.props.concentration}</li>
        <li>Divisions: {this.props.divisions}</li>
        <li>Dose: {this.props.dose}</li>
        <li>Amount: {this.props.amount}</li>
        <li>Dose min: {this.props.minDose}</li>
        <li>Dose max: {this.props.maxDose}</li>
        <li>Frequency: {this.props.frequency}</li>
        <li>Duration: {this.props.duration}</li>
        <li>Time unit: {this.props.timeUnit}</li>
        <li>Route: {this.props.route}</li>
      </ul>

    </div>
  )}
}

