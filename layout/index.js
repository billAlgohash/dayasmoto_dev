import React, { useEffect } from 'react';
import Head from './head';
import Foot from './foot';
import useScreenSize from '../hooks/useScreenSize';
import { Provider } from 'react-redux';
import { useState, createContext } from "react";
import useInitialRender from '../hooks/useInitialRender';



const CartContext = createContext()

const BaseLayout = ({ children }) => {

    
    const [cartItems, setCartItems] = useState([])
    // const [screenSize, setScreenSize] = useState(0)
    
    useEffect(()=>{

        if(window.localStorage.getItem('cart')){

            const existingItems = JSON.parse(window.localStorage.getItem('cart'))
            // console.log('existingItems: ',existingItems)
            setCartItems(existingItems)
        } else{
            // console.log('setting up cart...')
            window.localStorage.setItem("cart", JSON.stringify([]))

        }


    },[])

    const {firstRender,number} = useInitialRender()

    // console.log('firstRender: ',firstRender,'screen size: ', number)
   
    
    return (
        // <Provider store = {store}>

            <CartContext.Provider value = {{cartItems, number, setCartItems}} >
                {!firstRender &&
                    <div className='App'>
                        <Head />
                        
                            <div className='main'>{children}</div>
                        
                        <Foot />
                    </div>


                }
            </CartContext.Provider>
      

    


    )
}

export {BaseLayout}
export default CartContext
