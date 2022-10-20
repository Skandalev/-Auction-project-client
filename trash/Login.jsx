
import { useEffect, useState } from "react";
import axios from "axios";
function Login () {
  const [showAllusers,setShowAllusers] = useState([])
  const [changeEmail,setChangeEmail] = useState("")
  const [changePassword,setChangePassword] = useState("")

/////login
  const [changeLoginEmail,setChangeLoginEmail] = useState("")
  const [changeLoginPassword,setChangeLoginPassword] = useState("")
  const [LoginAnswer,setLoginAnswer] = useState("")
  useEffect(() => {
    showAll();
  }, []);

  const showAll = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`).then((res) => {
      res.data && setShowAllusers(res.data);
      console.log(res.data);
    });
  };
  const addUser= () =>{
    const addNew = {email:changeEmail,password:changePassword}
    console.log(addNew);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/users`, addNew).then((res) => {
      // res.data && setNewTodo("");
      
    });
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`).then((res) => {
      res.data && setShowAllusers(res.data);})
    
  }
  const delete1 = (id) => {
    axios
    .delete(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`)
    .then((res) => {
        if (res.data) {
            showAll();
        }
    })
    .catch((err) => console.log(err));
};
const loginButton = () =>{
  const login = {email:changeLoginEmail,password:changeLoginPassword}
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, login).then((res) => {
   setLoginAnswer(res.data)
   console.log(LoginAnswer);
 
    // res.data && setNewTodo("");
  });
 
}

  return (
    <div className="Login  ">
     { LoginAnswer==="logged"? <div></div>:
     <div>
      <h1> register</h1>
      <h3>email</h3>
      <input onChange={(e)=>{setChangeEmail(e.target.value)}}></input>
      {changeEmail}
      <h3>password</h3>
      <input onChange={(e)=>{setChangePassword(e.target.value)}}></input>
      {changePassword}
      <button  onClick={()=>{addUser()}}>register</button> </div> }
      {showAllusers.map((e,i)=>{ return <div key={i}><h1>{e.email}<br></br>{e.password} <br />{e.fullName}</h1><button onClick={() => {
                  delete1(e._id);
                }}>X</button></div>})}
  { LoginAnswer==="logged"? <div><h1>you are logged</h1><br></br><button onClick={()=>{setLoginAnswer("wrong")}}>logout</button> </div>:
    <div>
     <h1>Login</h1>
    
     <input onChange={(e)=>setChangeLoginEmail(e.target.value)}  placeholder='email'></input>
    <br />
     <input  onChange={(e)=>setChangeLoginPassword(e.target.value)} placeholder='password'></input>
     <br />
     <button onClick={()=>loginButton()} type='submit'>submit</button> 
     </div>
  }   

     
    </div>
  );
}

export default Login   ;
