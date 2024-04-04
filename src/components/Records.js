import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { FaArrowCircleLeft, FaSortAlphaDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Records = () => {
    const [userRecords, setUserRecords] = useState([]);
    const token = localStorage.getItem('authtoken')
    const [input, setInput] = useState(false);
    const [data, setData] = useState({});
    const [editingId, setEditingId] = useState();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
     const url = 'https://registration-detail.vercel.app'
    // const url = 'http://localhost:8000'

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        const sorted = [...userRecords].sort((a, b) => {
            if (direction === 'ascending') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setUserRecords(sorted);
    };

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`${url}/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                }
            });
            fetchUserRecords()
            toast.success('Deleted Succesfully')
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    };

    const handleEdit = async (record) => {
        console.log(record)
        setInput(true)
        setEditingId(record._id)
        setData(record)
    }

    const handleSave = async (id) => {

        try {
            const response = await axios.put(`${url}/users/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                }
            });
            await fetchUserRecords();
            toast.success('Updated Succesfully')
            setInput(false)
            setEditingId();
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    }

    const fetchUserRecords = async () => {
        try {
            const response = await axios.get(`${url}/users/get`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                }
            });

            setUserRecords(response.data.data);
        } catch (error) {
            toast.error('Error fetching attendance records:', error);
        }
    };

    const handleClick = () => {
        localStorage.removeItem('authtoken')
    }

    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        fetchUserRecords();
    }, []);

    return (
        <div className="m-3 p-2">
            <nav className="navbar navbar-light bg-light">
                <Link to='/attend'><FaArrowCircleLeft color='green' size={50} /></Link>
                <form className="d-flex">
                    <Link to='/' onClick={handleClick}><button className="btn btn-success">Log Out</button></Link>
                </form>
            </nav>
            <div className="row-md-8">
                <div className="card">
                    <div className="card-body row justify-content-center">
                        <div className='container' style={{ height: '500px', overflowY: 'auto' }}>
                            <h2 className='text-center mb-4'>Attendance Records</h2>
                            <table className='table m-2'>
                                <thead className='justify-content-center'>
                                    <tr>
                                        <th className='text-center' >Name <span className='m-3'><FaSortAlphaDown onClick={() => handleSort('date')} /></span></th>
                                        <th className='text-center' >Date Of Birth </th>
                                        <th className='text-center' >Email Id </th>
                                        <th className='text-center' >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userRecords.map((record) => (
                                        <tr key={record._id}>
                                        {input && editingId === record._id 
                                            ? 
                                            <td><input type="email" className="form-control" id="name" name="name"  value={data.name} onChange={onChange} required/> </td>
                                            :
                                            <td className='text-center'>{record.name}</td>}
                                            
                                            <td className='text-center'>{format(new Date(record.dateofBirth), 'dd-MM-yyyy')}</td>

                                            {input && editingId === record._id 
                                                ? 
                                                <td><input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={data.email} onChange={onChange} required/></td>
                                                : 
                                                <td className='text-center'>{record.email}</td>}
                                            <td className='text-center'>

                                                {input && editingId === record._id ? <button className='btn btn-outline-success m-2' onClick={() => handleSave(record._id)}>Save</button>
                                                    :
                                                    <button className='btn btn-outline-success m-2' onClick={() => handleEdit(record)}>Edit</button>}
                                                <button className='btn btn-outline-danger m-2' onClick={() => handleDelete(record._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Records;
