import React, { useEffect, useRef, useState } from 'react'
import TyreCard from './TyreCard'
import InfiniteScroll from 'react-infinite-scroller'
import useScreenSize from '../hooks/useScreenSize'
import TyreCardModal from './TyreCardModal'


export default function RenderList({itemsArray,formData,searching}) {

  // console.log('rendering tyres list...')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(itemsArray.slice(0,20))
  const [hasMoreData, setHasMoreData] = useState(true)
  const notInitialRender = useRef(false)
  
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(itemsArray.length)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)

 
  
  const number = useScreenSize()
  
  const filterTyres = ()=>{
    // itemsArray =[1,2,3]
    let result = []
    let criteria = Object.keys(formData)
    criteria = criteria.filter(item => formData[item]!== '')
    criteria = criteria.map(item => item.toUpperCase())

    const exact = ['type','brand','pattern','li_sr']

    if(itemsArray && itemsArray.length > 0 ){
        itemsArray.map((item) => {

            const tyreData = item.attributes
            let render = true
            for (let i = 0; i<criteria.length; i++ ){
                const searchCriteria = criteria[i]
                const formDataSearch = searchCriteria?.toLowerCase()
                // console.log('formDataSearch: ',formDataSearch,searchCriteria)
                if(exact.includes(formDataSearch)){

                    if(tyreData[searchCriteria]!== formData[formDataSearch] ){
                        render = false;
                        
                        return

                    }
                }else if(formDataSearch === 'price'){
                        // console.log('seraching by price..')
                        const min = formData.price[0]
                        const max = formData.price[1]
                        // console.log(min, max, tyreData)

                        if(Math.floor(tyreData.RETAILPRICE.slice(1)) < min || Math.floor(tyreData.RETAILPRICE.slice(1)) > max ) {
                            render = false;
                            return
                        }

                    }

                }

            if(render){
                // result.push(
                //     <Col xl={4} lg={4} md={6} xs={12}>
                //       <div key ={item.id}>
                //           <TyreCard id = {item.id} tyreData={item.attributes}/>
                //       </div>
                //     </Col>

                // )
                result.push(item)

            }

            
      
        })
    }
    // console.log('tyres after filtering: ',result.length)

    setData(result)
    setTotalNumberOfItems(result.length)

}

  const handleLoad = async () =>{

    let newData
    
    if(!searching){

      newData = itemsArray.slice(page*10, (page+1)*10)
    }else{

      newData = data.slice(page*10, (page+1)*10)
    }

    if(data.length < totalNumberOfItems){

      await setData((data)=>[...data,...newData])
    }else{
      setHasMoreData(false)
    }

    setPage(page => page+1)
  }

  const handleScroll = (e)=>{

    const {offsetHeight,scrollTop,scrollHeight} = e.target
    if(offsetHeight + scrollTop ===scrollHeight ){
      handleLoad()

    }

  }

  const handleTyreClick = (item)=>{
    // console.log(item)
    setShowModal(true)
    setModalData(item)

  }



  useEffect(()=>{
    // console.log('tyres on display: ',data.length)

  },[data])

  useEffect(()=>{
    if (searching || number > 1) {
      filterTyres()
    } 

  },[formData])

  return (
    <div>
    
      {number === 1  ?
        <InfiniteScroll
          pageStart = {1}
          loadMore = {handleLoad}
          hasMore={hasMoreData}
          >

            {data.map((item, index)=>

              <div key={index} onClick={()=>handleTyreClick(item)}>

                  <TyreCard id = {item.id} tyreData={item.attributes}/>

              </div>

            )}

        </InfiniteScroll>
      :
        <div className = 'tyre_list' onScroll={(e)=> handleScroll(e)}>
          {data.map((item, index)=>

            <div key={index} className = 'tyre-container' onClick={()=>handleTyreClick(item)}>

                <TyreCard id = {item.id} tyreData={item.attributes}/>

            </div>
            

            )}

        </div>
   
      }

      <TyreCardModal

        itemsArray = {itemsArray}
        itemData = {modalData}
        open = {showModal}
        handleClose = {()=>setShowModal(false)}
      
      />

      


      
    </div>
  )
}

