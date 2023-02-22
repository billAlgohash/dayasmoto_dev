import React, { useState } from 'react'
import getImageUrl from '../hooks/getImageUrl'
import formatPrice from '../utils'


// using the the same style as that of CarCardMobile
function TyreCard({id, tyreData, detailPage = false, units}) {
    // console.log(tyreData)
    const imageUrl = getImageUrl(tyreData, 'tyre')
  const [thumbnailUrl, setThumbnailUrl] = useState(imageUrl)


  return (
    // <a href={`/buy/detail/${id}`} onClick={(e)=>{e.preventDefault()}}>
            <div className="tyre_card" key = {id}>
                    
                <div className='image_container'
                >
                
                    <img src={thumbnailUrl} alt="" />

                
                    
                </div>
                {/* {units &&
                 <div className='cart_units'>{units} units</div>
                } */}

                <div className='details_container'>
                    
                        <div className='brand'> {tyreData.BRAND} </div>
                        <div className='size'>{tyreData.SIZE} </div>
                        <div className='quantity'> 
                            <img src = 'static/tyre_qty_icon.svg'/>
                            <img src = 'static/tyre_qty_icon_1.svg'/>
                            <span>{tyreData.QTY40HQ} QTY Per Container</span>
                            
                        </div>
                        <div className='pills_container'>
                            <div className='pill'>
                                <div className='name'> 
                                    <img src = 'static/pill_1_icon.svg'/> 
                                    <span>Type</span>
                                </div>
                                <div className='value'> {tyreData.TYPE}</div>
                                
                            </div>
                            <div className='pill'>
                                <div className='name'> 
                                    <img src = 'static/pill_2_icon.svg'/> 
                                    <span>LI_SR</span>
                                </div>
                                <div className='value'> {tyreData.LI_SR}</div>
                            </div>
                            
                            <div className='pill'>
                                <div className='name'> 
                                    <img src = 'static/pill_2_icon.svg'/> 
                                    <span>Pattern</span>
                                </div>
                                <div className='value'> {tyreData.PATTERN}</div>
                                
                            </div>
                        </div>
                        
                        <div className='price'>
                            AED {formatPrice(tyreData.RETAILPRICE.slice(1))}
                        </div>
                 
                </div>

                {/* {units &&
                 <div className='cart_units'>{units} units</div>
                } */}


            </div>
        // </a>
  )
}

export default TyreCard