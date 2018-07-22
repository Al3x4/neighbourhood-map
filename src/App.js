import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';

import MapContainer from './components/MapContainer';
import Sidebar from './components/Sidebar';

class App extends Component {
  state = {
    initialCenter : {
      lat: 51.4183,
      lng: -0.2206
    }, 
    zoom: 18,
    forsquareAuth: {
      client_id: 'F0EHDYJ1YJ2DX2UT33IFNFFFHR3IDS0WTQTJ32T1W0EBWLJD', 
      client_secret:'SASVAIXLAW2T2MAKE4VSRSHGRGUWJSRMJZOPECEKYIQAZJYH'
    }, 
    places:[]

  }

  //
  componentWillMount() {
    this.getBars()
  }

  getBars() {
    fetch(
      `https://api.foursquare.com/v2/venues/explore?ll=${this.state.initialCenter.lat},${this.state.initialCenter.lng}&radius=2000&v=20180701&client_id=${this.state.forsquareAuth.client_id}&client_secret=${this.state.forsquareAuth.client_secret}`
    )
    .then(response => response.json())
    .then(response => {
      console.log(response.response.groups[0].items);
      return response.response.groups[0].items ? response.response.groups[0].items : []})
    .then(places => {this.setState({places})})

  }

  render() {
    if (this.state.places[0]) {
      return (
        <div>
          <MapContainer places = {this.state.places} google = {this.props.google} config = {{
            center: this.state.initialCenter,
            zoom: this.state.zoom,
            mapTypeId: 'roadmap'

          }}/>   
          <Sidebar places = {this.state.places} auth = {this.state.forsquareAuth}/>
             
        </div>
      )
    } else {
        return (
        <div>Please Wait</div>
      )
    }

  
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(App)
