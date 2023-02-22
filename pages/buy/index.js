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
import CarCard from '../../components/CarCard'
import { useState } from 'react'
import FlipMove from 'react-flip-move'
import ContactForm from '../../components/ContactForm';
import useScreenSize from '../../hooks/useScreenSize';
import SearchFormMobile from '../../components/SearchFormMobile';
import CardCardMobile from '../../components/CarCardMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import PriceSlider from '../../components/PriceSlider';
import Slider from '@mui/material/Slider';
import 'swiper/css/navigation';
import CartContext from '../../layout'


const { serverBaseUrl } = getConfig().publicRuntimeConfig

const index = ({ list,featuredCarList }) => {


    const {number} = useContext(CartContext)

    const [showOptions, setShowOptions] = useState(false)
    const searchRef = useRef(null)
    const pageRef = useRef(null) 
    // const [numCars, setNumCars] = useState(list?.length)
    // const [carList, setCarList] = useState(list)
    const [maxCarPrice, setMaxCarPrice] = useState(0)
    const [maxYear, setMaxYear] = useState(2022)

    const [priceRange, setPriceRange] = useState([10,90])
    const [yearRange, setYearRange] = useState([10,90])

    const [formData, setFromData] = useState({
        make: '',
        model:'',
        mileage:'',
        year:'',
        bodytype:'',
        minprice: '',
        maxprice:'',
        price:[],
    })

    const [error, setError] = useState(null)

    const [options, setOptions] = useState(
            {
                makes:[],
                models :[],
                bodyTypes:[],
                mileages: [],
                year: [],
                price:[]
            }
        )

    // populating select options
    useEffect(()=>{

        let models = []
        let makes = []
        let bodyTypes = []
        // let mileages = []
        let years = []
        let prices = []

        list.map((car)=>{
            const carData = car.attributes
            const model = carData.MODEL
            const make = carData.MAKE
            const bodyType = carData.BODYTYPE
            const year = carData.YEAR
            const price = carData.PRICE

            

            years.push(Math.floor(year))
            prices.push(Math.floor(price))

            
            if(!models.includes(model)){
                models.push(model)
            }
            if(!makes.includes(make)){
                makes.push(make)
            }
            if(!bodyTypes.includes(bodyType)){
                bodyTypes.push(bodyType)
            }
            
        })

        const maxYear = Math.max(...years)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)

        setMaxCarPrice(maxPrice)
        setMaxYear(maxYear)
        
        // years = []
        // prices = []
        let pricerange = [minPrice,maxPrice]
        let yearrange = [2000, maxYear]

        // console.log('prices: ',prices)

        // mileages.push('< '+ 1000);

        //     for (let i = 10000; i <= 50000; i = i+10000){
        //         if(i > 0){
        //             mileages.push('< '+i)
        //         }
        //     }
        // mileages.push('< '+ 50000);

        
       
        
        // for (let i = 2001; i <= maxYear; i = i+1){
        //     years.push(i)
        // } 
        // for (let i = minPrice; i <= maxPrice; i = i+50000){
        //     prices.push(i)
        // } 
        makes = makes.sort()
        models = models.sort()


        setOptions(()=> 
            {   
                return (
                        {
                            makes, 
                            models,
                            bodyTypes,
                            // mileages,
                            // years,
                            year: yearrange,
                            price: pricerange
                        }
                    )
            }
        )



    },[])

    useEffect(()=>{

        let models = []

        list.map((car)=>{
            const carData = car.attributes
            const model = carData.MODEL
            const make = carData.MAKE
            if((!models.includes(model) && make === formData.make) || formData.make === ''){
                    models.push(model)
                }

            }
        )
        setOptions((options)=>{
            return(
                {...options, models}
            )
        })


    },[formData.make])
 

    const renderCards = () => {
        let result = []
        // console.log('data:', list);
        // console.log('data:', list.slice(0,3));
        let criteria = Object.keys(formData)

        criteria = criteria.filter(item => formData[item]!== '')
        criteria = criteria.map(item => item.toUpperCase())
        // console.log('criteria: ',criteria)
        const exact = ['make','bodytype','model']

        if (list && list.length > 0) {
            list?.map(item => {

                const carData = item.attributes

                let render = true

                for (let i = 0; i<criteria.length; i++ ){
                    const searchCriteria = criteria[i]
                    const formDataSearch = searchCriteria?.toLowerCase()
                    if(exact.includes(formDataSearch)){

                        if(carData[searchCriteria] !== formData[formDataSearch]){
                            render = false;
                            
                            return
    
                        }
                    }else{
                        if(formDataSearch === 'mileage'){

                            if(Math.floor(carData[searchCriteria]) > Math.floor(formData[formDataSearch])){
                                render = false;
                            
                                return
                            }
                        }
                        if(formDataSearch === 'year'){
                            if(Math.floor(carData[searchCriteria]) < Math.floor(formData[formDataSearch])){
                                render = false;
                            
                                return
                            }

                        }
                        if(formDataSearch === 'price'){
                            // console.log('seraching by price..')
                            const min = formData.price[0]
                            const max = formData.price[1]
                            // console.log(min, max)

                            if(Math.floor(carData.PRICE) < min || Math.floor(carData.PRICE) > max ) {
                                render = false;
                                return
                            }

                        }

                    }

                }

                if(render){
                    result.push(
                        <Col xl={4} lg={4} md={6} xs={12}  className = "carRow">
                            {number > 1 ?
                            //  <a href={`/buy/detail/${item.id}`}>
                                 <CarCard id = {item.id} carData = {item.attributes}/>
                            // </a>
                             :
                             <a href={`/buy/detail/${item.id}`}>
                                 <CardCardMobile data ={item}/>
                             </a>
                            

                            
                            }
                        </Col>
                    )

                }
            })
        }

        // console.log('cars to render: ',result.length)
        // setCarList(result)
        

        return result
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

    const handleSliderChange = (e,id)=>{

        const fraction = (e.target.value) / 100
        const field_name = id ?id :e.target.id
        
        let value 

 
        if(field_name === 'year'){
            const minYear = 2000

            value = Math.round(minYear + ((maxYear - minYear)  * fraction))
        }
        if(field_name === 'mileage'){
            const minMileage = 1000
            const maxMileage = 50000

            value = Math.round(minMileage + (maxMileage- minMileage) * fraction)
        }

    

        setFromData((formData)=>{
            
            return(
                {...formData, [field_name]: value}
            )
        })
    }

    const handleReset = ()=>{
        setFromData(
            {
                make: '',
                model:'',
                mileage:'',
                year:'',
                price:[],
                bodytype:'',
                // minprice: '',
                // maxprice:'',
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

        }else if(name === 'year'){
            setYearRange([min_fraction,max_fraction])
        }


        min_fraction = (min_fraction) / 100
        max_fraction = (max_fraction) / 100

        let min_value
        let max_value
        if(name === 'price'){

            min_value = Math.round(options[name][0] + (options[name][0] * min_fraction))
            max_value = Math.round(options[name][1] * max_fraction)

        }else if (name === 'year'){

            
            min_value = Math.round(options[name][0] + ((options[name][1] - options[name][0]) * min_fraction))
            max_value = Math.round(options[name][0] + ((options[name][1] - options[name][0]) * min_fraction))
            
            console.log(min_value, max_value)
        }
     
    
        setFromData((formData)=>{
            
            return(
                {...formData, [name]: [min_value,max_value]}
            )
        })

    }

    const featuredCars = ()=>{

        let result = []
        featuredCarList.map(car =>{
            result.push(
                <SwiperSlide>
                    <a href={`/buy/detail/${car.id}`}>
                        <CardCardMobile data = {car} featuredCar = {true}/>
                    </a>
                </SwiperSlide>
            )
        })
        return result

    }


    useEffect(()=>{
        // console.log('showOptions: after it changed.. ',showOptions)

        if(showOptions){

            
            searchRef.current.scrollIntoView({
                block: "center",
                behavior: "smooth",
               
            })
        }
    },[showOptions])

   
    return (
        <>
            <div className='buy_page' >
            
                <div className='page_title'>
                    <span className='red_h2'>
                        Buy Used Cars in Dubai
                    </span>
                    {/* <div className='backgroundCircle'></div>   */}
                </div>
                <div className='search_form'>

                    {number > 1 &&
                        <>
                            <div className = 'carBackground leftCar_bg'>
                                <picture>
                                    <img src= '/static/leftCar_bg.png'/>
                                </picture>
                            </div>
                            <div className = 'carBackground rightCar_bg'>
                                <picture>
                                    <img src= '/static/rightCar_bg.png'/>
                                </picture>
                            </div>
                        </>

                    }
                
                    <div className='content_wrap'>
                        {/* <h2 className='text-center'>
                        {number > 1 ? "Car Search":"Browse Used Cars"} {renderCards().length}
                        
                        </h2> */}

                        {number === 1 &&

                            <div className='featured_cars'>
                                <div className='section_Title'>Popular Brands</div>
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                    spaceBetween={10}
                                    slidesPerView={1.3}
                                    // watchSlidesProgress = {true}
                                    navigation
                                    autoPlay={{ delay: 5000 }}
                                    // onSwiper={(swiper) => console.log(swiper)}
                                    // onSlideChange={() => console.log('slide change')}
                                >
                                    {featuredCars()}
                                

                                </Swiper>

                            </div>
                        }
                        <div  style = {{padding:'1rem', fontSize:'22px'}}>
                        {number > 1 ? "Car Search":"Browse Used Cars"} {renderCards().length}
                        
                        </div>

                    
                        <Form>
                            {number > 1 
                            ?
                            <Row>
                                <Col xl={2} lg={2} md={6}>
                                    <Form.Group className="mb-3" controlId="make">
                                        <Form.Select required onChange={(e)=>handleSelect(e)}>

                                            <option  value={''}>Any Make</option>
                                            {options.makes.map((name)=>{
                                                return (<option  value={name}>{name}</option>)
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col xl={2} lg={2} md={6}>
                                    <Form.Group className="mb-3" controlId="model">
                                        <Form.Select required onChange={(e)=>handleSelect(e)}>

                                            <option  value={''}>Any Model</option>
                                            {options.models.map((name)=>{
                                                return (<option  value={name}>{name}</option>)
                                            })}                                        
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col xl={4} lg={4} md={6}>
                                    <Form.Group className="mb-3" controlId="mileage">
                                        <Form.Control required placeholder = {'Max Mileage: '+formData.mileage} />
                                        <Form.Range  onChange={(e)=>handleSliderChange(e)}/>
                                    </Form.Group>
                                </Col>

                                <Col xl={2} lg={2} md={6}>
                                    <Form.Group className="mb-3" controlId="year">
                            
                                        <Form.Control required placeholder = {'Min Year: '+formData.year} />
                                        <Form.Range  onChange={(e)=>handleSliderChange(e)}/>
                            
                                    </Form.Group>
                                </Col>

                                <Col xl={2} lg={2} md={6}>
                                    <Form.Group className="mb-3" controlId="bodytype">

                                        <Form.Select required onChange={(e)=>handleSelect(e)}>
                                            <option  value={''}>Any Body Type</option>
                                                {options.bodyTypes.map((name)=>{
                                                    return (<option  value={name}>{name}</option>)
                                                })} 
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            
                                <Col xl={4} lg={4} md={6}>
                                    <Form.Group className="mb-3" controlId="pricerange">
                        
                                        {formData.price.length > 0
                                            ?
                                            <Form.Control required placeholder = {'Price Range: '+ formatPrice(formData?.price[0]) +' '+ formatPrice(formData?.price[1])} />
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
                            :
                            <div ref= {searchRef}>
                                <Row>
                                    <Col xl={2} lg={2} md={6} xs = {12}>
                                            <SearchFormMobile 
                                                options = {options} 
                                                handleSelect = {handleSelect}
                                                formData= {formData}
                                                handleReset ={handleReset}
                                                showOptions = {showOptions}
                                                setShowOptions ={setShowOptions}
                                                handleSliderChange = {handleSliderChange}
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
                                        
                                    </Col>
                                </Row>
                            </div>
                            }

                            

                            {error &&
                                <Row>
                                    <Col xl={4} lg={4} md={6}>
                                            <span className='errorMessage'>{error}</span>
                                    </Col>

                                </Row>
                            }



                            {number > 1 &&
                            <div className='btns'>
                                <Button variant="primary" type="reset" className='reset' size='lg' onClick = {()=>handleReset()}>
                                    RESET
                                </Button>
                                <Button variant="primary" type="submit" className='apply' size='lg'>
                                    APPLY
                                </Button>
                            </div>
                            }

                        </Form>
                    </div>
                </div>

                <div className="cars_list">
                
                    
                    <div className="content_wrap">
                    {number > 1 &&  
                        <>
                            <span className='text-center red_h2'>
                                Latest Stock
                            </span>
                            
                            <div className='subtitle text-center'>

                                Choose from one of the best deals in Dubai
                            </div>
                        </>
                        }

                
                        <Row>

                            {renderCards()}
                
                        </Row>
                    
                    </div>
                </div>

                {false&&
                    <div class="car_article">
                        <div className='content_wrap text-center'>
                            <p className='red_h2'>
                                Buy used cars in Dubai your way
                            </p>
                            <p className='subtitle'>
                                DAYAS MOTO is one of the most preferred luxury car dealerships in Dubai since 2018. We specialize in Premium and luxury car brands. Dayas Moto is devoted to offering the highest level of customer service to our clients. ‘Dayas Moto’ is an authorized dealer in Dubai where you can <b>buy used cars</b> of quality brands like - Mercedes, BMW, Audi, Jaguar, Lexus and more at a reasonable price.
                            </p>
                        </div>
                    </div>
                }

                
            </div >
            <ContactForm/>
        </>
    )
}


export async function getStaticProps({ params }) {
    console.log('buy car serverBaseUrl: ',serverBaseUrl)
  
    const products_car = await fetch(serverBaseUrl + `/inventory/f31e7df6-e8b3-4512-abf5-87cb2c98d993`, {
        method: 'get',
        headers: {
            "authorization": "liajnwekfjhawlfaw9ri3u192438717432uyqaiekfjh"
        }
    })

    const productsData = await products_car.json()
    const filteredCardList = productsData.data.filter(car => car?.attributes?.FEATURED === 'YES')





    return {
        props: { list:productsData.data, featuredCarList:filteredCardList},
        // props: { list:productsData.data },
        revalidate: 10,
    }
}


export default index
