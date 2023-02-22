import React from 'react'

function ReviewComponent({title, text, name}) {
  return (
    <div className='reviewContainer' >

        <img className = "backgroundImage" src = {'/static/dayasmoto_logo_wht_1000px.png'}/>
        <div className='title'>
            "{title}"
        </div>

        <div className='des'>
            <p>
                "{text}"
        
            </p>

        </div>
        <div className='stars'>
            <img src="/static/stars.png" alt="" />

        </div>
        <div className='author'>
            <p>
                {name}
            </p>
        </div>

    </div>
  )
}

export default ReviewComponent