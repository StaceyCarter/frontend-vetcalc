import React from "react"

export default function Route(props) {

  return (
    <div>
      <select value={props.route} onChange={(evt) => props.setRoute(evt.target.value)}>
        <option value="mouth">PO</option>
        <option value="subcutaneous (under the skin) injection">SQ</option>
        <option value="intramuscular (in the muscle) injection">IM</option>
        <option value="intravenous (in the vein) injection">IV</option>
      </select>
    </div>
  )
}