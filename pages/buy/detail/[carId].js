/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-09 21:10:51
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-12-05 21:20:31
 * @FilePath: \part-time-lindacars\pages\detail\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, ListGroup, Tabs, Tab, Form, Button } from 'react-bootstrap'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import formatPrice from '../../../utils'
import { Swiper, SwiperSlide } from 'swiper/react';

import getConfig from 'next/config'
import CarCard from '../../../components/CarCard';
import CardCardMobile from '../../../components/CarCardMobile';
import useScreenSize from '../../../hooks/useScreenSize';
import ContactForm from '../../../components/ContactForm';
import EmiCalculator from '../../../components/EmiCalculator';
import CartContext from '../../../layout';
import getImageUrl from '../../../hooks/getImageUrl';

const { serverBaseUrl } = getConfig().publicRuntimeConfig

const index = ({ carId, carDetail, carList }) => {

    const imageUrl = getImageUrl(carDetail)

    const [thumnailUrl, setThumnailUrl] = useState(imageUrl)

    const mathMonthyEmi = () => {
        return Math.round((carDetail.PRICE - downpayment) / loanTenure)
    }

    // const [number, setNumber] = useState(4)
    const [downpayment, setDownpayment] = useState(carDetail.PRICE * 20 / 100)
    const [loanTenure, setLoanTenure] = useState(60)


    const [monthlyEmi, setMonthlyEmi] = useState(mathMonthyEmi)


    const renderTeams = (count) => {
        let result = []
        for (let i = 0; i < count; i++) {
            result.push(
                <Col xl={3} lg={3} key={i + 'yan'} >
                    <div className='team_member_card'>
                        <div className='title'>
                            REECHI
                        </div>
                        <div className="card_content">
                            <div className='img'>
                                <picture>
                                    <img src="/static/reechi.jpg" alt="" />
                                </picture>
                            </div>
                            <ul>
                                <li>
                                    Business Development Manager
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa fa-phone-square" aria-hidden="true"></i>
                                        054 432 0011
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                        054 432 0011
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </Col>
            )
        }
        return result;
    }

    const {number} = useContext(CartContext)


    const renderCards = () => {

        // console.log('rendeing swiper pic...')
        
        
        const index = carDetail.IMAGES.indexOf('_')
        const numImages = Math.floor(carDetail.IMAGES.slice(index+1))
        
        


        let result = []
        for (let i = 0; i < numImages; i++) {

            let source

            if (i<9){
                source = baseURL+image_name+`/0${i+1}.jpg`
            }else{
                source = baseURL+image_name+`/${i+1}.jpg`

            }
            // console.log('img src: ', source)
            result.push(
                <SwiperSlide>
                    <div className="item" onClick={()=>setThumnailUrl(source)}>
                        <img src={source} alt="" />
                    </div>
                </SwiperSlide>
            )
        }
        return result;
    }
    const whatsAppAPI = "https://api.whatsapp.com/send/?phone=85295128140&text=i+want+to+order+some+tyre.&type=phone_number&app_absent=0"

    const renderCars = () => {
        let result = []

        result =  carList?.map((car)=>{

            if(car.id === carId){
                return
            }

            const carData = car.attributes
            return(
                <Col xl={4} lg={4} md={6} xs={12}  className = "carRow">

                    {number > 1 ?
                    

                        <CarCard id = {car.id} carData = {carData}/>
               
                        :
                        <a href={`/buy/detail/${car.id}`}>

                            <CardCardMobile data = {car}/> 
                        </a>
                    }
                </Col>
        

            )

        }

        )
        
        return result;
    }
    return (
        <>
        <div className='detail'>
            {/* <div className='page_title'>

                {(false && number >1 ) &&
                    <div className='content_wrap text-center'>
                        <h1>
                            BUY USED CARS DUBAI
                        </h1>
                        <p>
                            <a href="/">Home</a>
                            <i className='fa fa-angle-double-right'></i>
                            <a href="/buy">Buy Car</a>
                            <i className='fa fa-angle-double-right'></i>
                            <a href="">2016 Mercedes-Benz C 200 Sedan Std W205</a>
                        </p>
                    </div>
                }
            </div> */}

            <div className="detail_main">
                <div className="content_wrap">
                    <Row>
                        <Col xl={12} lg={12} md={12} xs={12}>

                            {(false && number >1) &&
                                <div className="detail_banner">
                                    <div className="card_title">
                                        <p>
                                            {carDetail.NAME}
                                        </p>
                                        <p>
                                            AED {carDetail.PRICE}
                                        </p>
                                    </div>
                                    <div className="bg_Img">
                                        <picture>
                                            <img src={thumnailUrl} alt="" />
                                        </picture>
                                    </div>

                                    <Swiper
                   
                                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                        spaceBetween={50}
                                        slidesPerView={number}
                                        navigation
                                        autoPlay={{ delay: 5000 }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                    >
                                        {renderCards()}
                                    </Swiper>
                                </div>
                                
                            }
                            {true &&
                                <div className = 'car-container'>
                                    <CardCardMobile data = {{id : carId, attributes: carDetail}} detailPage = {true}/>
                                </div>
                            }
                        </Col>

                        {(false && number >1 ) &&
                        <Col xl={4} lg={4} md={12} xs={12}>
                            <div className="specification">
                                <div className="card_title">
                                    SPECIFICATION
                                </div>
                                <div className="specification_text">

                                    <div className="icons">
                                        <div>
                                            {carDetail.MILEAGE} km
                                        </div>
                                        <div>
                                            {carDetail.ENGINE}
                                        </div>
                                    </div>
                                    <div className="icons">
                                        <div>
                                            {carDetail.TRANSMISSION}
                                        </div>
                                        <div>
                                            {carDetail.FUEL}
                                        </div>
                                    </div>

                                    <div className='option-icon option-icon1'>
                                        <img src="/static/warranty-icon.png" alt="   " /> <span>Warranty:</span>
                                        <span style = {{color: 'black'}}> {carDetail.WARRANTY}</span>
                                       
                                    </div>
                                    <div className='option-icon'>
                                        <img src="/static/rta-inspection.png" alt="   " /> <span>RTA Inspection:</span>
                                        <span style = {{color: 'black'}}>{carDetail.RTA}</span>
                                    </div>
                                </div>
                                <div className='specification_tips'>
                                    <p>
                                        AED {formatPrice(Math.round((0.8 * carDetail.PRICE) / (5 * 12)))} / Month
                                    </p>
                                    <p>
                                        Payment For 5 Years through bank
                                        20% Down Payment
                                    </p>
                                </div>
                            </div>
                        </Col>
                        }
                    </Row>

                    {(false && number >1) &&
                        <Row className='shareBtn'>
                            <Col xl={8} lg={8} md={12} xs={12}>
                                <Row className='aa'>
                                    <Col xl={4} lg={4} md={4} xs={12} className='text-center'>
                                        <a href={whatsAppAPI}>
                                            BOOK CAR
                                        </a>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} xs={12} className='text-center'>
                                        <a href="">
                                            TEST DRIVE
                                        </a>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} xs={12} className='text-center'>
                                        <i className='fa fa-heart-o'></i>
                                        <i className='fa fa-share-alt'></i>
                                    </Col>
                                </Row>



                            </Col>
                            <Col xl={4} lg={4} md={12} xs={12} className='text-center eye'>
                                <i className='fa fa-eye'></i> 40
                            </Col>
                        </Row>
                    }


                    <Row className='options'>
                        <Col xl={8} lg={8} md={12} xs={12} className='option'>
                            <div className="card_title">
                                OPTION
                            </div>
                            <div className='options_row'>
                                { number === 1 ?
                                <>
                                    <Col xl={6} lg={6} md={4} xs={5} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Stock Number: {carDetail.SKU}</ListGroup.Item>
                                            <ListGroup.Item>Exterior Color: {carDetail.COLOR}</ListGroup.Item>
                                            <ListGroup.Item>Trim: {carDetail.TRIM}</ListGroup.Item>
                                            <ListGroup.Item>Model Year: {carDetail.YEAR}</ListGroup.Item>
                                            <ListGroup.Item>Body: {carDetail.BODYTYPE}</ListGroup.Item>
                                            <ListGroup.Item>Series: DS</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                        
                                    <Col xl={6} lg={6} md={4} xs={7} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Doors: 2</ListGroup.Item>
                                            <ListGroup.Item>Mileage: {carDetail.MILEAGE}</ListGroup.Item>
                                            <ListGroup.Item>Fuel: {carDetail.FUEL}</ListGroup.Item>
                                            <ListGroup.Item>Engine: {carDetail.ENGINE}</ListGroup.Item>
                                            <ListGroup.Item>Transmission: {carDetail.TRANSMISSION}</ListGroup.Item>
                                            <ListGroup.Item>Condition: {carDetail.CONDITION}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>

                                </>
                                    :
                                <>
                                    <Col xl={3} lg={3} md={3} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Stock Number: {carDetail.SKU}</ListGroup.Item>
                                            <ListGroup.Item>Exterior Color: {carDetail.COLOR}</ListGroup.Item>
                                            <ListGroup.Item>Trim: {carDetail.TRIM}</ListGroup.Item>
                                            
                                        </ListGroup>
                                    </Col>
                                    <Col xl={3} lg={3} md={3} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Model Year: {carDetail.YEAR}</ListGroup.Item>
                                            <ListGroup.Item>Body: {carDetail.BODYTYPE}</ListGroup.Item>
                                            <ListGroup.Item>Series: DS</ListGroup.Item>

                                        </ListGroup>

                                    </Col>
                        
                                    <Col xl={3} lg={3} md={3} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Doors: 2</ListGroup.Item>
                                            <ListGroup.Item>Mileage: {carDetail.MILEAGE}</ListGroup.Item>
                                            <ListGroup.Item>Fuel: {carDetail.FUEL}</ListGroup.Item>
                                    
                                        </ListGroup>
                                    </Col>
                                    <Col xl={3} lg={3} md={3} className = 'option_col' >
                                        <ListGroup>
                                            <ListGroup.Item>Engine: {carDetail.ENGINE}</ListGroup.Item>
                                            <ListGroup.Item>Transmission: {carDetail.TRANSMISSION}</ListGroup.Item>
                                            <ListGroup.Item>Condition: {carDetail.CONDITION}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>

                                </>
                                }
                            </div>
                            

                        </Col>
                        {(false && number >1) &&
                            <Col xl={4} lg={4} md={12} xs={12} className='text-center  promotion'>
                                <div className="card_title">
                                    PROMOTION
                                </div>
                                <div className='img'>
                                    <img src="/static/promotion_banner.jpeg" alt="" />
                                </div>
                            </Col>
                        }
                    </Row>
                    

                    {(false && number >1)?

                        <Row className='tabEMI'>

                            <Col xl={6} lg={6} md={6} xs={12}>
                                <div className='tabEMI_left'>
                                    <Tabs
                                        defaultActiveKey="EMI's"
                                        className='all'
                                    >
                                        <Tab eventKey="Full Amount" title="Full Amount">
                                            <div className='options_tabs'>
                                                <p className='title text-center'>
                                                    How to purchase your car instantly
                                                </p>
                                                <ol >
                                                    <li>
                                                        Reserve the car of your choice for 48 hours by paying a booking fee.
                                                    </li>
                                                    <li>
                                                        Book your Test Drive.
                                                    </li>
                                                    <li>
                                                        Complete the full payment using card or cash and get delivery of your car.
                                                    </li>
                                                </ol>


                                            </div>
                                        </Tab>
                                        <Tab eventKey="EMI's" title="EMI's">

                                            <div className='options_tabs'>
                                                <p>Loan Tenure</p>
                                                <Form.Group className="mb-3" controlId="fullName">
                                                    <Form.Select required value={loanTenure} onChange={(e) => {
                                                        console.log(e.target.value);
                                                        setLoanTenure(e.target.value)
                                                    }}
                                                    style={{margin: '20px 0'}}
                                                    >
                                                        <option value={"12"}>12</option>
                                                        <option value={"24"}>24</option>
                                                        <option value={"36"}>36</option>
                                                        <option value={"48"}>48</option>
                                                        <option value={"60"}>60</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <div>
                                                    Downpayment <Button variant="outline-primary" disabled>AED {formatPrice(Math.round(carDetail.PRICE * rang1 / 100))}</Button>
                                                </div>
                                                <Form.Range value={rang1} onChange={(e) => {
                                                    let value = e.target.value
                                                    // console.log("=============", value);

                                                    if (value === "0") {
                                                        // console.log("=============");
                                                        setRang2(100)
                                                    } else if (value === "100") {
                                                        setRang2(0)
                                                    }else {
                                                        setRang2(100- value)
                                                    }
                                                    setRang1(value)
                                                }} />
                                                <div>
                                                    Monthly EMI <Button variant="outline-primary" disabled>AED {formatPrice(Math.round((carDetail.PRICE / loanTenure) * rang2 / 100))}</Button>
                                                </div>
                                                <Form.Range value={rang2} onChange={(e) => {
                                                    console.log(carDetail.PRICE * e.target.value / 100)
                                                    let value = e.target.value
                                                    if (value === "0") {
                                                        setRang1(100)
                                                    } else if (value === "100") {
                                                        setRang1(0)
                                                    } else {
                                                        setRang1(100- value)
                                                    }

                                                    setRang2(value)

                                                }} />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </Col>
                            <Col xl={6} lg={6} md={6} xs={12}>
                                <div className='emiAmount'>
                                    <div className='title'>
                                        <div>
                                            <p>
                                                Emi Amount
                                            </p>
                                            <p>
                                                AED {formatPrice(Math.round((carDetail.PRICE / loanTenure) * rang2 / 100))}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Downpayment
                                            </p>
                                            <p>
                                                AED {formatPrice(Math.round(carDetail.PRICE * rang1 / 100))}
                                            </p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <p>
                                                Car Price
                                            </p>
                                            <p>
                                                AED {carDetail.PRICE}
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Downpayment
                                            </p>
                                            <p>
                                                AED  {formatPrice(Math.round(carDetail.PRICE * rang1 / 100))}
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Loan amount with charges
                                            </p>
                                            <p>
                                                AED {formatPrice(Math.round((carDetail.PRICE / loanTenure) * rang2 / 100) * loanTenure)}
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Loan Tenure
                                            </p>
                                            <p>
                                                {loanTenure} Month
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        :
                        <EmiCalculator carDetail = {carDetail}/>
                    }

                    



                    {/* <div className='article_title'>
                        OUR SALES TEAM

                    </div> */}
                    {/* <Row>
                        {renderTeams(4)}
                    </Row> */}
                    {/* <div className='article_title'>
                        FEATURED CARS
                    </div> */}

                    {number === 1 &&
                        <div className="cars_list">
                            <div className="content_wrap">
                                <Row>
                                    {renderCars()}
                                </Row>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
        <ContactForm/>
        </>
    )
}


