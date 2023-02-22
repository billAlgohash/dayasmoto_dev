import React from 'react'
import Slider from '@mui/material/Slider';


function PriceSlider({minPrice,maxPrice,priceRange,handleSingleSlider}) {
    // console.log(priceRange,minPrice)
  return (
    <>
        <div className = 'price_range'>
                <div className = 'label'>Price Range: </div> 

                {minPrice !== 'undefined' &&
                    <div className = 'price'>
                        {'AED '+ minPrice +' ~ '+'AED '+ maxPrice}
                    </div>
                }   
        </div>
        <Slider
            sx={{
                height:'1px',
                color: '#00FFD1',
            }}
            name = "price"
            getAriaLabel={() => 'price'}
            value={priceRange}
            onChange={(e)=>handleSingleSlider(e)}
        />
    </>
  )
}

export default PriceSlider