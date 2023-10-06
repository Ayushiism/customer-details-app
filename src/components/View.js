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
import useInfiniteScroll from 'react-infinite-scroll-hook';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { icons } from 'react-icons';
import './View.css'
export default function View() {
    
    const [users,setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // const {customer_id}=useParams()
    // useEffect (() => {
    //     loadUsers()
    // },[]);

    // const fetchData = async()=>{
    //     const result = await axios.get("http://localhost:8080/api/customer/getCustomersByPage?pageNumber=1&pageSize=5");
    //     setUsers(result.data);
    //     setTimeout(function(){
    //       console.log("Executed after 1 second");
    //   }, 1000);
    // }

    useEffect(() => {
        loadUsers();
      }, [page])

    const loadUsers = async()=>{
        const result = await axios.get("http://localhost:8080/api/customer/getCustomersByPage?pageNumber=0&pageSize=5");
        setUsers(result.data);
        console.log(result.data);
    };
    
    const handelInfiniteScroll = async () => {
        // console.log("scrollHeight" + document.documentElement.scrollHeight);
        // console.log("innerHeight" + window.innerHeight);
        // console.log("scrollTop" + document.documentElement.scrollTop);
        try {
          if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
          ) {
            setLoading(true);
            setPage((prev) => prev + 1);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
      }, []);
    

    const deleteUser=async (customer_id)=>{
        await axios.delete(`http://localhost:8080/api/customer/deleteByID/${customer_id}`);
        loadUsers();
    }
  return (
    <div>
        <TableContainer
            id="scrollable" component={Paper} sx={{ maxHeight: 370}}
            >
            {/* <InfiniteScroll
                dataLength={users.length} //This is important field to render the next data
                next={fetchData}
                hasMore={true}
                loader={ <p>Loading more data...</p>}
                scrollableTarget="scrollable"
            > */}

            <Table stickyHeader sx={{ minWidth: 5 }} aria-label="demo table" className='table' >
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
                </TableBody>
            </Table>
            {/* </InfiniteScroll> */}
        </TableContainer>
        <Link to="/Create/">Create</Link>
    </div>
  )
}
