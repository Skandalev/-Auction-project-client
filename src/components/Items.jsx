import { useEffect, useState } from "react";
import axios from "axios";
import "./items.css";
import { Link } from 'react-router-dom';
import TimeLeft from "./TimeLeft";
import StatusItem from "./StatusItem";

const Items = () => {
  const [ShowAllItems, setShowAllItems] = useState([]);
  const showAll = () => {
    axios.get("/api1/item").then((res) => {
      res.data && setShowAllItems(res.data);
    });
  };
  useEffect(() => {
    showAll();
  }, []);
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
    <div>
      <br /><br />
      <h1>Welcome To The Auctions Site</h1>
      <h3>easy way to publish your products</h3>
      <h3>easy way to make bids!</h3>
      <p>You always can see the auction lots.</p>
      <p>If you intersted in something specific use the Categories navigators</p>
      <p>For adding auction lots or makikg bids you must Log In or Register </p>
      <p>Check out The Terms and Rules to find more information</p>

     
   
      <br />
      <h1 className="all-items">  <u>  Categories</u></h1>
      <nav className="types-navs">
      <Link to="/categorie/Toys">Toys</Link>       
      <Link to="/categorie/Furniture">Furniture</Link>       
      <Link to="/categorie/Relict">Relic</Link>       
      <Link to="/categorie/Vintage">Vintage</Link>       
      <Link to="/categorie/Electronic">Electronics</Link>       
     </nav>
      <br />
     
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
              <StatusItem itemById={e}></StatusItem>
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
