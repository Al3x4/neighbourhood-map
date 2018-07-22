import React, { Component } from 'react';

class MapContainer extends Component {
  state = {
    markers : [],
    //infowindow: new this.props.google.maps.InfoWindow(),
  }
 
  initMap(){
    const google = this.props.google
    this.map = new google.maps.Map(document.getElementById('map'), this.props.config)
    this.addMarkers()
  }

  componentDidMount(){
    this.initMap()
  }




  addMarkers = () => {
    const google = this.props.google
    let places = this.props.places.map(place => place.venue)
    console.log(places)

    const bounds = new google.maps.LatLngBounds()

    places.forEach(place => {
      
      const marker = new google.maps.Marker({
        position: {lat: place.location.lat, lng: place.location.lng},
        map: this.map,
        title: place.name
      })

      this.setState((state) => ({
        markers: [...state.markers, marker]
      }))
     bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
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
