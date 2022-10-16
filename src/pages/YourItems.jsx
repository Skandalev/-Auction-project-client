import React from 'react'
import ShowUsersItems from '../components/ShowUsersItems'
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"

const YourItems = () => {
  const objAll= useSelector(selectAll)
  const dispatch = useDispatch();
  return (
    <div>
      <br />
      <h2>This is your Personal Page {objAll.userlogged.user.fullName}</h2>
        <ShowUsersItems></ShowUsersItems>
    </div>
  )
}

export default YourItems