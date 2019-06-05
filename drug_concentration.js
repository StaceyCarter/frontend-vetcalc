import React from "react"

export default function Concentration(props){
  let describingWord
  let units

  if (props.drugForm === "liq"){
    describingWord = "concentration"
    units = "mg/ml"
  } else if (props.drugForm === "tab"){
    describingWord = "strength of the tablet"
    units = "mg"
  }

  return (
    <div className="form-group">
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ padding : 0 }}>
            <label for="concentration">What is the {describingWord} ?</label>
          </div>
        </div>
        <div className="row">
          <input 
            className="form-control col-10" 
            id="concentration" 
            type="number" 
            step="0.01" 
            placeholder="Concentration"
            onChange={(evt) => {
            props.setConcentration(evt.target.value)}} />
          <span className="concentration-unit">{units}</span>
        </div>
      </div>
    </div>
  )
}