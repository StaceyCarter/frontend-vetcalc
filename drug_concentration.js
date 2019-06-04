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
      <label for="concentration">What is the {describingWord} ?</label>
        <input 
          className="form-control" 
          id="concentration" 
          type="number" 
          step="0.01" 
          placeholder="Concentration"
          onChange={(evt) => {
           props.setConcentration(evt.target.value)}} />
        {units}
    </div>
  )
}