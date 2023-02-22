import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TyreCard from './TyreCard';
import CircularProgress from '@mui/material/CircularProgress';
import useScreenSize from '../hooks/useScreenSize';
import CartContext from '../layout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


function TyreCardModal(
    {   open, 
        handleClose,
        itemData,
        itemsArray

    }) {

        const [itemsList, setItemsList] = useState({
            typeList: [],
            patternList:[],
            sizeList:[]
        })
        const number = useScreenSize()
        const {cartItems, setCartItems} = useContext(CartContext)
        


        const [data, setData] = useState(itemData)
        const [showSnackBar, setShowSnackBar] = useState(false)
        const [alertMessage, setAlertMessage] = useState('')

        const [selected, setSelected] = useState({
            type: itemData?.attributes.TYPE,
            pattern: itemData?.attributes.PATTERN,
            size: itemData?.attributes.SIZE,
            // quantity:itemData?.attributes.QTY40HQ
            
        })

        const [quantity, setQuantity] = useState(itemData?.attributes.QTY40HQ)

        

        // console.log(data)


    const ModalStyle = {
      position: 'absolute',
      top: number > 1 ? '50%': '57%',
      left: '50%',
      
      transform: 'translate(-50%, -50%)',
      width: number > 1 ? 600: 400,
      
      bgcolor: 'background.paper',
    //   border: '2px solid #000',
      outline:'none',
      boxShadow: 24,
      p: 0,
    };


    const handleOptionClick = (category, value)=>{
        setSelected((prev)=>{return({...prev, [category]:value})})
    }

    const handleReset = ()=>{
        setSelected(()=>{return({
            type: itemData?.attributes.TYPE,
            pattern: itemData?.attributes.PATTERN,
            size: itemData?.attributes.SIZE,
            // quantity:itemData?.attributes.QTY40HQ
        })})
        setQuantity(itemData?.attributes.QTY40HQ)
    }

    const populateOptions = ()=>{

        if(open){
    
            const brandName = itemData?.attributes?.BRAND
            // const typeName = data?.attributes?.TYPE
            // const sizeName = data?.attributes?.SIZE
        
            let types = itemsArray.filter((item)=>item.attributes.BRAND === brandName)
            let patterns = types.filter((item)=>item.attributes.TYPE === selected.type)
            let sizes = patterns.filter((item)=>item.attributes.PATTERN === selected.pattern)

            const finalResult = sizes.filter((item)=>item.attributes.SIZE === selected.size)
            // console.log("finalResult: ", finalResult[0])

            types = types.map(item => item?.attributes.TYPE)
            const typesSet = new Set(types)
            const typeList = [...typesSet]
        
            patterns = patterns.map(item => item?.attributes.PATTERN)
            const patternsSet = new Set(patterns)
            const patternList = [...patternsSet]
        
            sizes = sizes.map(item => item?.attributes.SIZE)
            const sizesSet = new Set(sizes)
            const sizeList = [...sizesSet]
    
            setItemsList({typeList, patternList,sizeList, brandName })
            setData(finalResult[0])
            // console.log(brandName,typeList, patternList,sizeList)
            
    
        }
    }

    const handleIncrement = (action)=>{
        
        
        if(action === 'add'){
            setQuantity((prev)=>parseInt(prev)+10)

        }else{
            const new_quantity = parseInt(quantity) - 10
            if(new_quantity > 10){
                setQuantity(new_quantity)
            }else{
                setQuantity(0)
            }
        }
    }

    const handleInputChange = (e)=>{
        const input = e.target.value
        try{

            let new_quantity = input === ''? input :parseInt(input)

            if(new_quantity){
                setQuantity(new_quantity)
            }

            
        }catch(err){
            console.log(err)
        }

    }

    const addToCart = ()=>{


        const existingIds = cartItems.map((item)=>item.id)
        const isIncluded = existingIds.includes(data.id)

        let newList = cartItems

        if(!isIncluded){

            newList = [...cartItems, {qty:parseInt(quantity),timestamp:Date.now(),...data}]
            
            setAlertMessage('Item successfully added')
        }else{
            setAlertMessage('Item already added')

        }
        setShowSnackBar(true)

        setCartItems(newList)
        window.localStorage.setItem("cart", JSON.stringify(newList))
        handleClose()

    }

    
    useEffect(()=>{
        populateOptions()
      
        if(open){
            // this is not working though!! 
            return ()=>  document.body.style.overflowY = 'hidden'
        }

      },[open, selected])

   

    useEffect(()=>{
        
        handleReset()
        
    },[itemData])

    useEffect(()=>{

        setQuantity(data?.attributes.QTY40HQ)

    },[data])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      

  return (
    <div>

        <Modal
            open={open}
            onClose={handleClose}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
           
            

       >
        {(selected.type && itemsList.typeList.length > 0) ?

         <Box sx={ModalStyle} className = 'tyreModal'>

            <div className='close-button' onClick={()=>handleClose()}>X</div>

             
            <div className = "modalTop">

                {(itemsList.sizeList.length === 0 ||itemsList.patternList.length === 0 || itemsList.typeList.length === 0 )?
                    <div className='row'>
                            <Typography className='rowMessage error'>
                                <span >No Items found with Type: {selected.type}, Pattern: {selected.pattern}, and Size: {selected.size}</span> 
                            </Typography>
                            
                            <Button className = 'reset-button'onClick = {()=>handleReset()}>Reset</Button>

                    </div>
                :
                <>
                    {data ?
                        <TyreCard id = {data?.id} tyreData={data?.attributes}/>
                        :
                        <Typography className='rowMessage'> <span>Please select a size</span>  </Typography>
                    }
                </>


                }
              
            </div>
        
        
            <div className='filterSection'>
            
                <div className='row'>
                    <Typography className = 'optionTitle'>
                        Available Types from the Selected Brand
                    </Typography>

                    <Typography className = 'optionsContainer' id="modal-modal-description" sx={{ mt: 2 }}>
        
                            {itemsList.typeList.map((item,index)=>{
                                return(
                                    <span 
                                        className={'option'+ ' '+((item === selected.type) ? 'selected':'')} 
                                        key = {index}
                                        onClick = {()=> handleOptionClick('type', item)}
                                    >
                                    
                                        {item}
                                    
                                    </span>
                                )
                            })}
                            {itemsList.typeList.length === 0 && <span>No Items found!</span>}
                            
                        
                    </Typography>

                </div>
                <div className='row'>
                    <Typography className = 'optionTitle'>
                            Available Patterns of Selected Type
                    </Typography>
                    <Typography className = 'optionsContainer' id="modal-modal-description" sx={{ mt: 2 }}>
                        
                            {itemsList.patternList.map((item, index)=>{
                                return(
                                    <span className={'option'+ ' '+((item === selected.pattern) ? 'selected':'')}  
                                        key = {index}
                                        onClick = {()=> handleOptionClick('pattern', item)}
                                        
                                    >
                                        {item}
                                    
                                    </span>
                                )
                            })}
                            {itemsList.patternList.length === 0 && <span>No Items found!</span>}
                        
                    </Typography>

                </div>
                <div className='row'>
                    <Typography className = 'optionTitle'>
                        Available Sizes of Selected Pattern    
                    </Typography>
                    <Typography className = 'optionsContainer' id="modal-modal-description" sx={{ mt: 2 }}>
                        
                        {itemsList.sizeList.map((item,index)=>{
                            return(
                                <span className={'option'+ ' '+((item === selected.size) ? 'selected':'')} 
                                key = {index}
                                onClick = {()=> handleOptionClick('size', item)}
                                >
                                
                                    {item}
                                
                                </span>
                            )
                        })}
                    
                        
                    </Typography>

                </div>
                
            </div>
            
            <div className='cartAction'>
                <div className = 'units'> 
                    <div className='units_label'>
                        <img src= "/static/units_icon.svg"/>

                        <span>Units</span> 

                    </div>

                    <div className='increment'>

                        <div onClick = {()=>handleIncrement('subtract')}>
                            <img src= "/static/minus_sign.svg"/>
                        </div>

                        <div> 

                            <input className = "tyre_quantity" value = {quantity} onChange={(e)=>handleInputChange(e)}/>
                        </div>
                        
                        <div onClick = {()=>handleIncrement('add')}>
                            <img src= "/static/plus_sign.svg"/>
                        </div>
                        
                    </div>
                </div>
                <div className='modal_buttons'>
                    <Button variant="primary" type="reset" className='add_to_cart'  onClick = {()=>addToCart()}> Add To Cart </Button>
                    <Button variant="primary" type="reset" className='add_to_cart close' onClick = {()=>handleClose()}> Close </Button>
                </div>


            </div>


         </Box>
         :
         <Box  sx={{...ModalStyle, height:400, display: 'flex' }}>
            
            <CircularProgress color="success"  />
            
         </Box>
        }
        </Modal>

       <Snackbar
        open={showSnackBar}
        autoHideDuration={2500}
        onClose={()=>setShowSnackBar(false)}
        message={alertMessage}
        severity="success"

        // action={action}
      />
       
      
    </div>
  )
}

export default TyreCardModal