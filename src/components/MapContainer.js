import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends Component {
  render() {
    let {initialCenter, zoom} = this.props
    console.log(initialCenter, zoom)
    return (
      <Map 
        google = {this.props.google} 
        initialCenter = {initialCenter} 
        zoom = {zoom}> 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGvikmN6Urac_NbXkw3KPspDBbBfgvL7I'
})(MapContainer)
