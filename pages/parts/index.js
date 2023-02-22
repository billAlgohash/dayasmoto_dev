/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-08 12:46:00
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-12-05 21:23:42
 * @FilePath: \part-time-lindacars\pages\buy\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useRef } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import formatPrice from '../../utils'

import getConfig from 'next/config'
import TyreCard from '../../components/TyreCard'
import CardCard from '../../components/CarCard'
import { useState } from 'react'
import useScreenSize from '../../hooks/useScreenSize'
import CardCardMobile from '../../components/CarCardMobile'
import SearchFormMobile from '../../components/SearchFormMobile'
import ContactForm from '../../components/ContactForm'
import PriceSlider from '../../components/PriceSlider'
import Slider from '@mui/material/Slider';
import RenderList from '../../components/RenderList'
import CartContext from '../../layout'


const { serverBaseUrl } = getConfig().publicRuntimeConfig

const index = ({ tyres }) => {

  

    const [category, setCategory] = useState('all')
    const {number} = useContext(CartContext)

    const searchRef = useRef(null)

    const [showOptions, setShowOptions] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFromData] = useState({
     
        type:'',
        brand:'',
        pattern:'',
        li_sr:'',

        price:[],
    })

    const [options, setOptions] = useState(
        {
        
            types:[],
            brands:[],
            patterns:[],
            li_srs:[],
            price:[]
           
        }
    )
    const [priceRange, setPriceRange] = useState([10,90])


     // populating select options
     useEffect(()=>{

        let types = []
        let brands = []
        let patterns = []
        let li_srs = []
        let prices = []
        


        tyres.map((tyre)=>{
            const tyreData = tyre.attributes


            const type = tyreData.TYPE
            const brand = tyreData.BRAND
            const pattern = tyreData.PATTERN
            const li_sr = tyreData.LI_SR
            const price = tyreData?.RETAILPRICE.slice(1)

            
            prices.push(Math.floor(price))

            
            if(!brands.includes(brand)){
                brands.push(brand)
            }
            if(!patterns.includes(pattern)){
                patterns.push(pattern)
            }
            if(!li_srs.includes(li_sr)){
                li_srs.push(li_sr)
            }
            if(!types.includes(type)){
                types.push(type)
            }
        })

        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)

        // setMaxTyrePrice(maxPrice)


        let pricerange = [minPrice,maxPrice]




        setOptions(()=> 
            {   
                return (
                        {
                            types, 
                            brands,
                            patterns,
                            li_srs,
                            price: pricerange
                        }
                    )
            }
        )



    },[])

  
    // const renderTyres = ()=>{
        

    //     // tyres =[1,2,3]
    //     let result = []
    //     let criteria = Object.keys(formData)
    //     criteria = criteria.filter(item => formData[item]!== '')
    //     criteria = criteria.map(item => item.toUpperCase())

    //     const exact = ['type','brand','pattern','li_sr']

    //     if(tyres && tyres.length > 0 ){
    //         tyres.map((item) => {

    //             const tyreData = item.attributes
    //             let render = true
    //             for (let i = 0; i<criteria.length; i++ ){
    //                 const searchCriteria = criteria[i]
    //                 const formDataSearch = searchCriteria?.toLowerCase()
    //                 // console.log('formDataSearch: ',formDataSearch,searchCriteria)
    //                 if(exact.includes(formDataSearch)){

    //                     if(tyreData[searchCriteria]!== formData[formDataSearch] ){
    //                         render = false;
                            
    //                         return
    
    //                     }
    //                 }else if(formDataSearch === 'price'){
    //                         // console.log('seraching by price..')
    //                         const min = formData.price[0]
    //                         const max = formData.price[1]
    //                         // console.log(min, max, tyreData)

    //                         if(Math.floor(tyreData.RETAILPRICE.slice(1)) < min || Math.floor(tyreData.RETAILPRICE.slice(1)) > max ) {
    //                             render = false;
    //                             return
    //                         }

    //                     }

    //                 }

    //             if(render){
    //                 result.push(
    //                     <Col xl={4} lg={4} md={6} xs={12}>
    //                     <div key ={item.id}>
    //                         {/* <TyreCard data = {item.attributes}/> */}
    //                         <TyreCard id = {item.id} tyreData={item.attributes}/>
    //                     </div>
    //                     </Col>

    //                 )
    
    //             }

                
          
    //         })
    //     }
        
    //     return result;

    // }
    useEffect(()=>{
        setLoading(true)
        // renderTyres()
        setLoading(false)

    },[formData])
    
    const handleReset = ()=>{
        setFromData(
            {
                bodytype:'',
                brand:'',
                pattern:'',
                li_sr:'',
                price:[],
             
            }
        )
        // setShowOptions(false)
    }
    const handleSelect = (e,id)=>{
        // console.log(e,id)

        const field_name = id ?id :e.target.id

        // console.log(field_name)

        setFromData((formData)=> 
            {
                return {...formData, [field_name]: e.target.value}
            }
        )
    }
    const handleSingleSlider = (e)=>{
        const range = e.target.value
        const name = e.target.name

        // console.log(name)
  
        let min_fraction = range[0]
        let max_fraction = range[1]

        if(name === 'price'){
            setPriceRange([min_fraction,max_fraction])

        }


        min_fraction = (min_fraction) / 100
        max_fraction = (max_fraction) / 100

        let min_value
        let max_value
        if(name === 'price'){

            min_value = Math.round(options[name][0] + (options[name][0] * min_fraction))
            max_value = Math.round(options[name][1] * max_fraction)

        }
     
    
        setFromData((formData)=>{
            
            return(
                {...formData, [name]: [min_value,max_value]}
            )
        })

    }


    useEffect(()=>{
        // console.log(formData)

    },[formData])

   
 

    return (
        <div className='buy_page tyre_page'>
            {number >1 &&
                <div className='top_banner'>
                    <img src={ number >1 ? "/static/tyre_page_banner_landscape.jpeg" : "/static/tyre_page_banner_portrait.jpeg"} alt="" />
                </div>
            }
            <div className='page_title'>
                <div className='content_wrap text-center'>
                    <span className='content_wrap text-center red_h2'>
                        Buy Parts in Dubai 
                    </span>
                </div>
            </div>
            {number > 1 ?
                <div className='search_form'>
                    <div className='content_wrap'>
                        <h2 className='text-center'>
                            <i className='fa fa-search'></i> Parts Search
                        </h2>
                        <Form>
                            <Row>
                                {Object.keys(formData).slice(0,-1)?.map((key)=>{

                                    return(
                                        <Col xl={2} lg={2} md={6}>
                                            <Form.Group className="mb-3" controlId={key}>
                                                <Form.Select required onChange={(e)=>handleSelect(e)}>

                                                    <option  value={''}>Any {key.charAt(0).toUpperCase()+ key.slice(1)}</option>
                                                    {options[key+'s']?.map((name)=>{
                                                        return (<option  value={name}>{name}</option>)
                                                    })}
                                                </Form.Select>
                                            </Form.Group>

                                        </Col>
                                    )

                                })}
        
                                <Col xl={4} lg={4} md={6}>
                                    <Form.Group className="mb-3" controlId="price">
                        
                                        {formData.price.length > 0
                                            ?
                                            <Form.Control required placeholder = {'Price Range: '+ 'AED '+ formatPrice(formData?.price[0]) +' ~ '+'AED '+  formatPrice(formData?.price[1])} />
                                            :
                                            <Form.Control required placeholder = {'Price Range: '} />


                                        }
                                        <Slider
                                            name = "price"
                                            getAriaLabel={() => 'price'}
                                            value={priceRange}
                                            onChange={(e)=>handleSingleSlider(e)}
                                            // valueLabelDisplay="auto"
                                            // getAriaValueText={valuetext}
                                        />
                                        
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='btns'>
                                <Button variant="primary" type="reset" className='reset' size='lg' onClick = {()=>handleReset()}>
                                    RESET
                                </Button>
                                <Button variant="primary" type="submit" className='apply' size='lg'>
                                    APPLY
                                </Button>
                            </div>

                        </Form>

                    </div>
                </div>
                :
                <div className = 'priceSlider'>
                
                    <SearchFormMobile 
                            options = {options} 
                            handleSelect = {handleSelect}
                            formData= {formData}
                            handleReset ={handleReset}
                            showOptions = {showOptions}
                            setShowOptions ={()=>setShowOptions(prev => !prev)}
                            // handleSliderChange = {handleSliderChange}
                        />
                    {showOptions &&
                        <>
                            <PriceSlider
                                minPrice = {formatPrice(formData?.price[0])}
                                maxPrice = {formatPrice(formData?.price[1])}
                                priceRange={priceRange}
                                handleSingleSlider = {handleSingleSlider}

                            />
                        </>
                
                    }
                </div>
            }

            <div className="cars_list" style ={{ display:'flex'}}>
                <div className="content_wrap">
                
                    <Row>
                        <RenderList itemsArray ={tyres} formData = {formData} searching = {showOptions}/>
                        {/* {renderTyres()} */}
                    </Row>

                </div>
            </div>

            {number >1 &&
                <div class="car_article">
                    <div className='content_wrap'>
                        <p className='article_title'>
                            Buy used cars in Dubai your way
                        </p>
                        <p className='article_text'>
                            DAYAS MOTO is one of the most preferred luxury car dealerships in Dubai since 2018. We specialize in Premium and luxury car brands. Dayas Moto is devoted to offering the highest level of customer service to our clients. ‘Dayas Moto’ is an authorized dealer in Dubai where you can <b>buy used cars</b> of quality brands like - Mercedes, BMW, Audi, Jaguar, Lexus and more at a reasonable price.
                        </p>
                        <p className='article_title'>
                            Buy used Luxury cars
                        </p>
                        <p className='article_text'>
                        Dayas Moto success story started in 2018 and continues to follow a solid mission, which is to enhance the customers Purchasing experience by supplying a best-in-town service. <b>Buy luxury cars</b> at competitive market prices.
                        </p>
                        <p className='article_text'>
                            If you are a true luxury car lover, join the experience <b>to buy a used luxury car</b> from us.
                        </p>
                        <p className='article_title'>
                            Buy Online Cars of Your Dreams
                        </p>
                        <p className='article_text'>
                            Are you looking for the best place to <b>buy second hand car from Dubai</b>? Then you are on the right track. <b>Buying cars in Dubai online</b> has never been easier! Dayas Moto, provides the largest online platform for buying and <a href="">selling cars</a>. We provide all the information about any vehicle before making a purchase decision. Our platform is trusted by millions of users because it provides all the necessary services before and after buying a car.
                        </p>
                        <p className='article_text'>
                            Are you looking to trade in your vehicle? Dayas Moto offers a free online trade in assessment, and will get you an offer within minutes - totally hassle-free. So, what are you waiting for?
                        </p>
                        <p className='article_title'>
                            The Best Car Showroom in Dubai Ever!
                        </p>
                        <p className='article_text'>
                            At Dayas Moto our showroom is the ideal spot in Dubai that will offer you with 360-degree administrations customized to your requirements.
                            The Core Elements That Make Dayas Moto The best
                        </p>


                        <ul className='article_ul'>
                            <li>
                                Dayas Moto is a one-stop shop for all your automobile needs,
                            </li>
                            <li>
                                Our Teams Consists of sociable and well-informed professionals from multicultural backgrounds. Happy to help you along your journey.
                            </li>
                            <li>
                                Amazing arrangements and offers throughout the entire year to enjoy your holiday with us.

                            </li>
                            <li>
                                Flexible finance and insurance options to suit all your needs.
                            </li>
                        </ul>

                        <p className='article_text'>
                            No more driving around to different car dealerships only to be disappointed with the small selection of cars available. Our vehicle purchasing and transfer services have been designed to offer a quick, effective, and easy way to buy your car in Dubai. We guarantee you the best buying options and true peace of mind.
                        </p>
                        <p className='article_text'>
                            Purchase your dream car from our <b>car showroom in Dubai</b> and receive the following benefits:
                        </p>

                        <ul className='article_ul'>
                            <li>
                                Free Warranty
                            </li>
                            <li>
                                Peace of mind
                            </li>
                            <li>
                                Flexible payment plans up to 5 years with 0% down payment
                            </li>
                            <li>
                                Dedicated after sales support
                            </li>
                            <li>
                                Professional Advice on decision making
                            </li>
                            <li>
                                Exceptional customer service
                            </li>
                        </ul>
                        <p className='article_title'>
                            Why Buy Vehicle from Dayas Moto?
                        </p>
                        <p className='article_text'>
                            <b>Free test Drives</b>
                        </p>
                        <p className='article_text'>
                            Test drives at Dayas Moto are the most ideal approach to test drive vehicles in a totally hassle-free environment. Hence thus making it to be best used car dealer in Dubai.
                        </p>
                        <p className='article_text'>
                            <b>Vehicle Warranty</b>
                        </p>
                        <p className='article_text'>
                            Get car warranties for used and brand-new UAE vehicles. Apply now and Get a Quote.
                        </p>
                        <p className='article_text'>
                            <b>Free Online Evaluation</b>
                        </p>
                        <p className='article_text'>
                            Get a free online evaluation in minutes from the convenience of your home.
                        </p>
                        <p className='article_text'>
                            <b>Car Finance</b>
                        </p>
                        <p className='article_text'>
                            Dayas Moto is a well-known used car dealer in Dubai and is associated with most of the well-known UAE banks. This makes your next car purchase at Dayas Moto a walk in the park.
                        </p>

                    </div>
                </div>
            }
            <ContactForm/>
        </div >
    )
}




export async function getStaticProps({ params }) {



    const products_tyre = await fetch(serverBaseUrl + `/inventory/be0654da-4116-4053-96ad-d58eedd6c60b`, {
        method: 'get',
        headers: {
            "authorization": "liajnwekfjhawlfaw9ri3u192438717432uyqaiekfjh"
        }
    })

    const productsData_tyre = await products_tyre.json()
    // console.log('productsData_tyre: ',productsData_tyre)

    // const list = productsData.data.concat(productsData_tyre.data)



    return {
        props: {tyres:productsData_tyre.data },

        revalidate: 10,
    }
}


export default index
