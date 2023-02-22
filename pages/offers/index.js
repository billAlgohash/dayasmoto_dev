/*
 * @Author: superYan 1315007322@qq.com
 * @Date: 2022-11-05 15:47:44
 * @LastEditors: superYan 1315007322@qq.com
 * @LastEditTime: 2022-11-05 16:18:09
 * @FilePath: \part-time-lindacars\pages\offers\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

const index = () => {
    return (
        <div>
            <div className='top_banner'>
                <img src='/static/offers-page-banner-new2.jpg' />
            </div>
            <div className="pd-20 content_wrap offers">
                <div className='article_card'>
                    <div className="img">
                        <img src="/static/website-offer.png" alt="" />
                    </div>
                    <p>
                        To Book an Appointment call:
                    </p>
                    <ul className='offers_card_methods'>
                        <li>
                            Hossam @
                            <a href="">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                050 355 3096
                            </a>

                        </li>
                        <li>
                            Hamza @
                            <a href="">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                050 355 3482
                            </a>

                        </li>
                        <li>
                            Reechi @
                            <a href="">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                054 432 0011
                            </a>

                        </li>
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default index
