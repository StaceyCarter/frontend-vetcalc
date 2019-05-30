import React from "react"
import ReactDOM from "react-dom"
import anime from 'animejs/lib/anime.es.js'
import Weight, {KgOrLbs} from './weight'
import LiqOrTabs from './drug_form'
import Concentration from './drug_concentration'
import Divisions from './tablet_divisions'
import MySlider from './dose_picker'
import Amount from './calc_amount'
import Frequency from './frequency'
import Duration from './duration'
import Label from './label'
import Route from './route'

class Form extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      weight : 0,
      units : "kg",
      weightInKgs : 0,
      drugForm : "liq",
      concentration : 0,
      divisions : 1,
      amount : 0,
      dose : 0,
      doseMin : 0,
      doseMax : 0,
      frequency : jinja.frequency,
      duration : jinja.duration,
      timeUnit : "days",
      route : "mouth"
    }

    this.setWeight = this.setWeight.bind(this)
    this.changeUnit = this.changeUnit.bind(this)
    this.setWeightInKgs = this.setWeightInKgs.bind(this)
    this.setDrugForm = this.setDrugForm.bind(this)
    this.setConcentration = this.setConcentration.bind(this)
    this.setDivisions = this.setDivisions.bind(this)
    this.setDose = this.setDose.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setMax = this.setMax.bind(this)
    this.setMin = this.setMin.bind(this)
    this.setFrequency = this.setFrequency.bind(this)
    this.setDuration = this.setDuration.bind(this)
    this.setTimeUnit = this.setTimeUnit.bind(this)
    this.setRoute = this.setRoute.bind(this)
  }
  // Responds to the form input (passed in as a prop) and updates the state accordingly.
  setWeight(weight){
    console.log("Weight from setWeight: ", weight)
    this.setState({
      weight : weight
    })
    this.setWeightInKgs(weight)
  }

  // Passed in as a prob to KgOrLbs which changes the unit state depending on which one the user has selected.
  changeUnit(newUnit) {
    this.setState({
      units: newUnit
    }, () => this.setWeightInKgs(this.state.weight));
  }

  // Checks what the current weight units are. If they are lbs, then converts the weight to kgs and updates the weight in kgs state. 
  setWeightInKgs(weight){
    if (this.state.units === "lbs"){
      this.setState({
        weightInKgs : (weight * 0.45359237).toFixed(2)
      }) 
    } else {
      this.setState({
        weightInKgs : weight
      })
    }
  }

  setDrugForm(newForm){
    this.setState({
      drugForm : newForm
    })
  }

  setConcentration(newConcentration){
    this.setState({
      concentration : newConcentration
    })
  }

  setDivisions(newDivision){
    this.setState({
      divisions : newDivision
    })
  }

  setDose(newDose){
    this.setState({
      dose : newDose
    })
  }

  setAmount(newAmount){
    let newAmountF = parseFloat(newAmount)
    this.setState({
      amount : newAmountF
    })
  }

  setFrequency(newFrequency){
    this.setState({
      frequency : newFrequency
    })
  }

  setDuration(newDuration){
    this.setState({
      duration : newDuration
    })
  }

  // Sets the min & max dose value of the form, according to what was calculated for the range slider in dose picker.
  setMin(newMin){
    let newMinF = parseFloat(newMin)
    this.setState({
      doseMin : newMinF
    })
  }

  setMax(newMax){
    let newMaxF = parseFloat(newMax)
    this.setState({
      doseMax : newMaxF
    })
  }

  setTimeUnit(newUnit){
    this.setState({
      timeUnit : newUnit
    })
  }

  setRoute(newRoute){
    this.setState({
      route : newRoute
    })
  }

  render(){
    return (
    <div>
    <h1>Hello world</h1>
    <Weight weight={this.state.weight} setWeight={this.setWeight} />
    <KgOrLbs changeUnit={this.changeUnit}/>
    <LiqOrTabs setForm={this.setDrugForm}/>
    <Route 
      setRoute = {this.setRoute}
      route = {this.state.route}/>
    <Concentration 
      drugForm={this.state.drugForm}
      setConcentration={this.setConcentration}
      concentration={this.state.concentration} />
    <Divisions 
      divisions={this.state.divisions}
      setDivisions={this.setDivisions}
      drugForm={this.state.drugForm}/>
    <MySlider
      setDose = {this.setDose} 
      setDoseMin = {this.setMin}
      setDoseMax = {this.setMax}/>
    <Amount 
      weight={this.state.weightInKgs}
      divisions={this.state.divisions}
      concentration={this.state.concentration}
      changeAmount={this.setAmount} 
      amount = {this.state.amount}
      drugForm = {this.state.drugForm} 
      dose={this.state.dose} 
      doseMin={this.state.doseMin}
      doseMax={this.state.doseMax}/>
    <Frequency 
      setFrequency={this.setFrequency} />
    <Duration 
      setDuration={this.setDuration}
      duration={this.state.duration}
      timeUnit={this.state.timeUnit}
      updateUnit={this.setTimeUnit} />
    <Label 
      weight={this.state.weight} 
      units={this.state.units} 
      kgWeight={this.state.weightInKgs}
      drugForm = {this.state.drugForm}
      concentration = {this.state.concentration}
      divisions = {this.state.divisions}
      amount = {this.state.amount}
      dose = {this.state.dose}
      minDose = {this.state.doseMin}
      maxDose = {this.state.doseMax}
      frequency = {this.state.frequency}
      duration = {this.state.duration}
      timeUnit = {this.state.timeUnit}
      route = {this.state.route}/>
    </div>
    )
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
)