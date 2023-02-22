/*
 * @Author: superYan 1315007322@qq.com
 * @Date: 2022-11-06 14:56:30
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-11-07 20:06:29
 * @FilePath: \part-time-lindacars\pages\sell\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const index = () => {
    return (
        <div>
            <div className='top_banner'>
                <img src='/static/sell-your-car-page-banner.jpg' />
            </div>
            <div className="pd-20 content_wrap">
                <p className='article_text'>
                    <b>Used cars buyers in Dubai or Consign it</b>
                    with Linda cars to get a hassle-free experience. Simply fill out the form below and one of our representatives will get in touch with you soon!
                </p>

                <div className='article_card'>
                    <div className='article_title'>
                        CONSIGN YOUR CAR ENQUIRY
                    </div>
                    <Form>
                        <Row>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Select required>
                                        <option value={""}></option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Select required>
                                        <option value={""}></option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Select required>
                                        <option value={""}></option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Select required>
                                        <option value={""}></option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Control type="text" placeholder="Full Name*" required />
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="emailAddress">
                                    <Form.Control type="email" placeholder="Email Address*" required />
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Control type="text" placeholder="Phone Number*" required />
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} className='sell_form_ext'>
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label htmlFor="disabledSelect">Hossam (Purchase Manager)</Form.Label>
                                    <div>
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                        <a href="">050 355 3482</a>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12}>

                            </Col>
                            <Col xl={6} lg={6} md={12} className='sell_form_ext'>
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label htmlFor="disabledSelect">Hossam (Purchase Manager)</Form.Label>
                                    <div> 
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                        <a href="">050 355 3482</a>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" className='finance_form_button' size='lg'>
                            SUBMIT
                        </Button>
                    </Form>
                </div>
                <p className="article_title">
                    Sell My Car Dubai
                </p>
                <p className='article_text'>
                    <b>Consign your car</b> and sell your car for more cash in less time. <b>Sell your car on consignment</b> for the best market price fixed by yourself but first let’s understand what is <b>consignment car sales. Selling car on consignment</b> is an innovative way to sell your Car In the UAE. This allows you to sell your car at a higher Value, hassle-free! I Bet you’re wondering how that is possible, right? Let us explain.
                </p>
                <p className='article_text'>
                    A growing trend toward <b>auto consignment</b> has emerged recently. <b>Consignment car sales</b> is a great way to avoid the hassles of private car sales, but as you would expect, letting someone sell your used car in Dubai is not as simple as having someone sell your books. Competition in the Used Car Industry in Dubai is Remarkable. marketing a high-Value vehicle Requires extensive preparation such as vehicle expertise, negotiation skills, ability to facilitate financing needs, strategic pricing, and much more expertise.
                </p>
                <p className='article_text'>
                    Consignment is the process In Which We Market and Sell Your Vehicle on your behalf. Where the Consignor (Yourself) and the Consignee (Linda Cars), enter into an agreement in which The Goal is to <b>consign your car</b> and sell it to a third party for the price agreed. Linda Cars Do Not bare ownership of the vehicle at any point in the transaction. The Transaction of selling the car won’t take place unless the right price is received by the third-party.
                </p>
                <p className='article_text'>
                    Linda Cars have an incredible online-driven marketing program for finding potential clients, as well as a large client network all over the world. We understand that parting ways with your vehicle can be difficult; however, you can rest assured that it’s in the right place. Linda Cars strive to make <b>selling car on consignment</b> an easy, and Hassle-free process.
                </p>
                <p className="article_title">
                    Why Would You Consign Your Car with Us?
                </p>
                <p className='article_text'>
                    Safety: When it comes to selling your car, safety and security become a problem. It can be a risky process, especially if you are not familiar with the Rules and regulations in the UAE.
                </p>
                <p className='article_text'>
                    Here at Linda Cars, we take care of all the work for you, our facility is safe and clean and our staff are highly knowledgeable and will do whatever it takes to <a href="">sell your car on consignment</a> as soon as possible.
                </p>
                <p className='article_text'>
                    Convenience: It is absolutely hassle-free for you to <b>consign your car</b> with us. No need to be concerned about no-shows or waiting for interested parties any longer. You won’t have to worry about scheduling test drives or Inspections, you don’t even need to worry about the negotiations.
                </p>
                <p className='article_text'>
                    We have it all covered!
                </p>
                <p className='article_text'>
                    Pricing is agreed upon before we sign the agreement, And the rest will be handled by us. It’s a very easy and stress-free procedure!
                </p>
                <p className='article_text'>
                    Trade-ins: We welcome trade-Ins for every make and model at Linda Cars.
                </p>
                <p className='article_text'>
                    Doing so makes it a lot easier for a potential buyer to trade in his car and pay the difference (if any) on the car he is buying.
                </p>
                <p className="article_title">
                    How do consign your car sales work?
                </p>
                <p className='article_text'>
                    THE APPRAISAL – Determining the market value of your car
                </p>
                <p className='article_text'>
                    In order to <b>sell your car on consignment</b> the first thing we do is perform an assessment. Our experts will inspect the vehicle, Do the necessary background Checks, evaluate the condition and marketability, and provide you with an estimate. This valuation would be the price we will pay for your vehicle on the spot.
                </p>
                <p className='article_text'>
                    The valuation for a car consignment is the price we believe the car should sell for at the fair market value, keeping in mind the inspection and background check taken on the car.
                </p>
                <p className='article_text'>
                    This will determine what we can offer to the consignor (yourself).
                </p>
                <p className="article_title">
                    Advertising – Marketing Your Vehicle
                </p>
                <p className='article_text'>
                    It’s important to market your vehicle properly if you’re looking to sell it quickly and at the highest value. Many things are important when it comes to advertising your vehicle. One Of the most important factors is the online audience reach.
                </p>
                <p className='article_text'>
                    As an <b>auto consignment dealer</b>, We try to make sure your car reaches everyone online.
                </p>
                <p className='article_text'>
                    Your vehicle will go for a Photo Shoot, then will be listed on the most popular car-buying platforms. Before the car is photographed, we do all the necessary work to get the car in the best visual condition for the shoot.
                </p>
                <p className='article_text'>
                    Before you <a href="">consign your car</a> for sale, please do not be hesitant to clarify any doubts you have with anyone one of our team members. Rather than slapping a “For Sale” sign in your back window and parking it on a busy street, <a href="">selling your car on consignment</a> gives you more exposure and access to potential buyers.
                </p>
                <p className="article_title">
                    PRICING – Choosing the Appropriate Price
                </p>
                <p className='article_text'>
                    Pricing is one of the areas where consignment showrooms can differ the most. Some showrooms will have pricing guidance and recommendations, but the final pricing decision will be yours to make. Others would expect you to stick to a strict pricing plan devised by their team. In any case, auto consignment dealers such as Linda Cars are familiar with the industry and should strive to get the best price for your car.
                </p>
                <p className='article_text'>
                    Although the advertised price is important, you must also weigh how much of the final sale price you can hold. Some <b>car dealers</b> take a percentage of the purchase price, typically between 10% and 20% on <b>average</b>, others simply charge a flat fee or do both as  <b>auto consignment fees</b>.
                </p>
                <p className="article_title">
                    TRANSACTION – Selling, Negotiating, and Handling Paperwork
                </p>
                <p className='article_text'>
                    The fact that we conduct the actual selling process is perhaps the most significant advantage of vehicle consignment. All test drives, customer requests, and DMV paperwork can be handled by us as the vehicle consignment showroom. These crucial components of private party car sales can take up a lot of time and should be left to the experienced.
                </p>
                <p className='article_text'>
                    We at Linda Cars handle the negotiations, which means no more stress, discussing the “Final Price” with the buyers. Dealing with strangers can be challenging, allowing the consignment showroom to manage all negotiations, payment collection, and DMV paperwork is the easiest and most efficient procedure for both the buyer and seller.
                </p>
                <p className="article_title">
                    PRODUCTS & SERVICES
                </p>
                <p className='article_text'>
                    <b>Consignment car sales</b> is also very convenient for third-party buyers, also maximizing the Speed of the sales process for the seller.
                </p>
                <p className='article_text'>
                    Linda Cars cover and benefit both sellers and customers when it comes to private party car sales. We also provide goods and services that many consumers Require, but are unable to obtain on their own in the private sector.
                </p>
                <p className='article_text'>
                    These are a few of the resources available:
                </p>
                <ul className='article_ul'>
                    <li>
                        Vehicle Finance: We help aid customers when it comes to buying a car through bank finance.
                    </li>
                    <li>
                        Warranties: We provide customers with after-market warranties, and service contracts, that helps the customers feel more at ease when it comes to the technical needs for their car in the future.
                    </li>
                    <li>
                        Shipping: In case the customer is abroad and wants to purchase a car, we take care of the shipping on his behalf, ensuring the car is delivered right to their doorstep, anywhere in the world.
                    </li>
                </ul>
                <p className='article_text'>
                    Once again, such <b>auto consignment</b> benefits all parties involved in the process. Warranty, financing, and delivery. In addition to the buyer benefits mentioned above, this process ensures the speed and efficiency of the transaction.
                </p>
                <p className='article_text'>
                    <b>Auto consignment</b> is an appealing choice for car owners, especially with Linda Cars, ensuring that you receive the full potential value for your car.
                </p>
                <p className='article_text'>
                    The consignment model is straightforward – It’s your ride, but it’s sold by us. ensuring maximum degree of professionalism and service. Optimizing the Sale while eliminating the risk and inconvenience For You is the Goal!
                </p>
                <p className='article_text'>
                    Check out our consignment tools or contact us for a free vehicle appraisal.
                </p>
                <p className='article_text'>
                    <b>Auto consignment</b> is the way for you. <b>Consign your car</b> with us today!
                </p>
                <p className='article_text'>
                    Please Don’t Hesitate to get in touch with one of our team members for any queries.
                </p>
                <div className="article_line">

                </div>
                <p className="article_title">
                    INSTANT CASH CAR
                </p>
                <p className='article_text'>
                    Linda Cars is one of the finest places to urge <a href="">instant cash car</a> offers in Dubai. We have been providing <b>instant cash for cars</b> for years to construct belief and validity within the locale. At Linda Cars, we centre less on maximizing our benefits and more on improving client involvement, which is why we ensure a reasonable cost for your car at whatever point you come to us. If you need <b>same day cash for cars</b> in Dubai, we are able to assist you and offer you a sensible rate in return. So, in case you discover yourself in need of <b>instant cash for car</b>, you know where to go! Here are the top reasons why most clients looking to offer a car for cash in Dubai, choose us.
                </p>
                <p className="article_title">
                    INSTANT CASH OFFER FOR CARS IN MINUTES
                </p>
                <p className='article_text'>
                    There are situations when you need to sell your car right away because you require <b>same-day cash for cars</b>. Most places that buy automobiles will make things even more difficult for you by taking days to appraise your vehicle and then handing over the cash. They will often try to sell you one of the cars in their inventory because they are unable to pay <b>instant price for your car</b>. When you come to Linda Cars, you won’t have to deal with any of that. If everything makes sense to you, we can complete the sale in a matter of minutes. Linda Cars is dedicated to making our customers’ sales experiences as enjoyable and profitable as possible, which is why we guarantee that you’ll have the <b>instant cash for car</b> in minutes. Simply contact us, receive an estimate, and begin the sales process.
                </p>
                <p className="article_title">
                    TRUST FOR EVERY REASON
                </p>
                <p className='article_text'>
                    You must ensure that the people you are selling your car to are proper individuals. During the car sale process, you want to avoid fraud as much as possible. We are a well-established company in Dubai, with hundreds of thousands of satisfied clients and RTA certification.
                </p>
                <p className="article_title">
                    HAVING LOAN? NO PROBLEM!
                </p>
                <p className='article_text'>
                    {">"} When you try to sell a car in Dubai that has payments due on it, many car dealerships will simply say no. We like to make things easy for our customers, therefore when it comes to an <b>instant cash offer for car</b>, you can rely on us. If you need cash right away for a car that has payments due, complete our no-hassle online form process or visit our showroom.
                </p>
                <p className="article_title">
                    HIGHEST PRICE GUARANTEED
                </p>
                <p className='article_text'>
                    We always give our customers the best <a href="">instant cash car</a> offer for cars in Dubai because we know the market quite well, relying on the solid expertise of our employees and professionals, which is built on years and years of working in the car trading industry and their passion for cars. Our employees love what they do and want to serve the customer as well as they can. because we think that a happy customer is a customer for life who will return if the service is at its best. That’s why, in Dubai’s market, <b>we buy cars for cash</b> and at the highest possible price!
                </p>

            </div>
        </div>
    )
}

export default index
