import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
const StatusItem = (props) => {
  const [firstCheck, setfirstCheck] = useState(true);
  useEffect(() => {
    statusCheck();
  });

  async function statusCheck() {
    let aaa = Date.now();
    const bbb = Date.parse(props.itemById.selltime);
    if (aaa > bbb && props.itemById.status === "readyToSale") {
      if (props.itemById.personbid.length > 0 && firstCheck) {
        setfirstCheck(false);
        props.setIsOpenAuction(false)
        const addNew = {
          clientemail: props.itemById.personbid[0],
          status: "sold",
        };

        await axios
          .patch(
            `http://localhost:3000/api1/item/${props.itemById._id}`,
            addNew
          )
          .then((res) => {
            res.data && console.log(res.data);
          });
          sendWinner()
          sendSeller()
      } else{
      if (firstCheck) {
        setfirstCheck(false);
        props.setIsOpenAuction(false)
        const addNew = {
          clientemail: "0000",
          status: "no bids",
        };

        await axios
          .patch(
            `http://localhost:3000/api1/item/${props.itemById._id}`,
            addNew
          )
          .then((res) => {
            res.data && console.log(res.data);
          });
      }}
    }
  }
        const sendWinner =()=>{
          var templateParams = {
            clientemail : props.itemById.personbid[0],
            objname : props.itemById.objname,
            objbidprice: props.itemById.objbidprice[0],
            objselleremail: props.itemById.objselleremail,
          };
          emailjs
            .send(
              "service_fy69ye4",
              "template_w6mm3i6",
              templateParams,
              "zoYqFXypoDCzjZ-8Z"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        }


        const sendSeller =()=>{
          var templateParams = {
            clientemail : props.itemById.clientemail,
            objname : props.itemById.objname,
            objbidprice: props.itemById.objbidprice[0],
            objselleremail: props.itemById.objselleremail,
          };
          emailjs
            .send(
              "service_fy69ye4",
              "template_jad768b",
              templateParams,
              "zoYqFXypoDCzjZ-8Z"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        }

    
  return (
    <div>
      {props.itemById && props.itemById.status === "readyToSale" ? "" : " "}
    
    </div>
  );
};

export default StatusItem;
