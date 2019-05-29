import React from "react";
import anime from 'animejs/lib/anime.es.js';


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
      // Calculates the current amount in mls. As well as the min and max for the current dose range slider.
      amount = Math.round(this.calcAmountMls(dose, concentration, weight)*100)/100
      let minAmount = Math.round(this.calcAmountMls(this.props.doseMin, concentration, weight))
      let maxAmount = Math.round(this.calcAmountMls(this.props.doseMax, concentration, weight))
      if (isNaN(amount) || amount === Infinity){
        amount = "Please enter a weight and concentration"
      } else{
        anime({
          targets: '.box',
          height: `${(amount - minAmount )/(maxAmount - minAmount) * 100 + 5}%`,
          easing: 'linear',
          direction: 'normal',
        });
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
        <Box />
        <h3>{amount} {(typeof amount !== "string") ? this.props.drugForm === "liq" ? "mls" : "tablets" : ""}</h3>
      </div>
    )
  }
  
}

class Box extends React.Component{
  render() {
    return (
    <div className='box-container'>
      <div className='box'></div>
    </div>
    )
  }
}




