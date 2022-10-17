
import './App.css';
import AddItems from './pages/AddItems';
import { Link, Route, Routes } from 'react-router-dom';
import Items from './components/Items';

import RegisterForm from './components/RegisterForm';
import React, { PureComponent } from 'react'
import Item from './components/Item';
import Logout from './components/Logout';
import Type from './components/SearchType';
import Rules from './pages/Rules';
import Sold from './pages/Sold';
import YourItems from './pages/YourItems';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "./redux/InfoSlice"
import Mynavbar from './components/Mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  const objAll= useSelector(selectAll)
  const dispatch = useDispatch();
  const [curentTime, setcurentTime] = useState()
    setInterval(() => {
      setcurentTime(new Date().toLocaleString())
    }, 1000);
    let emailFromStorage = localStorage.getItem('mySecretKey')
    if(emailFromStorage){
    emailFromStorage = JSON.parse(emailFromStorage)
    }
  if(objAll.userlogged.valid != "logged"&&emailFromStorage&& emailFromStorage.valid === "logged"){
    console.log(emailFromStorage);
    dispatch(userlog(emailFromStorage))
  }
  return (
    <div className="App">
      
      <Mynavbar curentTime={curentTime} axpand={false}></Mynavbar>
     <nav className='navbarrr'>
     <Link to="/">ALL Items</Link>
     {objAll.userlogged.user&&objAll.userlogged.user.email==="master@gmail.com"&& <Link to="/sold">sold</Link>}  
     <Link to="/additem">Add new</Link>
     <Link to="/rules">Terms and Rules</Link>
     {objAll.userlogged.valid === "logged"?null:  <Link to="/registerandlogin">Login or Register</Link>}
     <p className='navtime'>{curentTime}</p>
        <Logout></Logout>
     </nav>
     <Routes>
       <Route path='/' element={<Items></Items>} ></Route>
       <Route path='/sold' element={<Sold></Sold>} ></Route>
       <Route path='/registerandlogin' element={<div><RegisterForm></RegisterForm> </div>} ></Route>
       <Route path='/additem' element={<AddItems></AddItems>} ></Route>
       <Route path='/rules' element={<Rules></Rules>} ></Route>
       <Route path='/youritems' element={<YourItems></YourItems>} ></Route>
       <Route path='/item/:id' element={<Item></Item>} ></Route>
       <Route path='/categorie/:type' element={<Type></Type>} ></Route>
     </Routes>
    <Footer className="footer"></Footer>
    </div>
  );
}

export default App;
{/* <Login></Login> */}
 



