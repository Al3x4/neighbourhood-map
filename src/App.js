import React, { Component } from 'react';
import './App.css';

import MapContainer from './components/MapContainer';


class App extends Component {
  state = {
    initialCenter : {
      lat: 51.4183,
      lng: -0.2206
    }, 
    zoom: 15,
    forsquareAuth: {
      client_id: 'F0EHDYJ1YJ2DX2UT33IFNFFFHR3IDS0WTQTJ32T1W0EBWLJD', 
      client_secret:'SASVAIXLAW2T2MAKE4VSRSHGRGUWJSRMJZOPECEKYIQAZJYH'
    }, 
    places:[]

  }

  //
  componentDidMount() {
    this.getBars()
  }

  getBars() {
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${this.state.initialCenter.lat},${this.state.initialCenter.lng}&query=bar&v=20180701&client_id=${this.state.forsquareAuth.client_id}&client_secret=${this.state.forsquareAuth.client_secret}`
    )
    .then( response => response.json())
    .then(response => response.response.venues)
    .then(places => this.setState({places}))
  }

  render() {
    return (
      <MapContainer 
        initialCenter = {this.state.initialCenter} 
        zoom = {this.state.zoom} 
        places = {this.state.places} />
    );
  }
}

export default App
