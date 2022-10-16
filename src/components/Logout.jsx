import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"
import { Link } from 'react-router-dom'
function Logout() {
    const objAll= useSelector(selectAll)
    const dispatch = useDispatch();
   const logoutuser = () =>{
    dispatch(userlog({}))
    dispatch(change())
   }
  return (

    <div>
     
        {objAll.userlogged.valid === "logged"&& <div>
         
          <Link to='/youritems'> {objAll.userlogged.user&&objAll.userlogged.user.fullName}s <br /> peronal area  </Link> <br />
        <button onClick={()=>{logoutuser()}}>log out</button>
        </div> }

    </div>
  )
}

export default Logout