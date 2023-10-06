import React,{useState,useEffect} from 'react'
import { Link , useParams,useNavigate} from 'react-router-dom'
import './Update.css'
import axios from 'axios'


export default function Update() {
   
    let navigate =  useNavigate()


    const [user,setUser] = useState({
        first_name:"",
        last_name:"",
        dob:"",
        id_type:"",
        id_number:"",
        gender:""
    })
    const {customer_id} = useParams();
    const [error, setError] = useState("disabled");

 

  const validatePan = (panVal) => {

    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (regpan.test(panVal)) {

      // valid pan card number

      console.log("Ayush pan");

      return true;

    } else {

      console.log("No pan AYush");

      return false;

    }

  };

 

  const validateAadhar = (AadharVal) => {

    var regpan =

      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

 

    if (regpan.test(AadharVal)) {

      // valid Aadhar card number

      console.log("Ayush");

      return true;

    } else {

      console.log("No AYush");

      return false;

    }

  };

 

    var val = "";
    
    const{first_name,last_name,dob,id_type,id_number,gender}=user

    const onInputChange=(e)=>{
        // let flag = 0;
        // if(e.target.name == 'id_type'){
        //    flag = 1;
        // }
        // if(flag == 1 ){
        //     val = user.id_number;
        //     console.log(val)
        //     user.id_number=""
        //     // setUser((user.id_number) => "")
        // }
        
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

            if (!validateAadhar(AadharVal)) {

            setError("disabled");
            document.getElementById("message").innerHTML="* Invalid Aadhar no."

            } else{
            document.getElementById("message").innerHTML=""        
            setError("");
            } 

        }

       
        setUser({...user, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadUser()
    },[])

    const onSubmit=async(e)=>{
        e.preventDefault();

        if (error == "disabled") {

        console.log("Errrorrrrrrrr!");
            
        document.getElementById("message1").innerHTML=" * Invalid Deatails"

        return false;

        } else {

        document.getElementById("message1").innerHTML=""
        await axios.put(`http://localhost:8080/api/customer/updateByID/${customer_id}`,user)
        return true;
        }
        navigate("/")
    };

    const loadUser = async()=>{
        // console.log(customer_id);
        const result= await axios.get(`http://localhost:8080/api/customer/getByID/${customer_id}`)
        // console.log(result.data)
        setUser(result.data)
    }
    console.log(user);
  return (
    <div>
        <h2 className='text-center m-4'>Edit User</h2>
        <div className='container'>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className='div1'>
                <div className='mb-3'>
                    <label htmlFor='FName' className='form-label'>First Name</label>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your Name'
                        name='first_name'
                        value={user.first_name}
                        onChange={(e)=>onInputChange(e)} required
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='LName' className='form-label'>Last Name</label>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your Last Name'
                        name='last_name'
                        value={user.last_name}
                        onChange={(e)=>onInputChange(e)} required
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Dob' className='form-label'>Date Of Birth</label>
                    <input type={'Date'}
                        className='form-control'
                        placeholder='Enter your D.O.B'
                        name='dob'
                        value={user.dob}
                        onChange={(e)=>onInputChange(e)} required
                    ></input>
                </div>
            </div>
            <div className='div1'>
                <div className='mb-3'>
                    <label htmlFor='idtype' className='form-label'>ID-Type</label><br/>
                    <select    name='id_type' onChange={(e)=>onInputChange(e)}
                    value={user.id_type} required
                     >   
                    <option selected disabled value="someOption">select Card Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Pan Card">PAN Card</option>
                    </select>
                    
                </div>
                <div className='mb-3'>
                    <label htmlFor='ID' className='form-label'>ID No.</label><br/>
                    <input type={'idNo'}
                        className='form-control'
                        placeholder='Enter your I.D Number' 
                        name='id_number'
                        value={user.id_number}
                        onChange={(e)=>onInputChange(e)} required
                        ></input>
                </div><br></br>
                <span id="message"></span>
                <div className='mb-3'>

                    <label htmlFor='FName' className='form-label'>Gender</label><br/>
                    <select onChange={(e)=>onInputChange(e)}
                    value={user.gender} required
                    >
                    <option selected disabled value="someOption">Select Gender</option>
                    <option value="otherOption">Male</option>
                    <option value="otherOption">Female</option>
                    <option value="otherOption">Other</option>
                    </select>
                </div>
            </div>
            <div className='btns'>
                <span id='message1'></span><br></br>
            <button type='submit' className='btn1' error>Submit</button>
            <Link  className='btn2' to="/">Cancel</Link>
            </div>
            </form>
        </div>
    </div>
  )
}
