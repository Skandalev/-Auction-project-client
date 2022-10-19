import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './Mynavbar.css'
import { Link, Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"
import { useState } from 'react';
function Mynavbar(props) {
  const objAll= useSelector(selectAll)
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const logoutuser = () =>{
    dispatch(userlog({}))
    setExpanded(false)
    localStorage.setItem('mySecretKey',"")
   }

  return (
    <>
    
      {['false'].map((expand) => (
        <Navbar key={expand} expanded={expanded} bg="light" expand={expand} className="mb-3 bg-blue bg-dark" >
          <Container fluid>
            <Navbar.Brand >  <Link to="/">Auctions</Link></Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls={`offcanvasNavbar-expand-${expand}`}    />
            <Navbar.Offcanvas 
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton onClick={() => setExpanded(false)}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Navigation
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3"  >
                <Link onClick={() => setExpanded(false)} to="/">All Items</Link> 
                  {objAll.userlogged.user&&objAll.userlogged.user.email==="master@gmail.com"&&<Link onClick={() => setExpanded(false)} to="/sold">sold</Link>}  
                  <Link onClick={() => setExpanded(false)} to="/additem">Add new</Link>
                <Link onClick={() => setExpanded(false)} to="/rules">Terms and Rules</Link>
                  {objAll.userlogged.valid === "logged"?null:   <Link onClick={() => setExpanded(false)} to="/registerandlogin">Login or Register</Link>}
                  {props.curentTime}
                  <NavDropdown
                    title="Categories"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                     <Link onClick={() => setExpanded(false)} to="/categorie/Toys">Toys</Link>   <br />
                     <NavDropdown.Divider />
                    <Link onClick={() => setExpanded(false)} to="/categorie/Furnituer">Furniture</Link>  <br /> 
                    <NavDropdown.Divider />    
                    <Link onClick={() => setExpanded(false)} to="/categorie/Relict">Relict</Link>     <br />  
                    <NavDropdown.Divider />
                    <Link onClick={() => setExpanded(false)} to="/categorie/Vintage">Vintage</Link>   <br /> 
                    <NavDropdown.Divider />   
                    <Link onClick={() => setExpanded(false)} to="/categorie/Electronic">Electronics</Link> <br />
                  </NavDropdown>
                  {objAll.userlogged.valid === "logged"&& <div>
                              
                              <Link to='/youritems' onClick={() => setExpanded(false)}> <p> {objAll.userlogged.user&&objAll.userlogged.user.fullName}s <br /> peronal area </p> </Link> 
                              <Button  variant="danger" >    <Link to='/' onClick={()=>{logoutuser()}}> log out</Link>  </Button>
                        </div> }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Mynavbar;