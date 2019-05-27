import React from "react"
import ReactDOM from "react-dom"
import anime from 'animejs/lib/anime.es.js'


function Weight(props) {
  return (
  <div>
    <label>
      Weight: <input type="text" name="weight" />
    </label>
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      <label className="btn btn-secondary active">
        <input type="radio" name="kg" id="option1" autoComplete="off" /> kg
      </label>
      <label className="btn btn-secondary">
        <input type="radio" name="options" id="option2" autoComplete="off" /> lbs
      </label>
    </div>
  </div>
  )
}

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
        <textarea></textarea>
      </label>
    </div>
  )
}


class Form extends React.Component{
  render(){
    return (
    <div>
    <h1>Hello world</h1>
    <Weight />
    <LiqOrTabs />
    <Route />
    <Concentration />
    <Divisions />
    <DosePicker />
    <Frequency />
    <Duration />
    <Label />
    </div>
    )
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
)