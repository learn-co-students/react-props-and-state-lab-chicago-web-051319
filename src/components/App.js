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

  onChangeType=(e)=>{
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  setPets=(data)=>{
    this.setState({
      pets: data
    })
  }

  onFindPetsClick=(e)=>{
    const baseURL = '/api/pets'
    const pet = this.state.filters.type
    if (pet==='all'){
      fetch(baseURL)
      .then(resp=>resp.json())
      .then(data=>this.setPets(data))
    }else{
      fetch(`${baseURL}?type=${pet}`)
      .then(resp=>resp.json())
      .then(data=>this.setPets(data))
    }
  }

  onAdaptPet =(id) => {
    const pets = this.state.pets.map(pet => {
    return pet.id === id ? {...pet, isAdopted: true} : pet
   })
   this.setState({
     pets
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet= {this.onAdaptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
