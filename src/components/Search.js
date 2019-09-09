import React from "react"

class Search extends React.Component{
    handleInput = (event) => {
        this.props.handleInput(event.target.value)
    }    

    render(){
        return(
            <input type="text" onInput={this.handleInput} placeholder="Search... " />
        )
    }   
}

export default Search