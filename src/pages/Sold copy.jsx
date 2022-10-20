import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect,useState } from 'react';
const Sold = () => {
 
  let [showAllFinshedAuctions, setshowAllFinshedAuctions] = useState([])    
  let [showAllNotSoldItems, setshowAllNotSoldItems] = useState([])    
  let [showAllSoldItems , setshowAllSoldItems ] = useState([])  
  useEffect( () => {
    showAll();
      },[])  
    
    const showAll =  () => {

       axios.get(`${process.env.REACT_APP_BASE_URL}/api1//item`).then( async  (res) => {
       await  res.data &&  setshowAllFinshedAuctions(res.data);
        });   
       if(showAllFinshedAuctions.clientsold){
          console.log(showAllFinshedAuctions)  
             setshowAllFinshedAuctions(showAllFinshedAuctions.filter((e)=>{return e.clientsold}))
            setshowAllFinshedAuctions( showAllFinshedAuctions.filter( (e)=> {return e.clientsold.status==="no bids"}))
               setshowAllSoldItems(showAllFinshedAuctions.filter((e)=>{return e.clientsold.status==="sold"}))
        }
                 
      }

   
    
           
      
   
     
    
  return (
    <div><br />

{showAllSoldItems&&showAllSoldItems.length>0? showAllSoldItems.map((e, i) => {
          return (
            <span key={i}>
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
        }):  <h1>No  items yet</h1> }


    </div>

  )
}

export default Sold