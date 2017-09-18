import React, { Component } from 'react'
import $ from 'jquery'

const GEO_KEY = 'AIzaSyCJ8HfIvI5tgDU58HC_jUY7v_Mjydfyc7g'
const GEO_URL = 'https://www.googleapis.com/geolocation/v1/geolocate?key='

const REVERSE_GEO_KEY = 'AIzaSyBieTD6iDpa-u6AFDRrJT4aivJtmQUwl4g'
const REVERSE_GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json?'

const FCC_WEATHER_URL = 'https://fcc-weather-api.glitch.me/api/current?'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: null,
      latitude: null,
      city: null,
      temperature: null,
      pressure: null,
      humidity: null
    }
  }

  componentDidMount() {
    const _self = this

    _self.getGeoLocation()
    .then(({longitude, latitude}) => {
      this.getCity(_self, { longitude, latitude })
      this.getMain(_self, { longitude, latitude })
    })
  }

  render() {
    if (!this.state.longitude && !this.state.latitude) {
      return (
        <div className="row">
          <div className="col-xs-12 text-xs-center">
            <i className="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="city-container col-xs-12">
            <h1 className="city text-xs-center">{this.state.city}</h1>
          </div>
        </div>
        <div className="row">
          <div className="temperature-container col-xs-12">
            <p className="temperature text-xs-center">{(this.state.temperature * (9 / 5) + 32).toFixed(0)} °F</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3" />
          <div className="pressure-container col-xs-3 text-xs-center">
            <p className="pressure-title">Pressure</p>
            <p className="pressure">{this.state.pressure} hPa</p>
          </div>
          <div className="humidity-container col-xs-3 text-xs-center">
            <p className="humidity-title">Humidity</p>
            <p className="humidity">{this.state.humidity} %</p>
          </div>
          <div className="col-xs-3" />
        </div>
      </div>
    )
  }

  getGeoLocation() {
    let _self = this

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: `${GEO_URL}${GEO_KEY}`,
        success({location}) {
          _self.setState({
            longitude: location.lng,
            latitude: location.lat
          })

          resolve({
            longitude: _self.state.longitude,
            latitude: _self.state.latitude
          });
        }
      })
    })
  }

  getCity(_self, { longitude, latitude }) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${REVERSE_GEO_URL}latlng=${latitude},${longitude}&key=${REVERSE_GEO_KEY}`,
        success({results}) {
          const city = `${results[0]['address_components'][2]['long_name']}, ${results[0]['address_components'][4]['long_name']}`
          _self.setState({ city })

          resolve()
        }
      })
    })
  }

  getMain(_self, { longitude, latitude }) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${FCC_WEATHER_URL}lon=${longitude}&lat=${latitude}`,
        success({main}) {
          _self.setState({
            temperature: main.temp,
            humidity: main.humidity,
            pressure: main.pressure
          })

          resolve()
        }
      })
    });
  }
}