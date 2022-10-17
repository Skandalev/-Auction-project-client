import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {change, userlog, selectAll} from "../redux/InfoSlice"

// objAll.userlogged.valid=== "logged" 
 const Footer=()=> {
    const objAll= useSelector(selectAll)
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <MDBContainer className='p-4 pb-0'>
        { objAll.userlogged.valid=== "logged"? <section>
        <p className='d-flex justify-content-center align-items-center'>
           <span>you are logged as {objAll.userlogged.user.fullName}</span> 
        </p>
        </section>:
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <span className='me-3'>Register for free</span>
           <Link to='/registerandlogin'> <MDBBtn type='button' outline color="light" rounded>
                Sign up! 
            </MDBBtn></Link>
          </p>
        </section>}
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 :
        <Link className='text-white' to='/' >
          SkandaLev Auctions
        </Link>
      </div>
    </MDBFooter>
  );
}
export default Footer