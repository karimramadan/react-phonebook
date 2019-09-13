import React from "react"

class Search extends React.Component{
    handleSearch = (event) => {
        this.props.handleSearch(event.target.value)
    }    

    render(){
        return(
            <input type="search" onChange={this.handleSearch} placeholder="Search... " />
        )
    }   
}

export default Search