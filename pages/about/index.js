/*
 * @Author: superYan 1315007322@qq.com
 * @Date: 2022-11-05 14:54:16
 * @LastEditors: superYan 1315007322@qq.com
 * @LastEditTime: 2022-11-05 15:12:03
 * @FilePath: \part-time-lindacars\pages\about\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Row, Col } from 'react-bootstrap'


const index = () => {
    return (
        <div>
            <div className='top_banner'>
                <img src='/static/about-us-banner.jpg' />
            </div>
            <div className="pd-20 content_wrap">
                <div className='article_title'>
                    A Leading Car Dealer For Over 3 Years
                </div>
                <p className='article_text'>
                    Welcome to Linda Cars. The future of the automotive industry here in your very own city of Dubai, where we dedicate our years of experience with everything car related, be it used or new cars in Dubai, making sure that we only pick the top cars after applying our expertise in selecting the finest, cleanest and most affordable premium cars out there for you to enjoy and have the sought for peace of mind on the road.
                </p>
                <p className='article_text'>
                    Linda Cars is a family run business located in
                    <b>
                        12 floor, office No 1, The One Tower Barsha Heights, Sheikh Zayed Road, Dubai UAE. Established in 2018.
                    </b>
                </p>


                <div className='article_card'>
                    <div className='article_title'>
                        SINCE 2018
                    </div>
                    <Row>
                        <Col xl={6} lg={6} >
                            We work with each and every one of our clients to source the exact make and model of car to satisfy their individual needs. We pride ourselves on providing excellent customer service, before, during and after the sale or purchase of any car. Linda Cars has Automotive customer-centric approach, international standards and value-add business philosophy enables it to be the automotive company of choice across all of the territories in which it operates.
                        </Col>
                        <Col xl={6} lg={6} >
                            The company is regarded as a pioneer in the GCC automotive industries. Its service offering encompasses every aspect of the automotive value chain from economic Sedan, Suvs, premium to Luxury Vehicles. We have a strong and committed sales staff with many years of experience satisfying our customers’ needs. Feel free to browse our inventory online. Schedule a test drive for free or get a car evaluation by our experts professional.
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col xl={4} lg={4}>
                        <div className='quota'>
                            <p>
                                100
                            </p>
                            <p>
                                Vehicles in Stock
                            </p>
                        </div>
                    </Col>
                    <Col xl={4} lg={4}>
                        <div className='quota'>
                            <p>
                                1300
                            </p>
                            <p>
                                Vehicles Sold
                            </p>
                        </div>
                    </Col>
                    <Col xl={4} lg={4}>
                        <div className='quota'>
                            <p>
                                5
                            </p>
                            <p>
                                Years in Business
                            </p>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default index
