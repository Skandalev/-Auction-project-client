import React from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
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

    <div>

{ShowAllItems.items&&ShowAllItems.items.length>0&&<h1>{type} </h1>}
    
  <div className="items">
        {ShowAllItems.items&&ShowAllItems.items.length>0? ShowAllItems.items.map((e, i) => {
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
        }):  <h1>No {type} item yet</h1> }
      </div>
    </div>
  )
}

export default SearchType