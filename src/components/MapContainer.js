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
    const google = this.props.google
    //show only markers filtered from the sidebar
     if (this.props.filteredPlaces !== prevProps.filteredPlaces) {
      this.state.markers.forEach(marker => marker.setVisible(false))
      this.addMarkers()
    }
    //highlight hovered marker
    if(this.props.hoverVenue !== prevProps.hoverVenue) {
      let hoverMarker = this.state.markers.find(marker => marker.title === this.props.hoverVenue)
      this.populateInfoWindow(hoverMarker, this.state.infowindow)
      hoverMarker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => {
        hoverMarker.setAnimation(null)
      }, 500)
    }



  }

  addMarkers = () => {
    const google = this.props.google
    let infowindow = this.state.infowindow
    let places = []
    let markers = []

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

      markers.push(marker)

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })

      bounds.extend(marker.position)

    })

    this.map.fitBounds(bounds)

    this.setState({markers})
  }
  populateInfoWindow = (marker, infowindow) => {
    const {highlightedIcon, markers} = this.state
    const google = this.props.google
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {

      infowindow.marker = marker
      
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })

      infowindow.setContent('<div>' + marker.title + '</div><div id="pano">Street View Loading</div>')
      let panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'))

      //code for showing location in infowindow

      let sw = new google.maps.StreetViewService()

      sw.getPanorama({location: marker.position, radius: 50}, (results, status) => {
        if (status === 'OK') {

          let heading = google.maps.geometry.spherical.computeHeading(results.location.latLng, marker.position)
          panorama.setPano(results.location.pano);
          panorama.setPov({
              heading: heading,
              pitch: 0
            });
          panorama.setVisible(true)
          

        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>')
        }
      })

      // Open the infowindow on the correct marker.
      infowindow.open(this.map, marker)
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
