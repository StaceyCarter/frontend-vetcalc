import React from "react";


// Caluclates the amount of drug required for the chosen mg per kg dose. 
// Calculates in mls for liquids and in number of tablets for tablets - pass in divisions to be used for tablets.
export default class Amount extends React.Component{

  calcAmountMls(dose, concentration, weight) {
    return (weight * dose) / concentration
  }

  calcNumberOfTabs(dose, weight, strength, divisions) {
    const numTabs = (dose * weight)/strength
    return Math.round(numTabs * divisions)/divisions
  }

  calc_amount() {
    const dose = parseFloat(this.props.dose);
    const weight = parseFloat(this.props.weight);
    const concentration = parseFloat(this.props.concentration);
    const form = this.props.drugForm;
    const divisions = parseInt(this.props.divisions);
    
    let amount;
  
    if (form === "liq"){
      amount = Math.round(this.calcAmountMls(dose, concentration, weight)*100)/100
      if (isNaN(amount) || amount === Infinity){
        amount = "Please enter a weight and concentration"
      }
    } else {
      amount = this.calcNumberOfTabs(dose, weight, concentration, divisions)
      if (isNaN(amount) || amount === Infinity){
        amount = "Please enter a weight and concentration"
      }
    }
    return amount
  }

  render(){
    const amount = this.calc_amount()

    return(
      <div>
        <h3>{amount} {(typeof amount !== "string") ? this.props.drugForm === "liq" ? "mls" : "tablets" : ""}</h3>
      </div>
    )
  }
  
}




