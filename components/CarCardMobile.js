import React, { useContext, useState } from 'react'
import formatPrice from '../utils'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CartContext from '../layout';
import { Data } from '@react-google-maps/api';
import useScreenSize from '../hooks/useScreenSize';
import { red } from '@mui/material/colors';
import getImageUrl from '../hooks/getImageUrl';

const CardCardMobile = ({data, detailPage = false,featuredCar})=>{

    const carData = data?.attributes
    const imageUrl = getImageUrl(carData)

    const [thumbnailUrl, setThumbnailUrl] = useState(imageUrl)
    
    const renderCards = () => {
        // console.log(carDetail)

        const index = carData.IMAGES.indexOf('_')
        const numImages = Math.floor(carData.IMAGES.slice(index+1))
        

        let result = []
        for (let i = 0; i < numImages; i++) {

            let source

            if (i<9){
                source = imageUrl.slice(0,-7)+`/0${i+1}.jpg`
            }else{
                source =  imageUrl.slice(0,-7)+`/${i+1}.jpg`

            }
            // console.log('img src: ', source)
            result.push(
                <SwiperSlide>
                    <div key = {i} className="swiper_item" onClick={(e)=>{e.preventDefault();setThumbnailUrl(source)}}>
                        <img src={source} alt="" />
                    </div>
                </SwiperSlide>
            )
        }
        return result;
    }
    // const navigate = useNavigate(); 
    const number = useScreenSize()

    const {cartItems, setCartItems} = useContext(CartContext)

    const textDriveClick = ()=>{

        const newObj = carData

        

        const existingIds = cartItems.map((item)=>item.id)
        const isIncluded = existingIds.includes(data.id)
        // console.log('isIncluded: ',isIncluded)

        let newList = cartItems
        if(!isIncluded){

            newList = [...cartItems, {qty:1,timestamp: Date.now(),...data}]
        }

        setCartItems(newList)
        window.localStorage.setItem("cart", JSON.stringify(newList))
        // console.log('cart: ',cartItems)
        

    }
    
    
    

    const bookCarClick = ()=>{

        const message = `I want to enquire about the following car: \n
            Id: ${data.id}
            Stock Number: ${carData.SKU}
            Exterior Color: ${carData.COLOR}
            Trim: ${carData.TRIM}
            Model Year: ${carData.YEAR}
            Body: ${carData.BODYTYPE}
            Mileage: ${carData.MILEAGE}
            Fuel: ${carData.FUEL}
            Engine: ${carData.ENGINE}
            Transmission: ${carData.TRANSMISSION}
            Condition: ${carData.CONDITION}
            `
        // console.log('message:',message)

        const whatsAppAPI = `https://api.whatsapp.com/send/?phone=85295128140&text=${message}&type=phone_number&app_absent=0`
        // console.log('card clicked..',e)

        // detailPage && e.target.innerText !== 'Book a Car' &&  e.preventDefault()
        window.location.href = whatsAppAPI;
        

    }

    return (

        <div className="carItem_mobile" key = {data.id}>
                
            <div className='top' style = {{flexDirection: detailPage?'row':'column'}}>

                <div className='image_container'>
                    <img src={thumbnailUrl} 
                    alt="" 
                    style = 
                        {{
                            // height: detailPage?'100%':featuredCar? '12rem':'14rem',
                            height: detailPage?'100%':'12rem',

                            objectFit:carData.THUMBNAIL?'cover':'contain'
                            
                        }}
                    />
                 
                </div>

            
                    {number > 1 &&

                        <div className='details' style = {{gap: detailPage? '0.5rem':'1rem'}}>
                            <div className='name'> {carData.NAME} </div>
                            {detailPage  &&
                                <>
                                    {/* <div className='mileage'>{formatPrice(carData.MILEAGE)} KMS</div> */}
                                    <div className='pills_container' 
                                        style = {{
                                            marginBottom:carData.THUMBNAIL?'':'0.5rem',
                                            margin:detailPage? '0rem':''
                                        }}>
                                        <div className='transmission pill'> {carData.TRANSMISSION}</div>
                                        <div className='fuel pill'>{carData.FUEL}</div>
                                        <div className='engine pill'>{carData.ENGINE}</div>

                                    </div>
                                </>
                            }
                            <div className='mileage_price' style={{flexDirection: detailPage? 'column':'row'}}>

                                <div className='price' style = {{marginTop: detailPage? '0.7rem':''}}>
                                    
                                    AED {formatPrice(carData.PRICE? carData.PRICE :carData.RETAILPRICE)}
                                </div>
                            </div>

                            {number > 1 &&
                                <>
                                    <div className='emi_text'>
                                
                                        <div className='emi'>
                                            AED {formatPrice(Math.round(
                                            (0.8 * carData?.PRICE) / (5 * 12) + ((carData?.PRICE * 299 / 10000) / 12)))} / month
                                        </div>
                                        
                                        <div className='text'>
                                            20% Down Payment For 5 Years through bank
                                        </div>

                                    </div>

                                    {detailPage &&

                                        <div className='warranty_rta'>
                                            <div className='rowItem'>
                                                <div>
                                                    <img src = '/static/warranty_icon.svg'/>
                                                    <span>
                                                        Warranty: {carData.WARRANTY.charAt(0).toUpperCase()+ carData.WARRANTY.slice(1).toLowerCase()}
                                                    </span>

                                                </div>

                                                <div className='rowButton' >
                                                    
                                                        <div
                                                    
                                                            onClick={(e)=>bookCarClick(e)}
                                                        >
                                                            Book Car
                                                        </div>

                                                
                                                </div>
                                                
                                            </div>
                                            <div className='rowItem'>
                                                <div>
                                                    <img src = '/static/rta_icon.svg'/>
                                                    <span>
                                                        RTA Inspection: {carData.RTA.charAt(0).toUpperCase()+ carData.RTA.slice(1).toLowerCase()}

                                                    </span>

                                                </div>

                                                <div className='rowButton' onClick={(e)=>textDriveClick(e)}>
                                                    <span>Test Drive</span>
                                                </div>
                                                
                                            </div>

                                        </div>
                                        
                                    }
                                </>
                            }

                        </div>
                    }

                {!detailPage&&
                
                    <div className='pills_container' style = {{marginBottom:carData.THUMBNAIL?'1rem':'0.5rem'}}>
                        <div className='transmission pill'> {carData.TRANSMISSION}</div>
                        <div className='fuel pill'>{carData.FUEL}</div>
                        <div className='engine pill'>{carData.ENGINE}</div>

                    </div>
                }
            
                
            </div>

            {detailPage && carData.THUMBNAIL && 
                <div className='swiper'>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={number > 1? 5:3}
                        navigation = {number > 1}
                        autoPlay={{ delay: 5000 }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        {renderCards()}
                    </Swiper>
                </div>

            }

            {number === 1 &&
                <>
                    <div className='details' style = {{gap: detailPage? '0.2rem':'1rem'}}>
                        <div className='name'> {carData.NAME} </div>

                        {detailPage  &&
                            <div className='mileage'>{formatPrice(carData.MILEAGE)} KMS</div>
                        }
                        {detailPage&&
                        
                            <div className='pills_container' 
                                style = {{
                                    marginBottom:carData.THUMBNAIL?'':'0.5rem',
                                    margin:detailPage? '0rem':''
                                }}>
                                <div className='transmission pill'> {carData.TRANSMISSION}</div>
                                <div className='fuel pill'>{carData.FUEL}</div>
                                <div className='engine pill'>{carData.ENGINE}</div>

                            </div>
                        }

                        <div className='mileage_price' style={{flexDirection: detailPage? 'column':'row'}}>

                            {!detailPage &&
                                <div className='mileage'>{formatPrice(carData.MILEAGE)} KMS</div>
                            }
                            <div className='price'
                            style = {{marginTop: detailPage? '1.2rem':''}}
                            >
                                AED {formatPrice(carData.PRICE? carData.PRICE :carData.RETAILPRICE)}
                            </div>
                        </div>
                    
                    </div>
            
                    
                    <div className='emi_text'>
                
                        <div className='emi'>
                            AED {formatPrice(Math.round(
                            (0.8 * carData?.PRICE) / (5 * 12) + ((carData?.PRICE * 299 / 10000) / 12)))} / month
                        </div>
                        
                        <div className='text'>
                            20% Down Payment For 5 Years through bank
                        </div>

                    </div>

                    {detailPage &&

                        <div className='warranty_rta'>
                            <div className='rowItem'>
                                <div>
                                    <img src = '/static/warranty_icon.svg'/>
                                    <span>
                                        Warranty: {carData.WARRANTY.charAt(0).toUpperCase()+ carData.WARRANTY.slice(1).toLowerCase()}
                                    </span>

                                </div>

                                <div className='rowButton' >
                                    
                                        <div
                                    
                                            onClick={(e)=>bookCarClick(e)}
                                        >
                                            Book a Car
                                        </div>

                                
                                </div>
                                
                            </div>
                            <div className='rowItem'>
                                <div>
                                    <img src = '/static/rta_icon.svg'/>
                                    <span>
                                        RTA Inspection: {carData.RTA.charAt(0).toUpperCase()+ carData.RTA.slice(1).toLowerCase()}

                                    </span>

                                </div>

                                <div className='rowButton' onClick={(e)=>textDriveClick(e)}>
                                    <span>Test Drive</span>
                                </div>
                                
                            </div>

                        </div>
                        
                    }
                </>
            }
        </div>

    )
}

export default CardCardMobile