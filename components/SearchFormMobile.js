import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormSelect from './FormSelect';
import formatPrice from '../utils'
import Slider from '@mui/material/Slider';




export default function SearchFormMobile({options,handleSelect,formData,handleReset,showOptions,setShowOptions,handleSliderChange}) {

    // console.log(Object.keys(options))

  return (
    <>
        <div className='mobile_search_form'>
            
            <div className='search_bar'>
                <img src = '/static/search-icon.png'/>
                <input/>
                <div className='mobile_btns'>
                    <Button variant="primary" type="reset" className='more_options' size='lg' onClick={()=>setShowOptions(prev => !prev)}>
                        More Options
                    </Button>
                    <Button variant="primary" type="submit" className='reset' size='lg' onClick = {(e)=>{e.preventDefault();handleReset()}}>
                        Reset
                    </Button>
                </div>

            </div>

            {showOptions &&
            <Form>
                <div className='options_container'>

                    {Object.keys(options).slice(0,-1).map((key,index)=>{

                        const keyName = key === 'year'? 'year': key.slice(0,-1).toLowerCase()
                        // console.log('keyName: ',keyName, key, options[key])
                        return(
                            <Row xs={12} key = {index}>
                                <Form.Group className="mb-3"  style = {{padding:'0rem'}}controlId={keyName}>

                                    <FormSelect 
                                        options = {options[key]} 
                                        placeholderText = {keyName}
                                        handleSelect = {key === 'year'? handleSliderChange: handleSelect} 
                                        id = {keyName}
                                        value = {formData[keyName]}
                                        />

                                </Form.Group>

                            </Row>

                        )
                    })}

                    {/* <Row xs={12}>
                        <Form.Group className="mb-3" controlId="bodytype">

                            <FormSelect 
                                options = {options.bodyTypes} 
                                placeholderText = "Body Type" 
                                handleSelect = {handleSelect} 
                                id = 'bodytype'
                                value = {formData.bodytype}
                                />

                        </Form.Group>
                    </Row>

                    <Row xs={12}>
                        <Form.Group className="mb-3" controlId="make">
                            <FormSelect 
                                options = {options.makes} 
                                placeholderText = "Make" 
                                handleSelect = {handleSelect} 
                                id = 'make'
                                value = {formData.make}
                                />
                        </Form.Group>
                    </Row>

                    <Row xs={12}>
                        <Form.Group className="mb-3" controlId="model">
                            <FormSelect 
                                options = {options.models}  
                                placeholderText = "Model" 
                                handleSelect = {handleSelect} 
                                id = 'model'
                                value = {formData.model}
                                />
                        </Form.Group>
                    </Row>

                    <Row xs={12}>
                        <Form.Group className="mb-3" controlId="year">
                            <FormSelect 
                                options = {options.year}  
                                placeholderText = "Year"
                                handleSelect = {handleSliderChange} 
                                id = 'year'
                                value = {formData.year}
                            />
                        </Form.Group>
                    </Row> */}

                </div>

            </Form>
            }

            
        
        </div>

       

    </>
  );
}