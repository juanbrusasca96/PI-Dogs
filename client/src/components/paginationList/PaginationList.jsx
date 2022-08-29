import React from 'react'
import Pagination from '../pagination/Pagination'
import './paginationList.css'

export default function PaginationList({ quantity, setPage }) {

  let pages = []

  for (let i = 1; i <= quantity; i++) {
    pages.push(i)
  }
  return (
    <div className='paginationList'>
      {
        pages.map(p => <Pagination index={p} setPage={setPage} />)
      }
    </div>
  )
}
