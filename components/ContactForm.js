/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-07 21:11:26
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-11-07 21:40:44
 * @FilePath: \part-time-lindacars\components\ContactForm.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import menuData from '../layout/menuData' 
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import Map from './Map';
import useScreenSize from '../hooks/useScreenSize';


const ContactForm = () => {
    

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    const number = useScreenSize()

    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    
    return (
        <div className='contactForm'>
           
            
                <Col xl={12} lg={12} md={12} xs={12} >
                    <div className={'box left_box'}>
                        
                        <div className='sectonTitle'>
                            Get in Touch
                        </div>
                        <div className='subtitle text-center'>
                          
                            Choose from one of the best deal in Dubai 
                        </div>
                        <div className='text-center'>
                         
                            <Row className='items'>

                                <Row className = 'Row'>

                                    <Col xl={6} lg={6} md={6} xs={12} className="bx">

                                        {/* <div> */}
                                            <div className = 'iconCol'>
                                                <a>
                                                    <img src= {'/static/phoneIcon.png'}/>
                                                </a>

                                            </div>
                                            <div className='dataCol'>
                                                <div className= "title">Phone</div>
                                                
                                                <div className= "contact-number">(+971) 54 432-3473</div>
                                                <div className= "contact-number">(+971) 54 432-3473</div>
                                                
                                            </div>
                                                        

                                        {/* </div> */}


                                    </Col>

                                    <Col xl={6} lg={7} md={6} xs={12} className="bx" >
                                            <div className = 'iconCol' >
                                                <a href="">
                                                    <img 
                                                        src= {'/static/emailIcon.png'}
                                                        style = {{height:'1.5rem'}}
                                                    />
                                                </a>

                                            </div>
                                            <div className='dataCol'>
                                                        
                                                <div className= "title">Email</div>
                                                <div className= "contact-number data">info@dayasmoto.com</div>
                                                        
                                            </div>
                                    </Col>
                                </Row>
                                <Row  className = 'Row'>
                                    <Col xl={6} lg={6} md={6} xs={12} className="bx" >

                                        <div className = 'iconCol'>
                                            <a href="">
                                                <img 
                                                    src= {'/static/timerIcon.png'}
                                                    style = {{height:'2rem'}}
                                                />
                                            </a>

                                        </div>
                                        <div className='dataCol'>
                                                    
                                            <div className= "title">Opening Hours</div>
                                            <div className= "contact-number data">
                                                <div>
                                        
                                                    Monday - Sunday <br/>
                                                    10.00 am - 09.00 pm
                                            
                                                </div>
                                            </div>
                                                    
                                        </div>

                                

                                    </Col>

                                    <Col xl={6} lg={6} md={6} xs={12} className="bx">
                                        <div className = 'iconCol'>
                                                <a href="">
                                                    <img src= {'/static/locationIcon.svg'}/>
                                                </a>

                                        </div>
                                        <div className='dataCol'>
                                                    
                                            <div className= "title">Location</div>
                                            <div className= "data">
                                                <div href="">
                                        
                                                    Business Center 1, 
                                                    M Floor, <br/>
                                                    The Meydan Hotel, {number === 1 && <br/>}
                                                    Nad AlSheba, Dubai, U.A.E.
                                                    
                                                </div>
                                            </div>
                                                    
                                        </div>
                                    </Col>

                                </Row>
                                


                            </Row>
                        </div>
                        
                    </div>
                    

                </Col>
               
                {/* <Col xl={6} lg={6} md={6} xs={12} className={'box right_box'}> */}
        
                {/* </Col> */}
                
            
        </div>
    )
}

export default ContactForm
