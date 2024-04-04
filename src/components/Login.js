import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { FaUser, FaEnvelope, FaLock, FaIdBadge, FaCalendar } from 'react-icons/fa'

export default function Login() {
     const url = 'https://registration-detail.vercel.app' 
    // const url = 'http://localhost:8000'
    const [user, setUser] = useState({ name: "", dateofBirth: "",email: "", password: "" })
    const [show,setShow] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ user });
        await axios.post(`${url}/users/login`, user)
            .then((response) => {

                if (response.status === 201) {
                    toast.error(response.data.message)
                }
                if (response.status === 200) {
                    localStorage.setItem('authtoken', response.data.authtoken);
                    toast.success(response.data.message)
                    navigate('/allRecord')
                }
            }, (error) => {
                console.log(error);
                toast.error(error.message)
            });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
       
        console.log({ user });
        await axios.post(`${url}/users/`, user)
            .then((response) => {

                if (response.status === 201) {
                    toast.error(response.data.message)
                }
                if (response.status === 200) {
                    toast.success(response.data.message)
                    setShow(false)
                }
            }, (error) => {
                console.log(error);
                toast.error(error.message)
            });
            
    };
    const handleAccount = () => {
        setShow(true)
    }


    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-5 p-5">
            <div className="row justify-content-center mb-2 p-2">
                <div className="col-md-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="card-title text-center mb-4">
                                <FaUser color='blue' size={50} />
                            </div>

                            <form onSubmit={handleSubmit}>
                            {show && <div className="mb-3 input-group">
                                    <div class="input-group-text"><FaIdBadge/></div>
                                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" value={user.name} onChange={onChange} required />
                                </div> }
                            {show &&  <div className="mb-3 input-group">
                                    <div class="input-group-text"><FaCalendar/></div>
                                    <input type="date" className="form-control" id="date" name="dateofBirth" placeholder="Enter Date" value={user.dateofBirth} onChange={onChange} required />
                                </div> }
                                <div className="mb-3 input-group">
                                    <div class="input-group-text"><FaEnvelope/></div>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={user.email} onChange={onChange} required />
                                </div>
                                <div className="mb-3 input-group">
                                    <div class="input-group-text"><FaLock/></div>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={user.password} onChange={onChange} required />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button type="button" className="btn btn-link"><span><input class="form-check-input" type="checkbox" id="gridCheck" defaultChecked /></span>Remember me</button>
                                    <button type="button" className="btn btn-link">Forget your pasword?</button>
                                </div>
                                <div className=" row text-center mt-2">
                                {show ?  
                                    <button type="button" className="btn btn-primary" onClick={handleSignUp}>SignUp</button> 
                                    : 
                                    <button type="submit" className="btn btn-primary">Login</button>}
                                 {!show &&   
                                    <button type="button" className="btn btn-link" onClick={handleAccount}>create an account?</button>}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
