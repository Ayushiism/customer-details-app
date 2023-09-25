import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState, useParams, useEffect } from 'react';
import axios from 'axios';
// import { icons } from 'react-icons';

export default function View() {
    const [users,setUsers] = useState([]);

    // const {customer_id}=useParams()
    useEffect (() => {
        loadUsers()
    },[]);

    const loadUsers = async()=>{
        const result = await axios.get("http://localhost:8080/api/customer/getAllCustomers");
        setUsers(result.data);
        console.log(result.data);
    };

    const deleteUser=async (customer_id)=>{
        await axios.delete(`http://localhost:8080/api/customer/deleteByID/${customer_id}`);
        loadUsers();
    }
  return (
    <div>
        <TableContainer
            component={Paper}
            variant="outlined"
            >
            <Table aria-label="demo table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>ID Card</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*  data using api */}
                {/* <TableRow> */}
                    
                        {
                          users && users.map((user,index)=>(
                                // console.log(user)
                            <TableRow>
                                <TableCell>
                                <Link to={`/Update/${user.customer_id}`} className="button" scope="row" key={index}>{user.customer_id}</Link>
                                </TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                {/* <TableCell>{user.dob}</TableCell> */}
                                <TableCell>{user.id_number}</TableCell>
                                <TableCell>
                                <button className='btn5' onClick={()=> deleteUser(user.customer_id)}><BsFillTrashFill/></button>
                                </TableCell>
                            </TableRow>
                            ))
                        }
                    
                    {/* <TableCell>
                    <Link to="/Update" className="button">{users[0].customer_id}</Link>
                        </TableCell>
                    <TableCell>{users[0].first_name}</TableCell>
                    <TableCell>{users[0].last_name}</TableCell>
                    <TableCell>{users[0].dob}</TableCell>
                    <TableCell></TableCell> */}
                {/* </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
        <Link to="/Create/">Create</Link>
    </div>
  )
}
