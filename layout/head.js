/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-03 23:07:51
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-12-05 21:22:44
 * @FilePath: \part-time-lindacars\layout\head.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useContext } from 'react';
import menuData from './menuData';
import Image from 'next/image'
import { Nav, Row, Col, Navbar, Container, NavDropdown } from 'react-bootstrap'
import MobileMenu from '../components/MobileMenu';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useSelector} from 'react-redux'


import CartContext from '../layout/index.js'
import CartModal from '../components/CartModal';

const Head = () => {


    const [isShow, setIsShow] = useState(true)
    // const [number, setNumber] = useState(3)
    const [showModal, setShowModal] = useState(false)


    const [path, setPath] = useState("")

    const {number, cartItems, setCartItems} = useContext(CartContext)




    const cartClick = ()=>{
        // console.log('cartClick')
        setShowModal(true)
        
    }




    return (
        <>
            {/* <div className="head_top">
                <div className="content_wrap head_top_content">
                    <p>
                        <span><a href=""><i className='fa fa-phone' aria-hidden="true"></i></a></span>
                        <span><a href=''>(+971)544323473</a></span>
                    </p>
                    <p>
                        <span><a href=""><i className='fa fa-envelope'></i></a></span>
                        <span><a href=''>info@dayasmoto.com</a></span>
                        
                </p>
                    <p style = {{flexDirection:'row'}}>
                        <a href="">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                    </p>
                </div>
            </div> */}

            {/* <div className="top_video">
                <div className="content_wrap">
                    <video width="100%" height="50" autoPlay={true} muted="" loop="" playsInline="">
                        <source src="/static/limited-offer-desktop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div> */}

            <div className='head_nav'>
                {/* <Container> */}
                    <Navbar expand="lg" variant="dark">
                        <Container fluid className = "navContainer" >
                            <Navbar.Brand href="/" className='logo_container'>
                                <picture>
     
                                    <img className = 'logo' src='/static/navBar_logo.png' alt=""/>
                                    
                                </picture>
                                
                            {number === 1 &&
                                <div className='cart' onClick={(e)=>{cartClick();e.preventDefault()}}> 
                                    <img src = '/static/cartLogo2.png'/>
                                    <span>Cart: {cartItems?.length}</span>  
                                </div>
                            }
                            </Navbar.Brand>
                            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className='NavbarToggle'/> */}


                            <div className = "mobile_menu_container">
                                <Nav.Link href ="/buy"> 

                                    <MobileMenu 
                                        icon = "carIcon.svg"
                                        text = "Buy Cars"/>
                                </Nav.Link>
                                <Nav.Link href ="/parts"> 
                                    <MobileMenu 
                                        icon = "partsIcon.svg"
                                        text = "Buy Parts"
                                    />
                                </Nav.Link>
                                <Nav.Link href ="/contact"> 
                                    <MobileMenu 
                                        icon = "contactIcon.svg"
                                        text = "Contact Us"/>
                                </Nav.Link>
                                {number > 1 &&
                                    <div className='cart' onClick={()=>cartClick()}> 
                                        <img src = '/static/cartLogo2.png'/>
                                        <span>Cart: {cartItems?.length}</span>  
                                    </div>
                                }


                                
                            </div>
                            
                        </Container>
                    </Navbar>
                    
                    <CartModal open = {showModal} itemsArray = {cartItems} handleClose = {()=>setShowModal(false)}/>

                {/* </Container> */}

            </div>

        </>

    )
}

export default Head;
