import React from 'react'
import { useState } from 'react'
import ShowUsersItems from '../components/ShowUsersItems'
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"
import Button from 'react-bootstrap/esm/Button'
import ShowUsersSoldItems from '../components/ShowUsersSoldItems' 
import ShowUsersNoBidsItems from '../components/ShowUsersNoBidsItems'
const YourItems = () => {
  const objAll= useSelector(selectAll)
  const dispatch = useDispatch();
  const [OpenAll, setOpenAll] = useState(false)
  const [OpenSold, setOpenSold] = useState(false)
  const [OpenNo, setOpenNo] = useState(false)
  return (
    <div style={{minHeight:"80vh"}}>
      <br />
      <h2>This is your Personal Page {objAll.userlogged.user.fullName}</h2>
      <p>Here you can see all your Auctions detailes </p>
      <label htmlFor="openAll">click here to see All the of Auctions on the market sold and not </label>
      <Button id='openAll' onClick={()=>{setOpenAll(!OpenAll)}} variant='warning'>All</Button>
       {OpenAll&& <ShowUsersItems setOpenAll={setOpenAll} ></ShowUsersItems>}
       <br /> <br />
       <label htmlFor="openSold">click here to see The Sold Auctions </label>
      <Button id='openSold' onClick={()=>{setOpenSold(!OpenSold)}} variant='warning'>Sold</Button>
       {OpenSold&& <ShowUsersSoldItems setOpenSold={setOpenSold} ></ShowUsersSoldItems>}
       
       <br /> <br />
       <label htmlFor="openNo">click here to see your Auctions that ended without bids  </label>
      <Button id='openNo' onClick={()=>{setOpenNo(!OpenNo)}} variant='warning'>No Bids</Button>
       {OpenNo&& <ShowUsersNoBidsItems setOpenNo={setOpenNo} ></ShowUsersNoBidsItems>}
       

    </div>
  )
}

export default YourItems