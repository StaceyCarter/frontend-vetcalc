import React from "react"
import half from './half.svg'
import halfDivision from './halfDivision.svg'
import quarterDivision from './quarterDivision.svg'
import whole from './whole.svg'
import thirdsDivision from './thirdsDivision.svg'
import sixsDivision from './sixsDivision.svg'
import eigthsDivision from './eigthsDivision.svg'

export default class Divisions extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      image : whole
    }

    this.pickImage = this.pickImage.bind(this)
  }
  
  pickImage(num) {
    num = parseInt(num)
    if (num === 2){
      return halfDivision
    } else if (num === 4){
      return quarterDivision
    } else if (num === 3){
      return thirdsDivision
    } else if (num === 6){
      return sixsDivision
    } else if (num === 8){
      return eigthsDivision
    } else {
      return whole
    }
  }
  render() {
  let display = (this.props.drugForm === "liq")? 'hide' : '';
  let image = this.pickImage(this.props.divisions)

  return (
    <div className={display}>
    <div className="form-inline">
    <div className="form-group">
      <label>
        How can the tablet be divided?
        </label>
        {/* Could be used in the future if we have more animations - not just for 0.25, 0.5 and 0.75 */}
        {/* <input type="number" value={this.props.divisions} onChange={(evt) => this.props.setDivisions(evt.target.value)} /> pieces */}
        <select className="form-control" value={this.props.divisions} onChange={(evt) => this.props.setDivisions(evt.target.value)}>
          <option value={1}>Whole only</option>
          <option value={2}>Halved</option>
          <option value={4}>Quartered</option>
      </select>
        <div className="tablet-image-container">
        <img src={image}></img>
        </div>
        </div>
      </div>
    </div>
  )}
}