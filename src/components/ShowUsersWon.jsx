import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {change, selectAll} from "../redux/InfoSlice"
import {useDispatch, useSelector} from "react-redux"
import Button from 'react-bootstrap/Button';
import './ShowUsersItems.css'
import { PayPalButton } from "@repeatgg/react-paypal-button-v2"
const ShowUsersWon = (props) => {
    useEffect(() => {
        showUsersItems()
    }, [])
    const objAll= useSelector(selectAll)
      const [usersItems, setusersItems] = useState({})
      function showUsersItems(){
        console.log(objAll.userlogged.user.email)
        objAll.userlogged.valid === "logged"&&(
        
          axios.post("/api1/won", {email:objAll.userlogged.user.email}).then( async (res) => {
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
         <h1>All your Won Auctions</h1>
         <p>We sent email to the owner of the Auction with your details but you can contact them via email</p>
         <p>Yon can purchase the auction via owr site or just contact the owner </p>
         <p>you can delete your action lots by clicking on the X button when ever you want</p>
         <p>the Item will be deleted permanently</p>
      </div>: <div> <h3>You still dont have wonned auction items </h3> <h4>you will see your wooned auctions here when you win them </h4> </div>}
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
               <h2> {e.status&&e.status==="no bids"?"the auction ended with no bids":e.status==="sold"?"Won Auctions":"on market"}</h2>
             <br /> name:{e.objname} <br />
             type:{e.objtype} <br />
             sold to: { e.clientemail} <br />
             seller: {e.objselleremail} <br />
             starter prize:{e.objlastprice} <br />{" "}
             last bid:{e.objbidprice[0]} <br />
             end of auction: {e.selltime} <br />
             {/* <Button variant='danger'
               onClick={() => {
                 delete1(e._id);
               }}
               >
               X
             </Button> */}
             <PayPalButton
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
             {/* <br /> <Link to={`item/${e._id}`}>details </Link> */}
           </span>  <br /></span>
           
         );
       }) 
       }
       <Button onClick={()=>{props.setOpenWin(false)}} variant='outline-danger'>Close</Button>
       </div>
  )
}

export default ShowUsersWon