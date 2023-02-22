/*
 * @Author: superYan 1315007322@qq.com
 * @Date: 2022-11-04 22:55:19
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-11-11 15:44:52
 * @FilePath: \part-time-lindacars\pages\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Head from 'next/head'
import { Row, Col } from 'react-bootstrap'
import ContactForm from '../components/ContactForm'
import getConfig from 'next/config'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext, useEffect, useRef, useState } from 'react';
import OptionComponent from '../components/OptionComponent';
import ReviewComponent from '../components/ReviewComponent';
import CarCard from '../components/CarCard';
import useScreenSize from '../hooks/useScreenSize';
import useInitialRender from '../hooks/useInitialRender';
import CartContext from '../layout';
import SellCarModal from '../components/SellCarModal';


// import useMediaQuery from '@mui/material/useMediaQuery';

const { serverBaseUrl } = getConfig().publicRuntimeConfig

export default function Home({carList}) {


  const {number} = useContext(CartContext)

  const [showModal, setShowModal] = useState(false)


  const renderCards =  () => {


 
    let result = []
    
    result =  carList?.map( (car) => {

      const carData = car.attributes

      return(  
            <SwiperSlide>

                <CarCard id = {car.id} carData = {carData}/>
    
            </SwiperSlide>
          )
        }
      )
 
 
    return result;
  }

  return (
    

    <div>
      <Head>
        <title>Car Stake</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='home_banner1'>

        <div className='title'>

          <div>CAR TRADE with</div>
          {number >1 ?
            <div>DAYAS Moto</div>
            :
            <div style = {{padding:'0.8rem 0rem'}}><img src = 'static/homePage_banner_logo.png'/></div>
            
          }

          <div className='subtitle'>
            Best Quality Cars in the town <br></br>
            Choose and Enjoy. 
          </div>
          
        
          
          
          <div className='buttons'>
            <div className='bannerBtn'>
              <a href="/buy">
                Buy CAR
              </a>
            </div>
            <div className='bannerBtn' onClick = {()=> setShowModal(true)}>
              {/* <a href="/buy"> */}
                Sell  CAR
              {/* </a> */}
            </div>

            {showModal &&
              <SellCarModal showModal = {showModal} setShowModal = {setShowModal}/>
            }

          </div>


        </div>
        {/* <div className='backgroundCircle'></div>   */}
        

        <div className='carBackground'>
          <div className = 'blurCar_Container'>

                <img className='blurCar' src= {'/static/whiteCarBg.png' }/>
    

          </div>
          <div className = 'redCar_Container'>
            <img className='redCar' src= {number >1 ?'/static/carBackground_mob.png':'/static/carBackground_mob.png' }/>

          </div>
          
          
        </div>

        
      </div>

      <div className='banner_swiper'>
        <div className="content_wrap" style = {{paddingTop:'36px'}}>
          <div className='red_h2 text-center' style = {{marginRight:'25px'}}>
            Latest Stock
          </div>
          <div className='subtitle' id='subtitle01' >

            Choose from one of the best deals in Dubai
          </div>

          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={number === 1? 30 : 50}
            slidesPerView={number === 1? 1.5 : 3}
            // effect={"fade"}
            navigation = {number >1}
            autoPlay={{ delay: 5000 }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {renderCards()}
        

          </Swiper>
        </div>

      </div>


      <div className='four-options-wrapper'>
        <div className="content_wrap">
        
            <>
              <div className = 'red_h2'>
                Why Choose 
                {/* <span className='companyName'> DAYAS MOTO</span> */}
                <div style = {{padding:'0rem 0rem'}}><img src = 'static/homePage_banner_logo.png'/></div>
              </div>
              
            </>
                
          
            
          <div className='subtitle text-center' ><div style = {{marginBottom:'-1rem'}}></div>   
            Choose from one of the best deals in Dubai
          </div>

          <Row className = 'options'>
            <Col xl={6} lg={6} md={3} xs={12}>

              
              <OptionComponent 
                title = "Certified"
                text = "Pre-Owned Cars"
                imageSrc={'Option1.svg'}
              />
            </Col>

            <Col xl={6} lg={6} md={3} xs={12}>
            
              <OptionComponent 
                title = "Premium"
                text = "Warranty Covers all Cars"
                imageSrc={'Option2.svg'}
              />
            </Col>
            <Col xl={6} lg={6} md={3} xs={12}>
              
              <OptionComponent 
              title = "Available"
                text = "0% Down Payment"
                imageSrc={'Option3.svg'}
              />
            </Col>
            <Col xl={6} lg={6} md={3} xs={12}>
            
              <OptionComponent 
              title = "Experience"
                text = "Without Hassle"
                imageSrc={'Option4.svg'}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className='customer-review-wrapper'>
        <div className="content_wrap">
          <div className='red_h2'>
            Reviews
          </div>
          <div className='subtitle'>
            Choose from one of the best deals in Dubai
          </div>

          

            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination = {true}
              autoPlay={{ delay: 5000 }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide>
                <ReviewComponent
                title= "A Great Find"
                text= "Just bought my dream, Audi, 😍 there and I’m super satisfied. The car is clean and very well maintained."
                name = "Sam Kwan"
                />
              </SwiperSlide>

              <SwiperSlide>
              <ReviewComponent
                title= "A Great Find"
                text= "Just bought my dream, Audi, 😍 there and I’m super satisfied. The car is clean and very well maintained."
                name = "Sam Kwan"
                />
              </SwiperSlide>

              <SwiperSlide>
              <ReviewComponent
                title= "A Great Find"
                text= "Just bought my dream, Audi, 😍 there and I’m super satisfied. The car is clean and very well maintained."
                name = "Sam Kwan"
                />
              </SwiperSlide>


            </Swiper>
        </div>
      </div>

      <ContactForm />
    </div>
      

  )
}

export async function getStaticProps () {
  // console.log('serverBaseUrl..',serverBaseUrl)

  const products_car = await fetch(serverBaseUrl + `/inventory/f31e7df6-e8b3-4512-abf5-87cb2c98d993`, {
      method: 'get',
      headers: {
          "authorization": "liajnwekfjhawlfaw9ri3u192438717432uyqaiekfjh"
      }
  })
  .then(data => data.json())
  .then(result => {
    // console.log('result: ',result)
    const carList = result.data
    const filteredCardList = carList.filter(car => car?.attributes?.FEATURED === 'YES')

    return filteredCardList
  })

  return {props: {carList: products_car}}
}
