import React, { useEffect, useState } from 'react'

const useScreenSize = () => {
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
  useEffect(() => {
    // getCarList()
    resizeChange()
    // 监听
    window.addEventListener('resize', resizeChange);
    // 销毁
    return () => window.removeEventListener('resize', resizeChange);
  }, []);

  return number
  
}

export default useScreenSize