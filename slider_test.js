import React from "react"
import ReactDOM from "react-dom"
import anime from 'animejs/lib/anime.es.js'


class Slider extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event){
    this.setState({value : event.target.value})
    anime({
      targets: '.box',
      height: (this.state.value),
      easing: 'linear',
      direction: 'normal',
    });
  }

  render() {
    return(
    <div>
      <ValueInfo value={this.state.value} />
      <input type="range" min="1" max="100" list="tickmarks" value={this.state.value} onChange={this.handleChange} id="slider"></input>
      <datalist id="tickmarks">
        <option value="1" label="0%" />
        <option value="50" label="50%" />
        <option value="100" label="100%" />
      </datalist>
    </div>
    )
  }
}

class ValueInfo extends React.Component{
  render(){
    return(
      <div>
        <h1>{this.props.value}</h1>
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

class App extends React.Component{
  render(){
    return (
    <div>
    <h1>Hello world</h1>
    <Slider />
    <Box />
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


