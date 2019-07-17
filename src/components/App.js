import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

  }

  onFindPetsClick = () => {
    let url = "/api/pets"

    if (this.state.filters.type === "cat"){
      url += "?type=cat"
    } else if (this.state.filters.type === "dog"){
      url += "?type=dog"
    } else if (this.state.filters.type === "micropig"){
      url += "?type=micropig"
    }
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
      pets: json
      })
    })
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
      ...this.state.filters,
      type: e.target.value
    }
  })
  }

  onAdoptPet(id){
    this.state.pets.find(pet => {
      pet.id === id
      console.log(pet)
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default App
