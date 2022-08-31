import React from 'react'
import { Link } from 'react-router-dom'
import './breedCard.css'

export default function BreedCard({ breed }) {

  return (

    <div className="card">
      <img className='card-image' src={breed.image} alt="" />
      <div className="heading">
        <Link to={`/detail/${breed.id}`} style={{ textDecoration: 'none' }}>
          <h3>{breed.name}</h3>
        </Link>
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
