import React, { Component } from 'react';
import './App.css';

function BoilingVerdict(props){
  if (props.celsius >=100) {
    return <p>The Water would boil.</p>
  } else {
    return <p>The Water wouldn't boil.</p>
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
       <legend>Enter temperature in {scaleNames[scale]}:</legend>
       <input 
            value={temperature}
            onChange={this.handleChange} 
            />
     </fieldset>
    );
  }
  
}

function toCelsius(fahrenheit){
  return (fahrenheit - 32) *5 /9;
}

function toFahrenheit(celsius) {
  return ( celsius * 9 /5) +32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) /1000;
  return rounded.toString();
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleCelsius = this.handleCelsius.bind(this);
    this.handleFahrenheit = this.handleFahrenheit.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsius(temperature){
    this.setState({scale:'c', temperature});
  }

  handleFahrenheit(temperature){
    this.setState({scale:'f', temperature});
  }
  
 render() {
   const {scale, temperature} = this.state;
   const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
   const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
   return (
     <div>
       <TemperatureInput scale="c" 
              temperature={celsius} 
              onTemperatureChange={this.handleCelsius}/>
       <TemperatureInput scale="f"
              temperature={fahrenheit} 
              onTemperatureChange={this.handleFahrenheit}/>

              <BoilingVerdict celsius={parseFloat(celsius)}></BoilingVerdict>
     </div>
   );
 }

}

export default Calculator;
