
  import React from 'react'
  import { useState } from 'react'
  import { useSpring, animated, config } from 'react-spring'
  import qqq from './qqq.png'
  const Springgg = () => {
    const [flip, set] = useState(false)
    const props = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 },
      reset: true,
      reverse: flip,
      delay: 200,
     config: config.molasses,
      onRest: () => set(!flip),
    })
    return (
        <animated.h1 style={props}> <img src={qqq} alt=""  style={{width:"14vw"}}/></animated.h1>
    )
  }
  
  export default Springgg