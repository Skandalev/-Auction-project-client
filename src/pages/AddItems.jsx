import {  Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector} from "react-redux"
import { selectAll} from "../redux/InfoSlice"

import './AddItems.css'
import Button from 'react-bootstrap/Button';
// import { publicRequest, userRequest } from "../requestMethod";
const AddItems = () => {
  const objAll= useSelector(selectAll)
  let minutCheck = 0
    const addItem=  (values) =>{
     
        //  {objname: values.objname, objtype: values.objtype, picture:values.picture, objlastprice:values.objlastprice, objselleremail:values.objselleremail}
        
       console.log(objAll.accessToken);
        const d = new Date()
        console.log(minutCheck)
        console.log(values.timeonauction);
         const addNew = {
          objname: values.objname,
           objtype: values.objtype,
            picture:values.picture,
             objlastprice:values.objlastprice,
              objselleremail:objAll.userlogged.user.email,
               selltime:new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(values.timeonauction),d.getHours(),d.getMinutes()+minutCheck,d.getSeconds()).toLocaleString(),
              startselltime: new Date().toLocaleString(),
                clientemail:"",
                 status:"readyToSale"

              }
        console.log(addNew);


        let emailFromStorage = localStorage.getItem('mySecretKey')
        if(emailFromStorage){
        emailFromStorage = JSON.parse(emailFromStorage)
        console.log(emailFromStorage.accessToken);
        }

        const config = {
          headers:{
            'token': "barier "+emailFromStorage.accessToken
          }
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api1/item`, addNew,config).then((res) => {
          res.data &&  console.log("we sent")
        
        });

        // userRequest.post("/api1/item", addNew).then((res) => {
        //   res.data &&  console.log("item sent");})
       
        ///////////here
        axios.get(`${process.env.REACT_APP_BASE_URL}/api1/item`).then((res) => {
          res.data &&  console.log("yeaaa")})
        
      }
    const schemaa = Yup.object().shape({
        objname: Yup.string().required("please enter your objname"),
        objtype: Yup.string().required("objtype is required"),
        picture: Yup.string().required("picture is required").url(),
        objlastprice: Yup.string().required("objlastprice is required"),
      });
  return <div> {objAll.userlogged.valid === "logged"? <div style={{minHeight:'80vh'}}>
    
   <h1>Hi {objAll.userlogged.user&&objAll.userlogged.user.fullName}</h1>
    <h1>Add Item</h1>
      <Formik
            initialValues={{ objname: "", objtype: "", picture:"", objlastprice:"", objselleremail:"",timeonauction:0 }}
            onSubmit={  (values,{resetForm}) => {
              if((values.timeonauction)==5){
                minutCheck=1
                console.log(minutCheck);
                  values.timeonauction=0
                }
              alert(JSON.stringify(values));
             
              addItem(values)
              resetForm({values: ""})
             
            }}
            validationSchema={schemaa}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              handleBlur,
              touched,
            }) => (
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="objname"
                  name="objname"
                  placeholder="objname"
                  onChange={handleChange}
                  value={values.objname}
                  onBlur={handleBlur}
                />
                <p>{errors.objname && touched.objname && errors.objname}</p>
                {/* <input
                  type="objtype"
                  name="objtype"
                  placeholder="objtype"
                  onChange={handleChange}
                  value={values.objtype}
                  onBlur={handleBlur}
                />
                <p>{errors.objtype && touched.objtype && errors.objtype}</p> */}
                <label htmlFor="objtype">Item type:</label>
                <select  type="objtype"
                  name="objtype"
                  onChange={handleChange}
                  value={values.objtype}
                  onBlur={handleBlur}>
                    <option value="all">all</option>
                    <option value="Toys">Toys</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Relic">Relic</option>
                    <option value="Vintage">Vintage</option>
                    <option value="Electronic">Electronics</option>
                  </select>
               <br /><br />

                     


                <input
                  type="picture"
                  name="picture"
                  placeholder="picture"
                  onChange={handleChange}
                  value={values.picture}
                  onBlur={handleBlur}
                />
                <p>{errors.picture && touched.picture && errors.picture}</p>

                
                
                <input
                  type="objlastprice"
                  name="objlastprice"
                  placeholder="objfirstprice"
                  onChange={handleChange}
                  value={values.objlastprice}
                  onBlur={handleBlur}
                />
                <p>{errors.objlastprice && touched.objlastprice && errors.objlastprice}</p>
                  
                <label htmlFor="timeonauction">Time on auction:</label>
                <select  type="timeonauction"
                  name="timeonauction"
                  onChange={handleChange}
                  value={values.timeonauction}
                  onBlur={handleBlur}>
                    <option value="5">1min check days</option>
                    <option value="0">0 check days</option>
                    <option value="1">1 days</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    
                  </select>

                    <br /> <br />
               You signed as: {objAll.userlogged.user.email}  <br /><br />
                {/* <input
                  type="objselleremail"
                  name="objselleremail"
                  placeholder="objselleremail"
                  onChange={handleChange}
                  value={values.objselleremail}
                  onBlur={handleBlur}
                  />
                <p>{errors.objselleremail && touched.objselleremail && errors.objselleremail}</p> */}
                <Button
                  type="submit"
                  variant="primary"
              
                >
                  Add Item
                </Button>  
              </form>
            )}
          </Formik>
          </div >: <div className="bbb">

          <img src="" alt=""  style={{width:"98.6vw"}}/>
          </div> }
  </div>;
};
export default AddItems;