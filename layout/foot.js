import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import CartContext from '.';
import useScreenSize from '../hooks/useScreenSize';
import menuData from './menuData';

const Foot = () => {


  const {number} = useContext(CartContext)


    return (
        <div className='footer'>
            <div className='footer_bg'>
                <div className="footer_top">
                    
                    <div >
                        <Row className="footer_top_content content_wrap">
                            { number === 1 &&
                                <>
                                    <Col xl={4} lg={4} md={12} xs={6}  className='item item2'>
                                        <div className='title'>Quick Links</div>
                                        {/* <div className="line"></div> */}
                                        <div className='content'>
                                            {
                                                menuData && menuData.length && (
                                                    menuData.map((item, index) => {
                                                        return (
                                                            <div key = {index}> 
                                                                <a href="">{item.label}</a>
                                                            </div>

                                                        )
                                                    })
                                                )
                                            }
                                        </div>
                                    </Col>

                                    <Col xl={4} lg={4} md={12} xs={6} className='item item3'>
                                        <div className='title'>Social</div>
                                        <div className='content'>
                                                <a href="https://www.facebook.com/dayasmoto">
                                                    Facebook
                                                </a>
                                                <a href="https://www.instagram.com/dayasmoto">
                                                    Instagram
                                                </a>
                                        
                                            {/* </p> */}

                                        </div>
                                    </Col>
                                </>
                            }

                            <Col xl={4} lg={4} md={12} xs={12} className='item item1'>
                                <div className='footer_img'>
                                    <picture>
                                        <img src="/static/logo.png" alt="" />
                                    </picture>
                                </div>
                                {/* <div className="line"></div> */}
                                <div className='content'>
                                    <div>
                                        Over the years we have strived to become
                                        the cornerstone for Luxury driving, and marked as a best
                                        used cars showrooms in dubai to buy and sell cars
                                        online & recognized as one of the top premium car
                                        dealerships in the UAE.

                                    </div>
                                    <div>
                                        info@dayasmoto.com
                                    </div>
                           
                                    <div style ={{fontSize:number > 1? '':'9px'}}>
                                        Copyright © 2022 DAYAS MOTO L.L.C FZ. All rights reserved
                                    </div>
                                    
                                </div>
                                
                            </Col>

                            { number > 1 &&
                                <>
                                    <Col xl={4} lg={4} md={12} xs={12}  className='item item2'>
                                        <p className='title'>Quick Links</p>
                                        {/* <div className="line"></div> */}
                                        <div className='content'>
                                            {
                                                menuData && menuData.length && (
                                                    menuData.map((item, index) => {
                                                        return (
                                                            <div key = {index}>
                                                                <a href="">{item.label}</a>
                                                            </div>

                                                        )
                                                    })
                                                )
                                            }
                                        </div>
                                    </Col>
                                    <Col xl={4} lg={4} md={12} xs={12} className='item item3'>
                                        <p className='title'>Social</p>
                                        {/* <div className="line"></div> */}
                                        <div className='content'>
                                            {/* <p> */}
                                                <a href="https://www.facebook.com/dayasmoto">
                                                    {/* <i className="fa fa-facebook-square" aria-hidden="true"></i> */}
                                                    Facebook
                                                </a>
                                                <a href="https://www.instagram.com/dayasmoto">
                                                    Instagram
                                                </a>
                                        
                                            {/* </p> */}

                                        </div>
                                    </Col>
                                </>
                            }
                        </Row>
                    </div>
                </div>
           
            </div>
        </div>
    )
}

export default Foot
