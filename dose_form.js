import React from "react"
import ReactDOM from "react-dom"
import anime from 'animejs/lib/anime.es.js'
import Weight, {KgOrLbs} from './weight'


function LiqOrTabs(props) {
  return (
    <div>
      <label>
        <input type="radio" name="liqTab" value="liq" /> Liquid 
      </label> 
      <label>
        <input type="radio" name="liqTab" value="tab" /> Tablet 
      </label>
    </div>
  )
}

function Route(props) {
  return (
    <div>
      <select>
        <option value="PO">PO</option>
        <option value="OU">OU</option>
        <option value="OD">OD</option>
        <option value="OS">OS</option>
        <option value="SQ">SQ</option>
        <option value="IM">IM</option>
      </select>
    </div>
  )
}

function Concentration(props){
  return (
    <div>
      <label>What is the concentration? 
        <input type="number" name="concentration" step="0.01" />
      </label>
    </div>
  )
}

function Divisions(props){
  return (
    <div>
      <label>
        How many pieces can your tablets be divided into?
        <input type="number" name="divide" /> pieces
      </label>
    </div>
  )
}

function DosePicker(props){
  return (
    <div>
      <label>
        What dose do you want to use? (in mg/kg) <input type="number" name="dose" step="0.01" required />
      </label>
    </div> 
  )
}

function Frequency(props){
  return(
    <div>
      <label>
        {/* PREFILL WITH AJAX REQUEST */}
      How often would you like to give it? q <input type="number" name="frequency" value="" required />hrs 
      </label>
    </div>
  )
}

function Duration(props){
  return(
    <div>
      <label>
      How long do you want to give it for? <input type="number" name="duration" value=""required /> days 
      </label>
    </div>
  )
}

function Label(props){
  return(
    <div>
      <label> Label: <br />
        <textarea readOnly></textarea>
      </label>
      <p> Prop info: </p>
      <ul>
        <li>Weight: {props.weight} {props.units}</li>
        <li>Weight in kg: {props.kgWeight}kg</li>
      </ul>

    </div>
  )
}

class Form extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      weight : "",
      units : "kg",
      weightInKgs : ""
    }

    this.setWeight = this.setWeight.bind(this)
    this.convertToKg = this.convertToKg.bind(this);
    this.changeUnit = this.changeUnit.bind(this)
    this.setWeightInKgs = this.setWeightInKgs.bind(this)
  }

  setWeight(weight){
    // if (typeof weight !== "number" || typeof weight !== "string") {
    //   throw new Error("I expected weight to be a number! Got " + typeof weight)
    // }
    console.log("Weight from setWeight: ", weight)
    this.setState({
      weight : weight
    })
    this.setWeightInKgs(weight)
  }

  changeUnit(newUnit) {
    this.setState({
      units: newUnit
    }, () => this.setWeightInKgs(this.state.weight));
  }

  // Checks what the current weight units are. If they are lbs, then converts to kgs. 
  setWeightInKgs(weight){
    if (this.state.units === "lbs"){
      this.setState({
        weightInKgs : (weight * 0.45359237).toFixed(2)
      }) 
    } else {
      this.setState({
        weightInKgs : weight
      })
    }
  }

  convertToKg(weight){
    let weightNum = parseFloat(weight)
    if (this.state.units === "lbs"){
      return weightNum * 0.45359237
    } else {
      return weightNum
    }
  }

  render(){
    return (
    <div>
    <h1>Hello world</h1>
    <Weight weight={this.state.weight} setWeight={this.setWeight} />
    <KgOrLbs changeUnit={this.changeUnit}/>
    <LiqOrTabs />
    <Route />
    <Concentration />
    <Divisions />
    <DosePicker />
    <Frequency />
    <Duration />
    <Label 
      weight={this.state.weight} 
      units={this.state.units} 
      kgWeight={this.state.weightInKgs}/>
    </div>
    )
  }
}



ReactDOM.render(
  <Form />,
  document.getElementById('root')
)