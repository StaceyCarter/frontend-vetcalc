import React from "react"

export default class Label extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      text : `this is a label for a dog of ${this.props.weight}`
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
    const freqVerbose = this.calcTimesPerDay(this.props.frequency)

  return(
    <div>
      <label> Label: <br />
        <textarea value={this.state.text}>
        </textarea>
      </label>
      <h3>Label instructions:</h3>
      <p>
        Give {this.props.amount} {this.props.drugForm === "liq" ? "mls" : "tablets"} by {this.props.route},
        every {this.props.frequency} hours {freqVerbose !== "" ? `(${freqVerbose})` : ""} for {this.props.duration} {this.props.timeUnit}.
      </p>
      <p> Form state info: </p>
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