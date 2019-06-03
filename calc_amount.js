import React from "react";
import anime from 'animejs/lib/anime.es.js';
import half from './half.svg'
import quarter from './quarter.svg'
import whole from './whole.svg'
import threeQuarters from './threeQuarters.svg'
import syringe from './syringe-hand-drawn-tool.svg'
import { debounce } from 'lodash'




const animateSyringeStartAux = () => {
  anime({
    targets: '.box',
    height: '23%',
    easing: 'linear',
    direction: 'normal',
  })
}

const animateSyringeStart = debounce(animateSyringeStartAux, 100)

function animateSyringeFillAux(amount, minAmount, maxAmount){
  
  anime({
    targets: '.box',
    height: `${(amount - minAmount )/(maxAmount - minAmount) * 100 + 5}%`, //ADJUST TO REFLECT FILLING
    easing: 'linear',
    direction: 'normal',
  })
}

const animateSyringeFill = debounce(animateSyringeFillAux, 100)


// Caluclates the amount of drug required for the chosen mg per kg dose. 
// Calculates in mls for liquids and in number of tablets for tablets - pass in divisions to be used for tablets.
export default class Amount extends React.Component{

  render(){
    const amount = calcAmount(this.props.dose, this.props.weight, this.props.concentration, this.props.drugForm, this.props.divisions, this.props.doseMin, this.props.doseMax)

    console.log("amount from Amount class: ", amount)

    return(
      <div>
        {this.props.drugForm === "liq" ? 
          <Box /> : 
          <div className="tablet-amount-container">
          <Tablets amount={amount}/>
          </div>}
        
        
        <h3>{amount} {(typeof amount !== "string") ? this.props.drugForm === "liq" ? "mls" : "tablets" : ""}</h3>
      </div>
    )
  }
}

class Box extends React.Component{
  render() {
    return (
    <div className="syringe-fill-container">
    <img src={syringe} className="syringe"></img>
      <div className='box-container'> 
        <div className='box syringe-fill'></div>
      </div>
    </div>
    )
  }
}

// Returns the amount in numbers required for the current selections.
export function calcAmount(dose, weight, concentration, form, divisions, doseMin, doseMax){
  let amount;
  
  if (form === "liq"){
    // Calculates the current amount in mls. As well as the min and max for the current dose range slider.
    amount = Math.round(calcAmountMls(dose, concentration, weight)*100)/100
    let minAmount = Math.round(calcAmountMls(doseMin, concentration, weight))
    let maxAmount = Math.round(calcAmountMls(doseMax, concentration, weight))
    if (isNaN(amount) || amount === Infinity || weight === ""){
      amount = "Please enter a weight and concentration"
      animateSyringeStart();
    } else{
      animateSyringeFill(amount, minAmount, maxAmount);
    }
  } else {
    amount = calcNumberOfTabs(dose, weight, concentration, divisions)
    if (isNaN(amount) || amount === Infinity){
      amount = "Please enter a weight and concentration"
    }
  }
  return amount
}

function calcAmountMls(dose, concentration, weight) {
  return (weight * dose) / concentration
}

function calcNumberOfTabs(dose, weight, strength, divisions) {
  const numTabs = (dose * weight)/strength
  return Math.round(numTabs * divisions)/divisions
}

class Tablets extends React.Component{
  constructor(props){
    super(props)

  }

  renderImages(){
    console.log("running render images. props amount: ", this.props.amount)

    let splitAmount = (this.props.amount).toString().split(".")

    console.log("split amount: ", splitAmount)

    let wholeTabs = parseInt(splitAmount[0])
    let fractionTabs = parseInt(splitAmount[1])

    console.log(wholeTabs)

    return (
      <div>
      <WholeTabImage number={wholeTabs} />
      <FractionImage fraction={fractionTabs}/>
      </div>
    )
  }

  render(){
    // Handles case when the input amount is a string (ie weight or concentration hasn't been entered) 
    if (typeof this.props.amount === "string"){
      return ""
    }
    // Split based on . - first number dictates how many whole images to render, 2nd number dictates the fraction.
    return(
      <div>
        {this.renderImages()}
      </div>
    )
  }
}

//Renders the number of tablets that is required.
function WholeTabImage(props){

  let list = []

  for (let i =0 ; i < props.number; i++){
    list.push(i)
  }

  return(
    <div className="amount-container">
    {list.map(i => {
      return <img src={whole} className="tablet-amount" key={i}></img>
    })}
    </div>
  )
}

// Returns correct fractioned tablet image, depending on the props. 
function FractionImage(props){
  let image;
  if (props.fraction === 5){
    image = half;
  } else if (props.fraction === 75){
    image = threeQuarters
  } else if (props.fraction === 25){
    image = quarter
  } else {
    return ""
  }
  return (<img src={image} className="tablet-amount"></img>)
}

