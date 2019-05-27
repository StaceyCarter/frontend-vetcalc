import React from "react"

function KgOrLbs(props){
  return(
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      <label className="btn btn-secondary active">
        <input type="radio" name="kg" id="option1" autoComplete="off" /> kg
      </label>
      <label className="btn btn-secondary">
        <input type="radio" name="options" id="option2" autoComplete="off" /> lbs
      </label>
    </div>
  )
}

// Renders a weight input form and sets weight state in Form.
export default function Weight(props) {
  const setWeightFromEvent = (e) => {
    props.setWeight(parseFloat(e.target.value))
  }

  return (
  <div>
    <label>
      Weight: <input type="text" name="weight" value={props.weight} onChange={setWeightFromEvent}/>
    </label>
    <KgOrLbs />
  </div>
  )
}

