import React, { useEffect, useState } from 'react'

function useInitialRender() {

    const [firstRender, setFirstRender] = useState(true)
    // const [renderCount, setRenderCount] = useState(0)
    
    const [number, setNumber] = useState(1)

    const resizeChange = () => {
        var box = document.getElementById("__next")
        let width = box.offsetWidth
        // console.log(width, "======")
        if (
          width < 1000 && width > 700
        ) {
          setNumber(2)
        } else if (
          width <= 700
        ) {
          setNumber(1)
        } else {
          setNumber(3)
        }
      };

    useEffect(()=>{

        // console.log('calculating screen size..')
        resizeChange()
        // setRenderCount(prev=>prev+1)

        // 监听

        window.addEventListener('resize', resizeChange);
        setFirstRender(false)
        // 销毁
        return () => window.removeEventListener('resize', resizeChange);

    },[])

  return {firstRender, number}
    
    
  
}

export default useInitialRender