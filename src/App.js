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
    places:[],
    filteredPlaces:[], 
    hoverVenue:{}

  }

  //
  componentWillMount() {
    this.getBars()
  }

  getBars() {
    fetch(
      `https://api.foursquare.com/v2/venues/explore?ll=${this.state.initialCenter.lat},${this.state.initialCenter.lng}&radius=1500&v=20180701&section=food&limit=15&client_id=${this.state.forsquareAuth.client_id}&client_secret=${this.state.forsquareAuth.client_secret}`
    )
    .then(response => response.json())
    .then(response => {
      if (response.meta.code === 200) {
        console.log(response)
        return response.response.groups[0].items
      } else {
        return [{venue: 'no locations'}]
      }
    })
    .then(response => {
      let places = response.map(place => place.venue);
      this.setState({places})
      console.log(this.state.places)
    })

  }

  setFilteredPlaces = (filteredData) => {
    if (filteredData.length !== this.state.filteredPlaces.length){
      this.setState({filteredPlaces: filteredData})
    }
    
  }

  highLightMarker(listing){
    //save the hovered listing name in state
    if ([...listing.classList].includes('listing')){
      let venue = listing.firstChild.innerText
      this.setState({hoverVenue:venue})
    } else {
      let venue = listing.parentElement.firstChild.innerText
      this.setState({hoverVenue:venue})
    }
    
  }

  showSidebar(){
    let button = document.querySelector('.showSidebar')
    document.querySelector('.sidebar').classList.toggle('open')
    button.classList.toggle('move')
    if([...button.classList].includes('move')) {
      button.innerText = '×'
    } else {
      button.innerText = '>>'
    }
  }

  render() {
    //if all goes well
    if (this.state.places[0] && this.state.places[0] !== 'no locations') {
      return (
        <div>
          <button className="showSidebar" onClick={this.showSidebar}>
            >>
          </button>

          <Sidebar places = {this.state.places} auth = {this.state.forsquareAuth} filterPlaces = {this.setFilteredPlaces} flag = {this.highLightMarker.bind(this)}/>
          <MapContainer hoverVenue = {this.state.hoverVenue} filteredPlaces = {this.state.filteredPlaces} places = {this.state.places} google = {this.props.google} config = {{
            center: this.state.initialCenter,
            zoom: this.state.zoom,
            mapTypeId: 'roadmap'
          }}/> 

             
        </div>
      )
    //if there's an error with fetching locations
    } else if (this.state.places[0] === 'no locations') {
        return (
        <div>     
          <div className='message'>UNABLE TO FIND LOCATIONS</div>
        </div>
      )

    } else {
    //until places get fetched, show a waiting message
      return (
        
        <p className='message'>Loading...</p> 
      )
    }

  
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(App)
