import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Tabs, Tab, Form, Button } from 'react-bootstrap'
import formatPrice from '../utils'
import Slider from '@mui/material/Slider';

function EmiCalculator({carDetail}) {
    const [rang1, setRang1] = useState(20)
    const [rang2, setRang2] = useState(80)

    const [loanTenure, setLoanTenure] = useState(60)
    const [emi, setEmi] = useState(Math.round((carDetail.PRICE / loanTenure) * rang2 / 100))
    const [downpayment, setDownpayment] = useState(Math.round(carDetail.PRICE * rang1 / 100))


    const handlePillClick = (e)=>{
        const value = parseInt(e.target.innerText)

        setLoanTenure(value)
    }

    useEffect(()=>{
        // console.log(downpayment, emi)
        setDownpayment(Math.round(carDetail.PRICE * rang1 / 100))
        setEmi(Math.round((carDetail.PRICE / loanTenure) * rang2 / 100))

    },[rang1,rang2,loanTenure])

    const handleSliderChange = (e,cateogry = 'emi')=>{
        let value = e.target.value

        if(cateogry === 'downpayment'){
        
            if (value === "0") {
                setRang2(100)
            } else if (value === "100") {
                setRang2(0)
            }else {
                setRang2(100- value)
            }
            
            setRang1(value)
        
            
        }else{
            if (value === "0") {
                setRang1(100)
            } else if (value === "100") {
                setRang1(0)
            } else {
                setRang1(100 - value)
            }

           
            setRang2(value)

        }

    }

    



  return (
    <div className='calculator_container'>
        <div className = 'set_parametres'>
            <div className='loan_tenure'>

                <div className='title'>Loan Tenure</div>
                <div className='tenure_pills_container'>
                    <div className={'tenure_pills'+ ` ${loanTenure === 12 ? 'selected':''}`}  onClick={(e)=>handlePillClick(e)}>12</div>
                    <div className={'tenure_pills'+ ` ${loanTenure === 24 ? 'selected':''}`} onClick={(e)=>handlePillClick(e)}>24</div>
                    <div className={'tenure_pills'+ ` ${loanTenure === 36 ? 'selected':''}`}  onClick={(e)=>handlePillClick(e)}>36</div>
                    <div className={'tenure_pills'+ ` ${loanTenure === 48 ? 'selected':''}`}  onClick={(e)=>handlePillClick(e)}>48</div>
                    <div className={'tenure_pills'+ ` ${loanTenure === 60 ? 'selected':''}`}  onClick={(e)=>handlePillClick(e)}>60</div>


                </div>

            </div>
            <div className='downpayment'>

                <div className='downpayment_info'>
                    <div className='title'>Downpayment </div> 
                    <div className='amount'>
                        AED {formatPrice(downpayment)}
                    </div>

                </div>


                <Slider value={rang1} sx={{ color: '#00FFD1', height:'1px'}} onChange={(e) =>handleSliderChange(e,'downpayment') } />

            </div>
            <div className='emi'>
                
                <div className='emi_info'>
                    <div className='title'>Monthly EMI </div> 
                    <div className='amount'>
                        AED {formatPrice(emi)}
                    </div>

                </div>

                <Slider value={rang2} sx={{ color: '#00FFD1', height:'1px'}}
                        onChange={(e) => handleSliderChange(e)} />

            </div>
        </div>

        <div className='info_tab'>
            <div className='title_bar'>
                <div >Payment</div>

                <div className='mobile_btns'>
                    <Button variant="primary" type="reset" className='more_options' size='lg'>
                        Full Amount
                    </Button>
                    <Button variant="primary" type="submit" className='reset' size='lg'>
                        EMI's
                    </Button>
                </div>

            </div>
            <div className='content_panel'>
                <div className='summary'>
                    <div>
                        <h6>Emi Amount</h6>
                        <span className='amount emi'>AED {formatPrice(emi)}</span>
                    </div>
                    <div>
                        <h6>Downpayment</h6>
                        <span className='amount downpayment'>AED {formatPrice(downpayment)}</span>
                    </div>
                  
                   

                </div>

                <div className='content_row'>
                    <div className= 'name'>Car Price</div>
                    <div className='value'>AED {formatPrice(carDetail.PRICE)}</div>
                </div>
                <div className='content_row'>
                    <div className= 'name'>Downpayment</div>
                    <div className='value'>AED {formatPrice(downpayment)}</div>
                </div>
                <div className='content_row'>
                    <div className= 'name'>Loan amount with charges</div>
                    <div className='value'>AED {formatPrice(carDetail.PRICE - downpayment)}</div>
                </div>
                <div className='content_row'>
                    <div className= 'name'>Loan Tenure</div>
                    <div className='value'> {loanTenure}</div>
                </div>



            </div>


        </div>

    </div>
  )
}

export default EmiCalculator