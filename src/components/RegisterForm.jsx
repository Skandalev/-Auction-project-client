import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, userlog, selectAll } from "../redux/InfoSlice";
import Springgg from "./Springgg";
import Button from 'react-bootstrap/Button';
const RegisterForm = () => {
  const [LoginAnswer, setLoginAnswer] = useState({});
  const dispatch = useDispatch();
  const objAll = useSelector(selectAll);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    onSubmit: function (values, { resetForm }) {
      alert(`You are registered! Name: ${values.fullName}. Email: ${values.email}. 
            phoneNumber: ${values.phoneNumber}`);
      addUser(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      fullName: Yup.string().label("Full Name").required(),
      email: Yup.string().email().required(),
      phoneNumber: Yup.number() 
        .required(),
      password: Yup.string()
        .required()
        .min(7, "password must have more then 7 digits"),
    }),
  });

  const addUser = (values) => {
    const addNew = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
    };
    console.log(addNew);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/users`, addNew).then((res) => {
      // res.data && setNewTodo("");
    });
  };
  const schemaa = Yup.object().shape({
    email: Yup.string().required("please enter your email"),
    password: Yup.string().required("password is required"),
  });
  const loginButton = (values) => {
    const login = { email: values.email, password: values.password };
    console.log(login);
    axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, login)
    .then((res) => {
      setLoginAnswer(res.data);
      console.log(res.data);
      localStorage.setItem('mySecretKey',JSON.stringify(res.data))

      
      dispatch(userlog(res.data));
      

        // res.data && setNewTodo("");
      })
      .then(console.log(objAll));
  };
  // || objAll.amount=== true

  return (
    
    <div className="register">
     
      {LoginAnswer.valid === "logged" || objAll.userlogged.valid=== "logged" ? (
        <div style={{minHeight:"100vh"}}> 
          <h1>
            you are logged {LoginAnswer.user && LoginAnswer.user.fullName}
          </h1>
          <h3>Click on the logo</h3>
          <Springgg></Springgg>
          <br></br>
        </div>
      ) : (
        <div>
          <br />
          <br />
          <div className="bg-blue-300 min-w-screen min-h-screen overflow-x-hidden">
            <form
              onSubmit={formik.handleSubmit}
              className="max-w-lg mx-auto bg-brown rounded shadow-lg mt-7 p-3"
            >
              <h1>Register</h1>
              <div className="mb-4">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="full name"
                  className={`block w-full rounded border py-1 px-2 ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                <br />
                {formik.touched.fullName && formik.errors.fullName && (
                  <span className="text-red-400">{formik.errors.fullName}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  className={`block w-full rounded border py-1 px-2 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <br />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-400">{formik.errors.email}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className={`block w-full rounded border py-1 px-2 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <br />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-400">{formik.errors.password}</span>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="phone number"
                  className={`block w-full rounded border py-1 px-2 ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                <br />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <span className="text-red-400">
                    {formik.errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="text-center">
                <Button
                  className="bg-brown-500 rounded p-2 text-red"
                  type="submit"
                  variant="primary"
                  
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

          <div className="loginloc">
            <h3>Log in</h3>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                alert(JSON.stringify(values));
                loginButton(values);
              
             
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  <p>{errors.email && touched.email && errors.email}</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />

                  <p>
                    {errors.password && touched.password && errors.password}
                  </p>

                  <p>
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber}
                  </p>
                  
                  {objAll.userlogged.valid=== "wrong"&&  <p>wrong email or password</p>   }
                  {objAll.userlogged.valid=== "not"&&  <p>this email doesnt have account</p>   }
                  <p>{errors.agree && touched.phoneNumber && errors.agree}</p>
                  <Button
                   className="bg-brown-500 rounded p-2 text-red"
                    type="submit"
                    variant="primary"
                    onClick={() => {
                      loginButton(values);
                    }}
                  >
                    Log In
                  </Button>
                  <h1>david@gmail.com</h1>
                  <h1>1234567</h1>
                </form>
                
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
export default RegisterForm;
