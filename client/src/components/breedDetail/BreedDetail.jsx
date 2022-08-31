import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import * as actions from '../../redux/actions/index'
import Button from '../button/Button';
import './breedDetail.css'

export default function BreedDetail() {
    const { id } = useParams();
    const breedDetail = useSelector((state) => state.breedDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getBreedDetail(id))
    }, [])

    console.log(breedDetail);
    return (
        <div className='breedDetail'>
            {
                breedDetail ?
                    <div>
                        <h2>{breedDetail.name}</h2>
                        <img className='' src={breedDetail.image} alt="" />
                        <div>
                            {typeof breedDetail.id === 'number' ?
                                breedDetail.temperament :
                                typeof breedDetail.id === 'string' ? breedDetail.temperaments.map((temp, index) => ++index === breedDetail.temperaments.length ? `${temp.name}` : `${temp.name}, `) : ''}
                        </div>
                        <p>weight: {breedDetail.minWeight} - {breedDetail.maxWeight}</p>
                        <p>height: {breedDetail.minHeight} - {breedDetail.maxHeight}</p>
                        {
                            breedDetail.startLifeSpan ?
                                <p>life span: {breedDetail.startLifeSpan} - {breedDetail.endLifeSpan}</p> : ''
                        }
                        <Link to='/breeds'>
                            <Button text={'Go Back'} />
                        </Link>
                    </div> :
                    <div></div>
            }
        </div>
    )
}
