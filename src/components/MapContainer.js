import React, { Component } from 'react';

class MapContainer extends Component {
  state = {
    markers : [],
    infowindow: new this.props.google.maps.InfoWindow(),
  }
 
  initMap(){
    const google = this.props.google
    this.map = new google.maps.Map(document.getElementById('map'), this.props.config)
    this.addMarkers()
  }

  componentDidMount(){
    this.initMap()
  }

  componentDidUpdate(prevProps){
    //show only markers filtered from the sidebar
     if (this.props.filteredPlaces !== prevProps.filteredPlaces) {
      this.state.markers.forEach(marker => marker.setVisible(false))
      this.addMarkers()
    }
    //highlight hovered marker
    if(this.props.hoverVenue !== prevProps.hoverVenue) {
      let hoverMarker = this.state.markers.find(marker => marker.title === this.props.hoverVenue)
      this.populateInfoWindow(hoverMarker, this.state.infowindow)
    }



  }

  addMarkers = () => {
    const google = this.props.google
    let infowindow = this.state.infowindow
    let places = []
    let markers =[]
    //only display markers for filtered location if there's a filtered locations list
    if (this.props.filteredPlaces[0]) {
      places = this.props.filteredPlaces
    } else {
      places = this.props.places
    }
    
    const bounds = new google.maps.LatLngBounds()

    places.forEach(place => {
      
      const marker = new google.maps.Marker({
        position: {lat: place.location.lat, lng: place.location.lng},
        map: this.map,
        title: place.name
      })

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })

      markers.push(marker)
     bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
    this.setState((state) => ({
        markers : markers
      }))
  }

  populateInfoWindow = (marker, infowindow) => {
    const defaultIcon = marker.getIcon()
    const {highlightedIcon, markers} = this.state
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker
      infowindow.setContent(`<h3>${marker.title}</h3>`)
      infowindow.open(this.map, marker)
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })
    }
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
