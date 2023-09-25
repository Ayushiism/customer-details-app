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
        in_number:"",
        gender:""
    })
    const {customer_id} = useParams();

    const{first_name,last_name,dob,id_type,id_number,gender}=user

    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadUser()
    },[])

    // // // console.log("Ayus");  
    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log(customer_id)
        await axios.put(`http://localhost:8080/api/customer/updateByID/${customer_id}`,user)
        navigate("/")
    };

    const loadUser = async()=>{
        console.log(customer_id);
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
                        value={first_name}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='LName' className='form-label'>Last Name</label>
                    <input type={'text'}
                        className='form-control'
                        placeholder='Enter your Last Name'
                        name='last_name'
                        value={last_name}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Dob' className='form-label'>Date Of Birth</label>
                    <input type={'Date'}
                        className='form-control'
                        placeholder='Enter your D.O.B'
                        name='dob'
                        value={dob}
                        onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
            </div>
            <div className='div1'>
                <div className='mb-3'>
                    <label htmlFor='idtype' className='form-label'>ID-Type</label><br/>
                    <select
                    value={user.id_type}
                     >   
                    <option selected disabled value="someOption">select Card Type</option>
                    <option value="otherOption">Aadhar</option>
                    <option value="otherOption">PAN Card</option>
                    </select>
                    
                </div>
                <div className='mb-3'>
                    <label htmlFor='ID' className='form-label'>ID No.</label><br/>
                    <input type={'idNo'}
                        className='form-control'
                        placeholder='Enter your I.D Number' 
                        name='id'
                        value={id_number}
                        onChange={(e)=>onInputChange(e)}
                        ></input>
                </div>
                <div className='mb-3'>

                    <label htmlFor='FName' className='form-label'>Gender</label><br/>
                    <select
                    value={user.gender}
                    >
                    <option selected disabled value="someOption">Select Gender</option>
                    <option value="otherOption">Male</option>
                    <option value="otherOption">Female</option>
                    <option value="otherOption">Other</option>
                    </select>
                </div>
            </div>
            <div className='btns'>
            <button type='submit' className='btn1'>Submit</button>
            <Link  className='btn2' to="/">Cancel</Link>
            </div>
            </form>
        </div>
    </div>
  )
}
