import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, userlog, selectAll } from "../redux/InfoSlice";
import TimeLeft from "./TimeLeft";
import StatusItem from "./StatusItem";

function Item() {
  const { id } = useParams();
  const [itemById, setitemById] = useState({});
  const [newArray, setnewArray] = useState([]);
  const [bidInput, setbidInput] = useState(0);
  let [bidCounter, setbidCounter] = useState(0)
 
  const objAll = useSelector(selectAll);

  function showAll() {
    axios.get(`http://localhost:3000/api1/item/${id}`).then((res) => {
      res.data && setitemById(res.data);
      setnewArray(itemById.objbidprice);
      setbidCounter(bidCounter++);
    });
  }

  useEffect(() => {
    showAll();
    console.log(bidCounter);
    console.log(newArray);
  }, [bidCounter]);

  useEffect(() => {
    showAll();
    console.log(id);
    
  }, []);

  async function addBid() {
    console.log(itemById);
    let newPersonArray = itemById.personbid;
    console.log(newPersonArray);
    if (parseInt(bidInput) >= parseInt(itemById.objlastprice)) {
      if (parseInt(newArray[0]) < parseInt(bidInput) || newArray.length === 0) {
        if (
          (parseInt(newArray[0]) < 100 &&
            parseInt(bidInput) > parseInt(newArray[0]) + 4) ||
          (parseInt(newArray[0]) <= 1000 &&
            parseInt(bidInput) > parseInt(newArray[0]) + 49)
            ||
          (parseInt(newArray[0]) > 1000 &&
            parseInt(bidInput) >parseInt(newArray[0]) + 149) || newArray.length === 0
        ) {
          newArray.unshift(bidInput);
          newPersonArray.unshift(objAll.userlogged.user.email);
        }
      }
    }
    const addNew = { objbidprice: newArray, personbid: newPersonArray };

    await axios
      .patch(`http://localhost:3000/api1/item/${id}`, addNew)
      .then((res) => {
        // res.data && console.log(res.data)
      });

    await axios
      .get(`http://localhost:3000/api1/item/${id}`)
      .then(async (res) => {
        (await res.data) && setitemById(res.data);
      });
    setnewArray(itemById.objbidprice);
    showAll();
    setbidCounter(bidCounter++);
    document.getElementById("inputbid").reset();
  }

  return (
    <div>
      <h1>{itemById.objname}</h1>
      <img
        src={itemById.picture}
        alt=""
        style={{ height: "20vw", width: "30vw" }}
      />
      <h3>starter price:{itemById.objlastprice}$</h3>
      <h3> started: {itemById.startselltime}</h3>
      <h3>end of auction: {itemById.selltime}</h3>
      <TimeLeft selltime={itemById.selltime}  ></TimeLeft>
      <StatusItem itemById={itemById}></StatusItem>
      {itemById.objbidprice && (
        <h3>last bid price:{itemById.objbidprice[0]?itemById.objbidprice[0]:"no bids yet"}$</h3>
      )}

      {objAll.userlogged.valid === "logged" ? (
        <div>
          logged as: {objAll.userlogged.user.email}
          <br />
          <br />
          <label htmlFor=""> add a bid</label>
          <form id="inputbid" action="">
            <input
              type="text"
              onChange={(e) => {
                setbidInput(e.target.value);
              }}
            />
          </form>
          <button
            onClick={() => {
              addBid();
            }}
          >
            add bid
          </button>
          <br />
          {  parseInt(bidInput)>0? <div></div>: <p>please enter just positive digits</p> }
  
          {newArray&& newArray.length===0&& parseInt(bidInput) < parseInt(itemById.objlastprice ) && (
            <p>the new bid must be bigger or equal the starter price</p>
          )  }
          {newArray &&
            parseInt(newArray[0]) < 100 &&
            parseInt(bidInput) <= parseInt(newArray[0]) + 4 && (
              <p>the bid must be bigger then the last bid at least for 5$</p>
            )}
               {newArray &&
            parseInt(newArray[0]) <= 1000 &&
            parseInt(bidInput) <= parseInt(newArray[0]) + 49 && (
              <p>the bid must be bigger then the last bid at least for 50$</p>
            )}
               {newArray &&
            parseInt(newArray[0]) > 1000 &&
            parseInt(bidInput) <= parseInt(newArray[0]) + 149 && (
              <p>the bid must be bigger then the last bid at least for 150$</p>
            )}
             {newArray && newArray.length>0&& <h4>last bids</h4>}

          {newArray ? (
            newArray.map((e, i) => {
              return (
                <div key={i}>
                  {" "}
                  <span>
                    {e} {itemById.personbid[i]}{" "}
                  </span>{" "}
                  <br />{" "}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          {" "}
          <h3>you must log In or Register to make bids</h3>{" "}
          <h4>
            <strong>$$$</strong>
          </h4>{" "}
        </div>
      )}
    </div>
  );
}

export default Item;
