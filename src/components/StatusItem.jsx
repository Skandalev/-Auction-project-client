import React from 'react'
import axios from "axios";
import { useEffect,useState } from 'react';
const StatusItem = (props) => {
  const [firstCheck, setfirstCheck] = useState(true)
useEffect(() => {
  statusCheck()
})




  async function statusCheck(){
    let aaa =  Date.now()
   const bbb =  Date.parse(props.itemById.selltime)
  if(aaa>bbb && props.itemById.status === "readyToSale" ){
    if(props.itemById.personbid.length>0 && firstCheck){
      setfirstCheck(false)
    const addNew = { 
       clientemail:props.itemById.personbid[0], status:"sold" };

    await axios
      .patch(`http://localhost:3000/api1/item/${props.itemById._id}`, addNew)
      .then((res) => {
        res.data && console.log(res.data)
      });
    }if(firstCheck) {
      setfirstCheck(false)
      const addNew = { 
        clientemail:"0000", status:"no bids" };

     await axios
       .patch(`http://localhost:3000/api1/item/${props.itemById._id}`, addNew)
       .then((res) => {
         res.data && console.log(res.data)
       });
    
    }
  
  }}

  return (
    <div>{props.itemById&&props.itemById.status=== "readyToSale"?"":props.itemById.status}</div>
  )
}

export default StatusItem