import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect,useState } from 'react';

const Sold = () => {
  let [showAllFinshedAuctions, setshowAllFinshedAuctions] = useState({})  
  useEffect( () => {
    showAll();
      },[])  
    
    const showAll =  () => {
       axios.get(`${process.env.REACT_APP_BASE_URL}/api1/sold`).then( async  (res) => {
       await  res.data &&  setshowAllFinshedAuctions(res.data);
        })
      }  
  return (
    <div>{showAllFinshedAuctions.items&&showAllFinshedAuctions.items.length>0? showAllFinshedAuctions.items.map((e, i) => {
      return (
        <span key={i}>
          <h1>{e.status}</h1>
          <Link to ={`../../item/${e._id}`}>
          <img
            src={e.picture}
            alt="problem"
            srcSet=""
            style={{ width: "35vw", height: "26vw" }}
          />
          </Link>
          <br /> name:{e.objname} <br />
          type:{e.objtype} <br />
          seller: {e.objselleremail} <br />
            sold to: {e.clientemail} <br />
          first price:{e.objlastprice} <br />{" "}
          last bid:{e.objbidprice[0]} 
          {/* <button
            onClick={() => {
              delete1(e._id);
            }}
          >
            X
          </button> */}
          
          <br />   <Link to={`../../item/${e._id}`}>Details</Link>
          <br />
        </span>
      );
    }):  <h1>No  items yet</h1> }</div>
  )
}

export default Sold