export async function getStaticProps({ params }) {
    const products = await fetch(serverBaseUrl + `/inventory/f31e7df6-e8b3-4512-abf5-87cb2c98d993`, {
        method: 'get',
        headers: {
            "authorization": "liajnwekfjhawlfaw9ri3u192438717432uyqaiekfjh"
        }
    })
    .then(data => data.json())
    .then(result => {
      const carList = result.data
      // console.log('carList: ',carList)
      let detail = carList.filter(item => item.id === params.carId)[0] || null

      const filteredCardList = carList.filter(car => car?.attributes?.FEATURED === 'YES')
  
      return {filteredCardList, detail}
    })


    return {
        props: {
            carId:products.detail.id,
            carDetail: products.detail.attributes,
            carList: products.filteredCardList
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    const products = await fetch(serverBaseUrl + `/inventory/f31e7df6-e8b3-4512-abf5-87cb2c98d993`, {
        method: 'get',
        headers: {
            "authorization": "liajnwekfjhawlfaw9ri3u192438717432uyqaiekfjh"
        }
    })

    const productsData = await products.json()
    const paths = productsData.data.map(post => (
        {
            params: { carId: post.id + '' },
        }
    ))
    // fallback简单来说访问path里没有的页面，需不需要跳404，这里false就是跳404
    return { paths, fallback: 'blocking' }
}

export default index
