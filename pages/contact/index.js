import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContactForm from '../../components/ContactForm'
import TeamMemberCard from '../../components/TeamMemberCard'
import teamMembers from '../../Data/teamMembers.json'
import useScreenSize from '../../hooks/useScreenSize'
import CartContext from '../../layout'

const Contact = () => {
    // const [number, setNumber] = useState(3)

    const renderCards = (title) => {
        const {members} = teamMembers
        // console.log(members)
        let result = []

        result = members.map((member)=>{

            if(title === 'sales' && member.title.toLowerCase() === title) {
                return(
                    <Col xl={4} lg={4} key={member.id} >
                        <TeamMemberCard member={member}/>
                    </Col>
                )

            }
            else if(title === 'all_else' && member.title.toLowerCase() !== 'sales'){
                return(
                    <Col xl={4} lg={4} key={member.id} >
                        <TeamMemberCard member={member}/>
                    </Col>
                )


            }

        }
        )
        
        return result;
    }

    const {number} = useContext(CartContext)

    


    return (
        <div className='page_container'>
            {/* <div className='top_banner'>
                <img src={ number >1 ? "/static/cantact_us_banner_land.jpeg" : "/static/cantact_us_banner_portrait.jpeg"} alt="" />

            </div> */}
            <div className='home_banner1'>

                <div className='title'>

                    <div>Contact</div>
                    {number >1 ?
                        <div>DAYAS Moto</div>
                        :
                        <div style = {{padding:'0.8rem 0rem'}}><img src = 'static/homePage_banner_logo.png'/></div>
                        
                    }

                    <div className='page_title'>
                        <span>
                            Buy Used Cars in Dubai
                            
                        </span>
                        {number > 1 &&
                        <span>
                            {number >1 && 'Choose and Enjoy'}
                        </span>
                        }
                        {/* <div className='backgroundCircle'></div>   */}
                    </div>
                         
                </div>
                {/* {number === 1 &&
                    <div className='subtitle'>Choose and Enjoy</div>
                } */}

                <div className='bannerImage'>
                    <picture>
                        <img src= '/static/contact_banner.png'/>
                    </picture>
                </div>

                {/* <div className='backgroundCircle'></div> */}
            </div>
            
            <div className="pd-20 content_wrap">
                <p className='article_text subtitle'>
                    Have a question not answered on the website? 
                </p>
                <p className='article_text'>
                    Call us at 971-4577-4699 or fill out the form below. An email will be sent to us with your question/comments and a representative will be in contact with you shortly.
                </p>
                <Row className = "members-list">
                    {renderCards('sales')}
                    {/* {renderCards('all_else')} */}
                </Row>
                
                   
                
            </div>

            <ContactForm/>
        </div>
    )
}

export default Contact
