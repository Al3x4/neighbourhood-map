import React, { Component } from 'react';

import Listing from './Listing'

class Sidebar extends Component{
    state = {
        query : '', 
    }

    updateQuery = (inputedQuery) => {
    this.setState({ query : inputedQuery})
    }

    render() {
    const {query} = this.state;
    let places = this.props.places

    if (query) {
        //is there is a match, filter.
        //TODO: rewrite this with REGEX
        places = places.filter(place => place.name.toUpperCase().includes(query.toUpperCase()))
    }
    
    this.props.filterPlaces(places)

    return (
        <div className="sidebar">
            <div className="search-listings-bar" >
                
                <input 
                    type="text" 
                    placeholder="Filter list by venue name"
                    value = {query} 
                    onChange = {(event) => this.updateQuery(event.target.value)}
                    
                /> 
               
                  
            </div>
            <div className="forsquare">
                
            </div>
            <div className="locations">
                <ul>
                    {places.map(location => <Listing key = {location.id} location = {location} auth = {this.props.auth} flag={this.props.flag}/>)}
                </ul>
            </div>
        </div>
    )
    }
}


export default Sidebar