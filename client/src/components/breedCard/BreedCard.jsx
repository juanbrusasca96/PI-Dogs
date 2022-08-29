import React from 'react'
import './breedCard.css'

export default function BreedCard({ breed }) {

  return (

    <div className="card">
      <img className='card-image' src={breed.image} alt="" />
      <div className="heading">
        <h3>{breed.name}</h3>
        <div>
          {typeof breed.id === 'number' ?
            breed.temperament :
            breed.temperaments.map((temp, index) => ++index === breed.temperaments.length ? `${temp.name}` : `${temp.name}, `)}
        </div>
        <p>weight: {breed.minWeight} - {breed.maxWeight}</p>
        <p>height: {breed.minHeight} - {breed.maxHeight}</p>
      </div>
    </div>
  )
}
