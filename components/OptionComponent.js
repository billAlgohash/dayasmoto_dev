import React from 'react'


function OptionComponent({title, text, imageSrc}) {
  return (
    <div className='optionContainer'>

        <div className='leftCol'>
            <div>
                <div className='title'>
                    {title}
                </div>
                <div className='text'>
                    {text}
                </div>
            </div>
        </div>

        <div className='rightCol'>
            <img src={`/static/${imageSrc}`} alt="" />
        </div>


    </div>
  )
}

export default OptionComponent