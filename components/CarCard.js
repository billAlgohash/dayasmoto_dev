import React, { useEffect, useState } from 'react'
import getImageUrl from '../hooks/getImageUrl'
import useScreenSize from '../hooks/useScreenSize'
import formatPrice from '../utils'

const CarCard = ({id, carData})=>{


    const imageUrl = getImageUrl(carData)

    return (
        <a href={`/buy/detail/${id}`}>

            <div className="carItem" key = {id}>
                    
                <div className="title"
                    // style = {{backgroundColor: carData.THUMBNAIL ? '#00EDDF':'black'}}
                >
                    <div className='imageContainer'>
                        <picture>
                            <img src={imageUrl} alt=""/>
                            {/* <img src = {baseURL+image_name} alt=""/> */}
                            {/* "https://dayasmoto.com/pic/BMW001_9/01.jpg" */}

                        </picture>

                    </div>

                    <p>
                        {carData?.NAME}

                    </p>
                    <p>
                        AED {formatPrice(carData.PRICE)}
                    </p>
                </div>

                <ul>
                    <div className='ul-col'>

                        <li >
                            <div className='icon-container'>
                                <img src = '/static/smallIcon1.svg'/>
                            </div>

                            <div className='data'>
                                {formatPrice(carData.MILEAGE)} KMS
                            </div>
                        </li>

                        <li>
                            <div className='icon-container'>
                                <img src = '/static/smallIcon2.svg'/>
                            </div>

                            <div className='data'>
                            {carData.TRANSMISSION}
                            </div>
                        </li>

                    </div>

                    <div className='ul-col'>
                        <li>
                            <div className='icon-container'>
                                <img src = '/static/smallIcon3.svg'/>
                            </div>

                            <div className='data'>
                                {carData.BODYTYPE}
                            </div>
                        </li>
                        
                        <li>
                            <div className='icon-container'>
                                <img src = '/static/smallIcon4.svg'/>
                            </div>

                            <div className='data'>
                            {carData.FUEL}
                            </div>
                        </li>
                    </div>

                </ul>

                <div className = 'ViewDetailsButton' >
                    Details  
                    <img src= '/static/arrow_black.svg'/>   
                </div>
            </div>
        </a>
    )
}

export default CarCard