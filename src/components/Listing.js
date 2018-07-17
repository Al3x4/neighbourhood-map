import React, { Component } from 'react';

class Listing extends Component {
    render () {
        
        return (
            <div className="listing">
                <h3>{this.props.location.venue.name}</h3>

            </div>
        )
    }

} 


export default Listing