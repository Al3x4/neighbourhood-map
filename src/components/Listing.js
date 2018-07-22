import React, { Component } from 'react';

class Listing extends Component {

    state = {
        imageHtml : ''
    }
    // getPhoto(id) {
    //     fetch(
    //         `https://api.foursquare.com/v2/venues/${this.props.location.venue.id}/photos?v=20180701&venue&limit=1&client_id=${this.props.auth.client_id}&client_secret=${this.props.auth.client_secret}`
    //       )
    //       .then(response => response.json())
    //       .then(imageData => console.log(imageData))
    // }

    // componentDidMount(){
    //     this.getPhoto(this.props.location.venue.id)
    // }

    render () {
        
        return (
            <div className="listing">
                <h3>{this.props.location.name}</h3>
                <img src={this.props.location.categories[0].icon.prefix+'bg_'+32+this.props.location.categories[0].icon.suffix} alt={this.props.location.name}/>
                <p className="category">{this.props.location.categories[0].name}</p>
                <p className="address">{this.props.location.location.formattedAddress.join(', ')}</p>

            </div>
        )
    }

} 


export default Listing