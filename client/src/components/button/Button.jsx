import React from 'react'
import './button.css'

export default function Button({text, onClick}) {
  return (
        <button onClick={onClick} className='button'>
            {text}
        </button>
  )
}
