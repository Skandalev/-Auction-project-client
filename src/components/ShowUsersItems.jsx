import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {change, selectAll} from "../redux/InfoSlice"
import {useDispatch, useSelector} from "react-redux"
const ShowUsersItems = () => {
    useEffect(() => {
        showUsersItems()
    }, [])
    const objAll= useSelector(selectAll)
      const [usersItems, setusersItems] = useState({})
      function showUsersItems(){
        objAll.userlogged.valid === "logged"&&(
          axios.post("/api1/additems", {email:objAll.userlogged.user.email}).then( async (res) => {
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
  return (
    <div>{usersItems.items&&usersItems.items.length>0? 
        <div>
         <h1>Your auction Items</h1>
         <p>you can delete your action lots by clicking on the X button</p>
         <p>if you delete lots three hours before the the auction ends you must pay abandon fee </p>
      </div>: <div> <h3>You still didnt add auction items </h3> <h4>you will see your auctions here when you add them </h4> </div>}
       {usersItems.items&&
       
       usersItems.items.map((e, i) => {
         return (
           <span key={i}>
            <h1> {e.status&&e.status==="no bids"?"the auction ended with no bids":e.status==="sold"?"sold":"on market"}</h1>
             <img
               src={e.picture}
               alt="problem"
               srcSet=""
               style={{ width: "35vw", height: "26vw" }}
               />
             <br /> name:{e.objname} <br />
             type:{e.objtype} <br /><br />
             sold to: { e.clientemail} <br />
             seller: {e.objselleremail} <br />
             first prize:{e.objlastprice} <br />{" "}
             last bid:{e.objbidprice[0]} <br />
             end of auction: {e.selltime} <br />
             <button
               onClick={() => {
                 delete1(e._id);
               }}
               >
               X
             </button>
             {" "}
             {/* <br /> <Link to={`item/${e._id}`}>details </Link> */}
             <br />
             <br />
           </span>
         );
       })
       }</div>
  )
}

export default ShowUsersItems