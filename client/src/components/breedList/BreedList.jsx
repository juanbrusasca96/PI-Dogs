import React from 'react'
import BreedCard from '../breedCard/BreedCard'
import './breedList.css'

export default function BreedList({ breeds }) {

    return (
        <div className='breedList'>
            {breeds ?
                breeds.map(breed => <BreedCard breed={breed} />)
                :
                <div></div>}
        </div>
    )
}
