import React from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import TimeLeft from './TimeLeft';
import StatusItem from './StatusItem';
const SearchType = () => {
  const [ShowAllItems, setShowAllItems] = useState({})
  const {type} = useParams()
  const showAll = () => {
    axios.get(`/api1//categorie/${type}`).then( async (res) => {
     await res.data && setShowAllItems(res.data);
    });
  };
  useEffect(() => {
    showAll();
  }, []);
  return (

    <div style={{minHeight:"100vh"}}>

{ShowAllItems.items&&ShowAllItems.items.length>0&&<h1>{type} </h1>}
    
  <div className="items">
        {ShowAllItems.items&&ShowAllItems.items.length>0? ShowAllItems.items.map((e, i) => {
          return (
            <span key={i} className="item">
              <h2> {e.objname}</h2> 
               <TimeLeft selltime={e.selltime}></TimeLeft>
             
              <Link to={`../item/${e._id}`}>
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
        }):    <h1>Loading {type} items</h1> }
      </div>
    </div>
  )
}

export default SearchType