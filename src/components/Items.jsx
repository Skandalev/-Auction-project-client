import { useEffect, useState } from "react";
import axios from "axios";
import "./items.css";
import { Link } from 'react-router-dom';
import TimeLeft from "./TimeLeft";
import StatusItem from "./StatusItem";
import elecpicture from '../pictures/electronics.png'
import vintage from '../pictures/vintage.png'
import furniture from '../pictures/furniture.png'
import relic from '../pictures/relic.png'
import toys from '../pictures/toys.png'
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"



const Items = () => {
  const [ShowAllItems, setShowAllItems] = useState([]);
  const [IsOpenAuction, setIsOpenAuction] = useState(true)
  const showAll = () => {
    axios.get("/api1/item").then((res) => {
      res.data && setShowAllItems(res.data);
    });
  };
  useEffect(() => {
    showAll();
  }, []);
  const objAll= useSelector(selectAll)
  // const delete1 = (id) => {
  //   axios
  //     .delete(`/api1/item/${id}`)
  //     .then((res) => {
  //       if (res.data) {
  //         showAll();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className="main-div">
      
      {objAll.userlogged.valid != "logged"&&   <div>
       
        <br /><br />
      <h1> <u> Welcome To The Auctions Site</u></h1>
      <div className="nearthevertical">
      <h3 >easy way to publish your products</h3>
      <h3 >easy way to make bids!</h3>
      <h3 className="vertical">Sign up now!</h3>
      </div>
      <p>You always can see the auction lots.</p>
      <p>If you intersted in something specific use the Categories navigators</p>
      <p>For adding auction lots or makikg bids you must Log In or Register </p>
      <p>Check out The Terms and Rules to find more information</p>

      </div>}
   
      <br />
      <h1 className="all-items">  <u>  Categories</u></h1>
      <nav className="types-navs">
        <div>
      <Link to="/categorie/Toys">Toys</Link>
      <br />
      <Link to="/categorie/Toys"><img src= {toys} alt=""  style={{width:"10vw",height:"6vw"}}/></Link>
       </div> 
       <div>
       <Link to="/categorie/Furniture">Furniture</Link>   
      <br />
      <Link to="/categorie/Furniture"> <img src={furniture} alt=""  style={{width:"10vw",height:"8vw"}}/></Link>
       </div>    <div>
       <Link to="/categorie/Relic">Relic</Link>     
      <br />
      <Link to="/categorie/Relic"><img src={relic} alt=""  style={{width:"10vw" ,height:"6vw"}}/></Link>  
       </div>    <div>
       <Link to="/categorie/Vintage">Vintage</Link>    
      <br />
      <Link to="/categorie/Vintage">  <img src={vintage} alt=""  style={{width:"10vw",height:"6vw"}}/></Link>  
       </div>    
       <div>
       <Link to="/categorie/Electronic">Electronics</Link>  
      <br />
      <Link to="/categorie/Electronic">  <img src= {elecpicture} alt=""  style={{width:"10vw",height:"8vw"}}/></Link> 
       </div>      
   
     </nav>
      <br /> <br /><br /> 
     
      <h1 > <u>  All Items</u></h1>
     
      <div className="items">
        {ShowAllItems.map((e, i) => {
          return (
            <span key={i} className="item">
              <h2> {e.objname}</h2> 
               <TimeLeft selltime={e.selltime}></TimeLeft>
             
              <Link to={`item/${e._id}`}>
              <img
                src={e.picture}
                alt="....."
                srcSet=""
                style={{ width: "35vw", height: "26vw" }}
              />
              </Link>
              <h6> end of the auction: {e.selltime}</h6> <br />
            {e.objbidprice[0]?  <h2> Last Bid: {e.objbidprice[0]}$</h2>: <h2>starter price:{e.objlastprice}$</h2> } <br />
            {/* <Link to={`item/${e._id}`}>Details </Link> */}
              <StatusItem itemById={e} setIsOpenAuction={setIsOpenAuction}></StatusItem>
              {/* <button
                onClick={() => {
                  delete1(e._id);
                }}
              >
                X
              </button> */}
              <br />
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Items;
