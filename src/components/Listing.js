import React, { Component } from 'react';

class Listing extends Component {


    render () {
        //each listing is a button and clicking or focus+enter opens the infowindow for the location
        return (
            <button tabIndex="0" className="listing" onClick={(e) => this.props.flag(e.target)}>
                <h3>{this.props.location.name}</h3>
                <img src={this.props.location.categories[0].icon.prefix+'bg_'+32+this.props.location.categories[0].icon.suffix} alt={this.props.location.name}/>
                <p className="category">{this.props.location.categories[0].name}</p>
                <p className="address">{this.props.location.location.formattedAddress.join(', ')}</p>

            </button>
        )
    }

} 


export default Listing