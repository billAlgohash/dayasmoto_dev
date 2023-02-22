import React from 'react'

function MobileMenu({text,icon}) {
  return (
    <div className='menu'>
        <div className='icon'>
           <img src ={`/static/${icon}`}/>

        </div>
        <div className='text'>
            {text}

        </div>
    </div>
  )
}

export default MobileMenu