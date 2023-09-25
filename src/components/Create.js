import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Update.css'
import axios from 'axios'
import { Select } from '@mui/material'


export default function Create() {
    let navigate =  useNavigate()

    const [user,setUser] = useState({
        first_name:"",
        last_name:"",
        dob:"",
        id_type:"",
        id_number:"",
        gender:""
    })
    const [error, setError] = useState(false)

    const validatePan=(panVal)=>{
        // console.log(panVal)
        var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        
        if(regpan.test(panVal)){
        // valid pan card number
            console.log("Ayush")
            setError(false)
            return true;
        } else {
            console.log("No AYush")
            setError(true)
        // invalid pan card number
            
            return false;
        }
    }

    const validateAadhar=(AadharVal)=>{
        // var regpan = /^([0-9]){12}?$/;
        var regpan = /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

        if(regpan.test(AadharVal)){
        // valid Aadhar card number
            console.log("Ayush")
            setError(false)
            return true;
        } else {
            console.log("No AYush")
            setError(true)
        // invalid Aadhar card number
            
            return false;
        }
        
    }

    const{first_name,last_name,dob,id_type,id_number,gender}=user
    var flag = 0;
    const [val,setVal]= useState();
    const onInputChange=(e)=>{
        console.log(e.target.name)
        if(e.target.name=="id_number" && user.id_type == "Pan Card"){
            var panVal = e.target.value;
            (validatePan(panVal));        
        }else if(e.target.name=="id_number" && user.id_type == "Aadhar"){
            var AadharVal = e.target.value;
            (validateAadhar(AadharVal));
        }
        setUser({...user, [e.target.name]:e.target.value})
    }

    // const onInputChangee=(e)=>{
    //     [e.target.name]
    // }
    console.log(user);
    console.log(error)


    const onSubmit=async(e)=>{
        if(error){
            console.log("Errrorrrrrrrr!")
        }else{
        e.preventDefault();
        await axios.post("http://localhost:8080/api/customer/putCustomer",user)
        }
        navigate("/")
    };
  return (
    <div>
        <h2 className='text-center m-4'>Create User</h2>
        <div className='container'>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className='div1'>
                <div className='mb-3'>
                    <label htmlFor='FName' className='form-label'>First Name</label>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your Name'
                        name='first_name'
                       
                        // value={fname}
                        // defaultValue={'Enter your Name'}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='LName' className='form-label'>Last Name</label>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your Last Name'
                        name='last_name'
                        // value={lname}
                        // defaultValue={"enter the last name"}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Dob' className='form-label'>Date Of Birth</label>
                    <input type={'Date'}
                        className='form-control'
                        placeholder='Enter your D.O.B'
                        name='dob'
                        // value={dob}
                        // defaultValue={"D.O.B"}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
            </div>
            <div className='div1'>
                <div className='mb-3'>
                    <label htmlFor='idtype' className='form-label' >ID-Type</label><br/>
                    <select name='id_type' onChange={(e)=>onInputChange(e)}>
                    <option selected  value="someOption">select Card Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Pan Card">PAN Card</option>
                    </select>
                    
                </div>
                <div className='mb-3'>
                    <label htmlFor='IDnO' className='form-label'>ID No.</label><br/>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your I.D Number' 
                        name='id_number'
                        onChange={(e)=>onInputChange(e)}
                        ></input>
                </div>
                {/* {!error && <div>message error</div>} */}
                <div className='mb-3'>

                    <label htmlFor='FName' className='form-label' > Gender</label><br/>
                    <select name='gender' onChange={(e)=>onInputChange(e)}>
                    <option selected  value="someOption">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <button type="text" className='btn1'>Submit</button>
            <Link  className='btn2' to="/">Cancel</Link>
            </form>
        </div>
    </div>
  )
}
