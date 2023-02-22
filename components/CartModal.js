import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TyreCard from './TyreCard';
import CircularProgress from '@mui/material/CircularProgress';
import useScreenSize from '../hooks/useScreenSize';
import CardCardMobile from './CarCardMobile';
import CartContext from '../layout';
import CarCard from './CarCard';


function CartModal({   
    open, 
    handleClose,
    itemsArray

}) {
    const number = useScreenSize()
    const {cartItems, setCartItems} = useContext(CartContext)

    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        
        transform: 'translate(-50%, -50%)',
        width: number > 1 ? 600: 400,
        borderRadius: '29px',
        height:600,
        bgcolor: '#123E6C',
        boxShadow: 24,
        p: 4.5,
        outline:'none',
      };

    const emptyCart = ()=>{
        
        window.localStorage.setItem("cart", JSON.stringify([]))

        setCartItems([]);
        handleClose()

    }
    const handleRemove = (item)=>{
        // console.log('remove..')
        let newList = cartItems.filter((obj)=>obj.id !== item.id)
        console.log(newList)
        setCartItems(newList);
        window.localStorage.setItem("cart", JSON.stringify(newList))

    }

    const handleEnquire = (item)=>{
        let message

        if(item === 'all'){

            message = "I want to enquire about the following items:"

            cartItems.map((item)=>{
                return(
                    message = message + 'id: '+item.id + " " + 'qty: '+item.qty + " "
                )
                })


        emptyCart()

        }else{
            
            if(item.attributes.BODYTYPE){
    
                message = `I want to enquire about the following car: \n
        
                    Id: ${item.id}
                    Stock Number: ${item.attributes.SKU}
                    Exterior Color: ${item.attributes.COLOR}
                    Trim: ${item.attributes.TRIM}
                    Model Year: ${item.attributes.YEAR}
                    Body: ${item.attributes.BODYTYPE}
                    Mileage: ${item.attributes.MILEAGE}
                    Fuel: ${item.attributes.FUEL}
                    Engine: ${item.attributes.ENGINE}
                    Transmission: ${item.attributes.TRANSMISSION}
                    Condition: ${item.attributes.CONDITION}
                    `
            }else{
                message = `I want to enquire about the following tyre: \n
        
                    Id: ${item.id}
                    Quantity: ${item.qty}
                    Brand: ${item.attributes.BRAND}
                    Type: ${item.attributes.TYPE}
                    Pattern: ${item.attributes.PATTERN}
                    Size: ${item.attributes.SIZE}
                    `
            }
        }


        

        const whatsAppAPI = `https://api.whatsapp.com/send/?phone=918838800109&text=${message}&type=phone_number&app_absent=0`

        window.location.href = whatsAppAPI;

        
    }
    
  
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='cartModal'
        
        
    >
       
        <Box sx={ModalStyle} className='box'>

                <div className='close_button' onClick={()=>handleClose()}>X</div>
            <div className='top'>
                <div  className='header'>

                    <Typography variant="h6" component="h3" className='title'> Cart Items {cartItems.length}</Typography>

                    <Button onClick = {()=>emptyCart()}variant="h3" component="h1" className = 'empty_cart'> Empty Cart </Button>
                    {/* <Button onClick = {()=>handleEnquire('all')}variant="h3" component="h1"> Send Querry</Button> */}


                </div>
            </div>

            <div className='body'>

                {itemsArray.sort((a,b)=> b.timestamp - a.timestamp)?.map((item, index)=>{

                    return(

                    <div className='ItemContainer'>
                         <div className='cart_units'>{item.qty} units</div>
                        {item.attributes.TYPE ? 
                            <TyreCard id = {item.id} tyreData = {item.attributes} units = {item.qty}/>
                            :
                            // <CardCardMobile data = {item} />
                            <CarCard id = {item.id} carData = {item.attributes}/>
                            
                        }
                        <div className='buttons_container'>
                            <Button onClick = {()=>handleRemove(item)}>Remove</Button> 
                            <Button onClick = {()=>handleEnquire(item)}>Enquire</Button>
                            {/* <span>{item.qty}</span> */}
                        </div>
                        

                    </div>
                    )


                    
                })}
            </div>

            {itemsArray.length > 0 &&

                <div  className='bottom'>

                    <img src = '/static/whatsapp-icon.svg'/>

                    <Button onClick = {()=>handleEnquire('all')}variant="h3" > Cart out with sales</Button>
                    <img src= '/static/arrow_black.svg'/>   
                </div>
            }
        
           

        </Box>


  

       

    </Modal>
  )
}

export default CartModal
