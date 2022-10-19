import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './Logout.css'
function Logout() {
    const objAll= useSelector(selectAll)
    const dispatch = useDispatch();
   const logoutuser = () =>{
    localStorage.setItem('mySecretKey',"")
    dispatch(userlog({}))
   }
  return (

    <div>
     
        {objAll.userlogged.valid === "logged"&& <div>
         
          <Link to='/youritems'> {objAll.userlogged.user&&objAll.userlogged.user.fullName}'s  space </Link> 
         <Button variant="danger" className='logout' > <Link  to='/' onClick={()=>{logoutuser()}}>Log out</Link> </Button>
        </div> }

    </div>
  )
}

export default Logout