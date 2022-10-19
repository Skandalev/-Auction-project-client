import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {change, selectAll} from "../redux/InfoSlice"
import {useDispatch, useSelector} from "react-redux"
import Button from 'react-bootstrap/Button';
import './ShowUsersItems.css'
const ShowUsersNoBidsItems = (props) => {
    useEffect(() => {
        showUsersItems()
    }, [])
    const objAll= useSelector(selectAll)
      const [usersItems, setusersItems] = useState({})

      const [NewTime, setNewTime] = useState(1)
      const [NewPrice, setNewprice] = useState(100)
      function showUsersItems(){
        objAll.userlogged.valid === "logged"&&(
          axios.post("/api1/soldto", {email:objAll.userlogged.user.email,status:"no bids"}).then( async (res) => {
           await res.data && setusersItems(res.data);
          }))
        }
        const delete1 = (id) => {
            axios
              .delete(`/api1/item/${id}`)
              .then((res) => {
                if (res.data) {
                  showUsersItems();
                }
              })
              .catch((err) => console.log(err));
          }; 
     const publishAgain = (values) =>{
      const d = new Date()
     console.log(NewTime);
       const addNew = {
        objname: values.objname,
         objtype: values.objtype,
          picture:values.picture,
           objlastprice:NewPrice,
            objselleremail:objAll.userlogged.user.email,
             selltime:new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(NewTime),d.getHours(),d.getMinutes(),d.getSeconds()).toLocaleString(),
            startselltime: new Date().toLocaleString(),
              clientemail:"",
               status:"readyToSale"
            }
      console.log(addNew);
      axios.post("/api1/item", addNew).then((res) => {
        // res.data && setNewTodo("");
        
      });
      // axios.get("/api1/item").then((res) => {
      //   res.data &&  console.log("yeaaa");})
      delete1(values._id)
      showUsersItems()       
     }     
          
  return (
    <div>{usersItems.items&&usersItems.items.length>0? 
        <div>
         <h1>All Auctions that ended without bids</h1>
         <p>you can delete your action lots by clicking on the X button when ever you want</p>
         <p>the Item will be deleted permanently or you can press on the green button to publish this auction again (try to lower the starter price)</p>
      </div>: <div> <h3>You dont have auction that ended with no bids </h3> <h4>you will see them here when if no one make a bid on your Items </h4> </div>}
       {usersItems.items&&
       
       usersItems.items.map((e, i) => {
         return (
           <span className='span-users-items' key={i}>
            <br /><br />
            <span>
              <br /><br />
              <h1>{e.objname}</h1>
             <img
               src={e.picture}
               alt="problem"
               srcSet=""
               style={{ width: "35vw", height: "26vw" }}
               /></span>
               <span>
                <br /><br />
               <h2> {e.status&&e.status==="no bids"?"the auction ended with no bids":e.status==="sold"?"sold":"on market"}</h2>
             <br /> name:{e.objname} <br />
             type:{e.objtype} <br />
             sold to: { e.clientemail} <br />
             starter prize:{e.objlastprice} <br />{" "}
             <label htmlFor=""></label>
            <input  onChange={(e)=>{setNewprice(e.target.value)}} type="text" style={{textAlign:"center"}} placeholder={e.objlastprice}  /> <br />
             end of last auction: {e.selltime} <br />
             <label htmlFor="timeonauction">Choose new time for the auction:</label>
                <select  type="timeonauction"
                  name="timeonauction"
                  onChange={(e)=>{setNewTime(e.target.value)}}
                  >
                    <option value="1">1 days</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                  </select>
                  <br />
             <Button variant='danger'
               onClick={() => {
                 delete1(e._id);
               }}
               >
               X
             </Button>
             <Button onClick={()=>{publishAgain(e)}} variant='success'>Publish again</Button>
             {" "}
             {/* <br /> <Link to={`item/${e._id}`}>details </Link> */}
             <br />
             <br />
           </span>  <br /></span>
           
         );
       }) 
       }
       <Button onClick={()=>{props.setOpenNo(false)}} variant='outline-danger'>Close</Button>
       </div>
  )
}

export default ShowUsersNoBidsItems