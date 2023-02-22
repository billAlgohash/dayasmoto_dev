import { useContext } from "react"
import CartContext from "../layout"


function getImageUrl(itemData, type= 'car') {
    const baseURL = "https://blockpulse-image-bucket.s3.ap-southeast-1.amazonaws.com/pic/"
    // const baseURL = https://dayasmoto.s3.ap-northeast-1.amazonaws.com/pic/"

    let image_name
    let url

    const {number} = useContext(CartContext)

    // console.log(itemData)

    if(type === 'car'){
        
        if(itemData?.THUMBNAIL){

            const index = itemData.THUMBNAIL.indexOf('pic')
            image_name = itemData.THUMBNAIL.slice(index+4)
            url = baseURL +image_name

            // console.log('itemData: ',itemData.THUMBNAIL, index,image_name)

        }else{
            url = number > 1 ? '/static/logo.png':'/static/logo_black.png'

        }

    }else if(type ==='tyre'){

        if(itemData?.THUMBNAIL){

            const index = itemData.THUMBNAIL.indexOf('pic')
            image_name = itemData.THUMBNAIL.slice(index+4)
            url = baseURL +image_name


        }else{

            url = number > 1 ? '/static/logo.png':'/static/logo_black.png'

        }

    }

    // console.log('url:',url)
    
  return url
}

export default getImageUrl