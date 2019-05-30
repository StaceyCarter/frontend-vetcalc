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
      <label>
        How many pieces can your tablets be divided into?
        <input type="number" value={this.props.divisions} onChange={(evt) => this.props.setDivisions(evt.target.value)} /> pieces
        <div className="tablet-image-container">
        <img src={image}></img>
        </div>
      </label>
    </div>
  )}
}