import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends Component {
  render() {
    let { initialCenter, zoom, places } = this.props
    places = places.map(place => {
      return {
          id: place.id,
          title: place.name,
          location: {
            lat: place.location.lat, 
            lng: place.location.lng
          }
        
      }
    })

    console.log(initialCenter, places)
    return (
      <Map 
        google = {this.props.google} 
        initialCenter = {initialCenter} 
        zoom = {zoom}> 

        {places.map(place => <Marker key = {place.id} position = {place.location} name = {place.title} /> )}
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(MapContainer)
