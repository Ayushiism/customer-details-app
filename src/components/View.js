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
    

    const deleteUser=async (customer_id)=>{
        await axios.delete(`http://localhost:8080/api/customer/deleteByID/${customer_id}`);
        // loadUsers();
        fetchData();
    }

    const [rows, setRows] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const[page, setPage] = useState(0);

    const [tableLength, setTableLength] = useState(0)

    const [isLast, setIsLast] = useState(true)

 

 

  useEffect(() => {

   

    axios.get("http://localhost:8080/api/customer/" + "allcustomers/" + page).then(

      (response)=>{

        console.log(response.data)

        setRows(response.data.content)

        setTableLength(response.data.totalElements)

        setIsLoading(false)

        console.log(rows)

        setIsLast(response.data.last);

        console.log("isLast: " + response.data.last);

      }

    ).catch(e => {

      setRows([]);

    })

  }, [])

 

  const fetchData = ()=>{


    console.log("fetch data pagr no.: " + page)

    axios.get("http://localhost:8080/api/customer/" + "allcustomers/" + (page + 1)).then(

      (response)=>{

        console.log(response.data)

        setRows(rows.concat(response.data.content))

        setTableLength(response.data.totalElements)

        // setIsLoading(false)

        setPage(page+1);

        console.log(rows)

        setIsLast(response.data.last);

        console.log("isLast: " + response.data.last);

        console.log("fetch data after api call pagr no.: " + page)

      }

    ).catch(e => {

      setRows([]);

    })

  }
  return (
    <div>
        <TableContainer
            id="scrollable" component={Paper} sx={{ maxHeight: 370}}
            >
            <InfiniteScroll
                dataLength={rows.length} //This is important field to render the next data
                next={fetchData}
                hasMore={!isLast}
                loader={<p>Loading more data...</p>}
                scrollableTarget="scrollable"
            >

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
                          rows && rows.map((user,index)=>(
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
            </InfiniteScroll>
        </TableContainer>
        <Link  to="/Create/">Create</Link>
    </div>
  )
}
