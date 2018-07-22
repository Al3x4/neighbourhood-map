import React, { Component } from 'react';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }
 
  initMap(){
    const google = this.props.google
    this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
  }

  componentDidMount(){
    this.initMap()
  }






  render() {
 
    return (
      <div id="map">
        loading map...
      </div>
      )
  }
}

export default MapContainer
