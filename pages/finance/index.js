/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-06 22:49:43
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-11-30 21:51:16
 * @FilePath: \part-time-lindacars\pages\finance\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const index = () => {
    return (
        <div>
            <div className='top_banner'>
                <img src='/static/finance-page-banner.jpg' />
            </div>
            <div className="pd-20 content_wrap">
                <p className='article_text'>
                    <b>Car Finance</b>  with Linda cars to get a hassle-free experience. Simply fill out the form below and one of our representatives will get in touch with you soon!
                </p>
                <div className='article_card'>
                    <div className='article_title'>
                        CAR FINANCE ENQUIRY
                    </div>
                    <Form>
                        <Row>
                            <Col xl={4} lg={4} md={4}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Control type="text" placeholder="Full Name*" required />
                                </Form.Group>
                            </Col>
                            <Col xl={4} lg={4} md={4}>
                                <Form.Group className="mb-3" controlId="emailAddress">
                                    <Form.Control type="email" placeholder="Email Address*" required />
                                </Form.Group>
                            </Col>
                            <Col xl={4} lg={4} md={4}>
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Control type="text" placeholder="Phone Number*" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12} lg={12} md={12}>
                                <Form.Group className="mb-3" controlId="message">
                                    <Form.Control type="message" placeholder="Message*" required />
                                </Form.Group>
                            </Col>

                        </Row>


                        <Button variant="primary" type="submit" className='finance_form_button' size='lg'>
                            SUBMIT
                        </Button>
                    </Form>
                </div>

                <p className='article_title'>
                    FINANCIAL SERVICES
                </p>
                <p className='article_text'>
                    We believe that financing your new “used vehicle” should be a simple, stress-free exercise.
                </p>
                <p className='article_text'>
                    At Linda Cars we invest in an exceptional financial advisor who is fully trained to match the right finance package to the right customer.
                </p>
                <p className='article_text'>
                    Finance options can be daunting. Do you choose low interest, long term, short term, buy back or deferred payments. We understand that some payment plans and deals from other dealerships may look a little too good to be true. Leave the research headaches to our friendly, professional finance professional who will look carefully at your financial circumstances and match you with car finance or a car loan, which fits your budget comfortably. We also explain in plain English, without using jargon, so you know exactly what you are signing.
                </p>
                <p className='article_text'>
                    Our financial advisor can access some great deals, specials and low interest finance options. We can also put together servicing packages and insurance cover, all under one roof, taking the hassle out of car paperwork and payments.
                </p>
                <p className='article_text'>
                    Your success is our success. So, it makes sense for Linda Cars to ensure your satisfaction so you return again and again.
                </p>
            </div>

        </div>
    )
}

export default index
