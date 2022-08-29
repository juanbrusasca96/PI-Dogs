import React from 'react'
import Button from '../button/Button'
import './pagination.css'

export default function Pagination({index, setPage}) {
  return (
    <div className='pagination'>
        <Button text={index} onClick={()=>setPage(index-1)}/>
    </div>
  )
}
