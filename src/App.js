import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {apiKey} from './config.js';

class App extends Component {
  constructor(){
    super()
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
        navigator.geolocation.getCurrentPosition(getLocationInfo);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }

    getLocationInfo(position){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
            .then(response => {
              this.setState({
                description: response.data.weather[0].description,
                fahrenheit: response.data.main.temp,
                image: response.data.weather[0].icon,
                location: response.data.main.name
              })
          })
      }
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
          <p>{this.state.fahrenheit}</p>
        </div>
      </div>
    );
  }
}


export default App;
