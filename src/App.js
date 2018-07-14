import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {apiKey} from './config.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      fahrenheit: "",
      celsius: "",
      image: "",
      description: "",
      location: ""
    }
    this.getLocationInfo = this.getLocationInfo.bind(this)
  }

  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocationInfo);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
  }
  
  getLocationInfo(position) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
            .then(response => {              
              let fahrenheit = response.data.main.temp * 1.8 + 32;
              this.setState({
                description: response.data.weather[0].description,
                celsius: response.data.main.temp,
                fahrenheit: fahrenheit,
                image: response.data.weather[0].icon,
                location: response.data.name
              })
          })
      }  

  render() {
    let icon = "http://openweathermap.org/img/w/" + this.state.image + ".png";

    return (
      <div className="body">
        <div className="container">
          <header>Your local weather in</header>
          <p>{this.state.location}</p>
          <img src={icon} />
          <p className="description">{this.state.description}</p>
          <p>{this.state.celsius}</p>
          <p>{this.state.fahrenheit}</p>
        </div>
      </div>
    )
  }
}



export default App;
