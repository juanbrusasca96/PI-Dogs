import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import './index.css'

export default function index() {
    return (
        <div className='index'>
            <Link to='/breeds'>
                <Button text={'Home'}/>
            </Link>
        </div>
    )
}
