import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import './Create.css'

import axios from "axios";

import { useForm } from "react-hook-form";

import { Select } from "@mui/material";

 

export default function Create() {

  let navigate = useNavigate();

 

  const [user, setUser] = useState({

    first_name: "",

    last_name: "",

    dob: "",

    id_type: "",

    id_number: "",

    gender: "",

  });

  const [error, setError] = useState("disabled");

 

  const validatePan = (panVal) => {

    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

 

    if (regpan.test(panVal)) {

      // valid pan card number

      console.log("Ayush");

      return true;

    } else {

      console.log("No AYush");

      return false;

    }

  };

 

  const validateAadhar = (AadharVal) => {


    var regpan =

      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

 

    if (regpan.test(AadharVal)) {

      // valid Aadhar card number

      console.log("Ayush");

      // setError(true)

      return true;

    } else {

      console.log("No AYush");


      return false;

    }

  };

 

  const { first_name, last_name, dob, id_type, id_number, gender } = user;

  var flag = 0;

  const [val, setVal] = useState();

  const onInputChange = (e) => {

console.log("etarget " + e.target.name + " " + e.target.value);

if (e.target.name == "id_number" && user.id_type == "Pan Card") {

      var panVal = e.target.value;

      //we have to set the error whatever we have get

      if (!validatePan(panVal)) {

        setError("disabled");
        document.getElementById("message").innerHTML="* Invalid Pan no."

      }else{
        document.getElementById("message").innerHTML=""
        setError("");
      }

} else if (e.target.name == "id_number" && user.id_type == "Aadhar") {

      var AadharVal = e.target.value;

      //we have to set the error whatever we have get

      if (!validateAadhar(AadharVal)) {

        setError("disabled");
        document.getElementById("message").innerHTML="* Invalid Aadhar no."

      } else{
        document.getElementById("message").innerHTML=""        
        setError("");
      } 

    }

setUser({ ...user, [e.target.name]: e.target.value });

  };

 

  // const onInputChangee=(e)=>{

// [e.target.name]

  // }

  // console.log(user);

  console.log("error ", error);

 

  const onSubmit = async (e) => {

    console.log("submit called");

    e.preventDefault();

    if (error == "disabled") {

      console.log("Errrorrrrrrrr!");
        
      document.getElementById("message1").innerHTML=" * Invalid Deatails"

      return false;

    } else {
        document.getElementById("message1").innerHTML=""
        await axios.post("http://localhost:8080/api/customer/putCustomer", user);

      return true;

    }

    navigate("/");

  };

 


  return (

    <div>

      <h2 className="text-center m-4">Create User</h2>

      <div className="container">

        <form id="form" onSubmit={(e) => onSubmit(e)}>

          <div className="div1">

            <div className="mb-3">

              <label htmlFor="FName" className="form-label">

                First Name

              </label>

              <input

                type={"text"}

                className="form-control"

                placeholder="Enter your Name"

                name="first_name"

                required

                // value={fname}

                // defaultValue={'Enter your Name'}

                onChange={(e) => onInputChange(e)}

              ></input>

            </div>

            <div className="mb-3">

              <label htmlFor="LName" className="form-label">

                Last Name

              </label>

              <input

                type={"text"}

                className="form-control"

                placeholder="Enter your Last Name"

                name="last_name"

                required
                // value={lname}

                // defaultValue={"enter the last name"}

                onChange={(e) => onInputChange(e)}

              ></input>

            </div>

            <div className="mb-3">

              <label htmlFor="Dob" className="form-label">

                Date Of Birth

              </label>

              <input

                type={"Date"}

                className="form-control"

                placeholder="Enter your D.O.B"

                name="dob"

                required

                // value={dob}

                // defaultValue={"D.O.B"}

                onChange={(e) => onInputChange(e)}

              ></input>

            </div>

          </div>

          <div className="div1">

            <div className="mb-3">

              <label htmlFor="idtype" className="form-label">

                ID-Type

              </label>

              <br />

              <select name="id_type" onChange={(e) => onInputChange(e)} required>

                <option selected value="someOption">

                  select Card Type

                </option>

                <option value="Aadhar">Aadhar</option>

                <option value="Pan Card">PAN Card</option>

              </select>

            </div>

            <div className="mb-3">

              <label htmlFor="IDnO" className="form-label">

                ID No.

              </label>

              <br />

              <input

                type={"text"}

                className="form-control"

                placeholder="Enter your I.D Number"

                name="id_number"
                required

                onChange={(e) => onInputChange(e)}

              ></input>
              <br></br>
               <span id='message'></span>

            </div>

            {/* {!error && <div>message error</div>} */}

            <div className="mb-3">

              <label htmlFor="FName" className="form-label">

                {" "}

                Gender

              </label>

              <br />

              <select name="gender" onChange={(e) => onInputChange(e)} required>

                <option selected value="someOption">

                  Select Gender

                </option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>

              </select>

            </div>

          </div>
          <span id="message1"></span><br></br>

          <button type="submit" className="btn1" error>

            Submit

          </button>

          <Link className="btn2" to="/">

            Cancel

          </Link>

        </form>

      </div>

    </div>

  );

}