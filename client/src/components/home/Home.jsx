import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreedContainer from '../breedContainer/BreedContainer'
import * as actions from '../../redux/actions/index'
import { Link } from 'react-router-dom';
import './home.css'
import Button from '../button/Button';

export default function Home() {
    const [input, setInput] = useState();
    const [selectTemperament, setSelectTemperament] = useState('All');
    const [selectApiDb, setSelectApiDb] = useState('All');
    const [sort, setSort] = useState('DBFirst');
    const [ascDes, setAscDes] = useState('asc');
    const [flag, setFlag] = useState(true);
    const dispatch = useDispatch();
    const breeds = useSelector((state) => state.breeds)
    const breedsFilter = useSelector((state) => state.breedsFilter)
    const temperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        input ? dispatch(actions.getBreedsByName(input, selectApiDb)) : dispatch(actions.getAllBreeds(selectApiDb))
        dispatch(actions.getAllTemperaments())
    }, [input, selectApiDb, dispatch])

    useEffect(() => {
        dispatch(actions.sort(sort, ascDes))
    }, [breeds, sort, ascDes])

    useEffect(() => {
        dispatch(actions.filterBreedsByTemperament(selectTemperament))
    }, [breeds, selectTemperament])

    useEffect(() => {
        if (flag && breeds.length !== 0) {
            let temperaments = []
            temperaments = breeds.map(breed => breed.temperament ? breed.temperament.split(/\s*(?:,|$)\s*/) : '')
            temperaments = temperaments.flat()
            temperaments = [...new Set(temperaments)]
            temperaments = temperaments.filter(temp => temp !== '')
            temperaments.sort((a, b) => a.localeCompare(b))
            temperaments = temperaments.map(temp => { return { name: temp } })
            let obj = { names: temperaments }
            fetch(`http://localhost:3001/temperaments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res => res.json()).catch(err => console.log(err))
            setFlag(false)
        }
    }, [breeds, flag])

    return (
        <div className='home'>
            <Link to='/form'>
                <Button text={'Create Breed'} />
            </Link>
            <div className='inputSelect'>
                <input type="text" onChange={(e) => setInput(e.target.value)} />
                <select onChange={(e) => setSelectTemperament(e.target.value)}>
                    <option value='All'>All</option>
                    {temperaments ?
                        temperaments.map(temp => <option value={temp.name}>{temp.name}</option>) :
                        <option>nada</option>
                    }
                </select>

                <select onChange={(e) => {
                    setSelectApiDb(e.target.value)
                }}>
                    <option value='All'>All</option>
                    <option value='API'>API</option>
                    <option value='DB'>DB</option>
                </select>

                <select onChange={(e) => setSort(e.target.value)}>
                    <option value='DBFirst'>DB first</option>
                    <option value='name'>Name</option>
                    <option value='weight'>Weight</option>
                </select>

                <select onChange={(e) => setAscDes(e.target.value)}>
                    <option value='asc'>Asc</option>
                    <option value='des'>Des</option>
                </select>
            </div>


            <BreedContainer breeds={selectTemperament === 'All' ? breeds : breedsFilter} />
        </div>
    )
}
