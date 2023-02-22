import React from 'react'
import useScreenSize from '../hooks/useScreenSize'

function TeamMemberCard({member}) {
    const number = useScreenSize()
    const message = 'Hi there! I want to enquire about a product from dayasmoto.com'

    let whatsAppNumber = member.whatsApp.replace('+','')
    whatsAppNumber = whatsAppNumber.replace(' ','')

    // console.log('whatsAppNumber: ',whatsAppNumber)
    // const whatsAppAPI = 

  return (

    <div className='team_member_card'>
        {/* <div className='title'>
            {member.name}
        </div> */}
        <div className="card_content">
            <div className='img_Container'>
                <picture>
                    <img 
                        src={member.image? member.image: "/static/dayasmoto_logo_black.png"} 
                        style = {{objectFit: !member.image &&'contain', height:!member.image &&'8rem'}}
                        alt="" />
                </picture>
            </div>
            <div>
                <ul>
                    <li className='name'>
                        {member.name}
                    </li>
                    <li className='position'>
                        {member.title}
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-phone-square" aria-hidden="true"></i>
                            {member?.mobile}
                        </a>
                    </li>
                    <li>
                        <a href={`https://api.whatsapp.com/send/?phone=${whatsAppNumber}&text=${message}&type=phone_number&app_absent=0`}>
                            <i className="fa fa-whatsapp" aria-hidden="true"></i>
                            {member.whatsApp}
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
  )
}

export default TeamMemberCard