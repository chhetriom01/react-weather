import React, { Component } from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "1bb844a1a4adaf1ec027c5c0351a7fa1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,

    }
  }

  getWeather = async (e) => {
    e.preventDefault();// prevent from reloading without returing the object
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}l&appid=${API_KEY}&units=metric`);
    // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=pokhara&appid=1bb844a1a4adaf1ec027c5c0351a7fa1&units=metric`);
    
    const data = await api_call.json();

    console.log(data)
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,


    });
  }

  render() {
    return (
      <div >
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
