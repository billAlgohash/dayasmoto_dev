import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Row, Col, Form, Button } from 'react-bootstrap'
import Slider from '@mui/material/Slider';

const FormSelect = ({options,placeholderText, handleSelect,handleSliderChange,id,value}) => {
 


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 'auto',
          maxWidth:360,
        //   maxWidth: '100%',
          background: '#DADADA',
          boxShadow:'none',
          borderRadius:'0px 5px 19px 19px',
          marginTop:'-9px',
          marginLeft:'0px',

        //   border: `1px dashed red`


        },
      },
    };

    const [showMenu, setShowMenu] = useState(false)
    // console.log(placeholderText, id)

    const handlePageScroll = ()=>{
        // console.log('showmenu', showMenu)
        setShowMenu(false)
    }

    useEffect(() => {
        function watchScroll() {
          window.addEventListener("scroll", handlePageScroll);
        }
        watchScroll();
        return () => {
          window.removeEventListener("scroll", handlePageScroll);
        };
      });

  return (
    <Select
        open = {showMenu}
        displayEmpty
        value={id ==='year'?`Min Year: ${value}`: value}
        onChange={(e)=>{handleSelect(e,id)}}
        input={<Input />}
        disableUnderline = {id === 'year'||id ==='li_sr'}

        onClick={()=>setShowMenu(prev=>!prev)}
        // sx={{ width: '150%' }}

        renderValue={(selected) => {
            let defaultText  = placeholderText
            if(id === 'type'){
                defaultText = 'Body Type'

            }else if(id === 'li_sr'){
                defaultText = 'LI_SR'

            }
            else{
                defaultText = defaultText.charAt(0).toUpperCase() + defaultText.slice(1);

            }

            return(

                selected? 
                    <span style = {{fontFamily:'Manrope-Bold', fontSize:'13px',marginLeft:'1rem' }}>{selected}</span>
                :
                    <span style = {{fontFamily:'Manrope-Bold', fontSize:'13px', marginLeft:'1rem'}}>{defaultText}</span>
            )
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        className='form_select'

        
 
        >
  
            
            {id !== 'year'&& 
                <MenuItem value={''}>
                    <span style = {{fontFamily:'Manrope-Bold', fontSize:'13px' }}>Any {placeholderText.toUpperCase()}</span>
                </MenuItem>
            }

                {options.map((name) => {

                        if(id !=='year'){

                            return(<MenuItem
                                        key={name}
                                        value={name}
                                        id = {id}
                                        style = {{fontFamily:'Manrope-Bold', fontSize:'13px'}}
                                    >
                                        {name}
                                </MenuItem>
                            )
                        }

                    }
                )}
            
                {id === 'year' &&
                    <MenuItem 
                        value={''} 
                        style = {{fontFamily:'Manrope', fontSize:'13px'}}>
                        <Slider
                            sx={{
                                height:'1px',
                                // color: '#00FFD1',
                            }} onChange={(e)=>{handleSelect(e,id)}}/>
                    </MenuItem>
                }
            
        
        
    </Select>
  )
}

export default FormSelect