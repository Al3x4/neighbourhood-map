import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends Component {
  render() {
    let { initialCenter, zoom, places } = this.props
    let bounds = new this.props.google.maps.LatLngBounds();

    //simplify the places array and make the bounds at the same time
    places = places.map(place => {
      return {
          id: place.venue.id,
          title: place.venue.name,
          location: {
            lat: place.venue.location.lat, 
            lng: place.venue.location.lng
          }
      }
    })

    //make the bounds
    places.map(place => bounds.extend(place.location))

    return (
      <Map 
        google = {this.props.google} 
        initialCenter = {initialCenter} 
        zoom = {zoom}
        bounds = {bounds}> 

        {places.map(place => <Marker key = {place.id} position = {place.location} title = {place.title} /> )}
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(MapContainer)
