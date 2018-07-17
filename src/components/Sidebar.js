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
        places = places.filter(place => place.venue.name.includes(query))
    }

    return (
        <div className="sidebar">
            <div className="search-listings-bar">
                <input 
                    type="text" 
                    placeholder="Filter list"
                    value = {query} 
                    onChange = {(event) => this.updateQuery(event.target.value)}
                />   
            </div>
            <div className="locations">
                <ul>
                    {places.map(location => <Listing location={location}/>)}
                </ul>
            </div>
        </div>
    )
    }
}


export default Sidebar