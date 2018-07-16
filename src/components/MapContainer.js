import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    let { initialCenter, zoom, places } = this.props
    let bounds = new this.props.google.maps.LatLngBounds();

    //simplify the places array and make the bounds at the same time
    places = places.map(place => {
      return {
          id: place.venue.id,
          name: place.venue.name,
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
        bounds = {bounds}
        onClick={this.onMapClicked}> 

        {places.map(place => <Marker key = {place.id} position = {place.location} title = {place.name}  onClick={this.onMarkerClick}/>)}
        {places.map(place => {
          return(
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.title}</h1>
                </div>
            </InfoWindow>
          )}

          )}

        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(MapContainer)
