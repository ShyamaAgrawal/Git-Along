import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CSS/login.css'
import axios from 'axios'

function Login() {
    const [login, setLogin] = useState('login');
    const [data, setData] = useState({ name: "", username: "", email: "", password: "" });

    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginClick = () => {
        const modal = document.getElementById('my_modal_3');
        if (modal) {
            modal.style.display = 'none';
            modal.close();

        }
    };
    const signupSubmitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            username: `${data.username}`,
            email: `${data.email}`,
            password: `${data.password}`,
        };
        console.log(payload)
        try {
            const response = await axios.post(`https:/gitalong.onrender.com/register-user`, payload);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    };
    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            email: `${data.email}`,
            password: `${data.password}`,
        };
        console.log(payload)
        try {
            const response = await axios.post(`https:/gitalong.onrender.com/login-user`, payload);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <>

            {login === 'login' ? <dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={(e) => { loginSubmitHandler(e) }}>
                        <div className='top'>
                            <h1>Login</h1>
                            <button className="cross" onClick={() => { handleLoginClick() }}>
                                ✕
                            </button>
                        </div>
                        <div className='user-details'>
                            <span className='label'>Email</span> <br />
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={handleChange}
                                name='email'
                            />
                        </div>
                        <div className='user-details'>
                            <span className='label'>Password</span> <br />
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                value={data.password}
                                onChange={handleChange}
                                name='password'
                            />

                        </div>
                        <div className='bottom'>
                            <button className='but' type="submit">Login</button>
                            <p>
                                Don't have an account? <span className='switch' onClick={() => setLogin('signup')}>SignUp</span>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog> :
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box" style={{ height: '500px' }}>
                        <form onSubmit={(e) => { signupSubmitHandler(e) }}>
                            <div className='top'>
                                <h1>Sign Up</h1>
                                <button className="cross" onClick={() => { handleLoginClick() }}>
                                    ✕
                                </button>
                            </div>
                            <div className='user-details'>
                                <span className='label'>Username</span> <br />
                                <input
                                    type="text"
                                    placeholder="Enter your GitHub username"
                                    value={data.username}
                                    onChange={handleChange}
                                    name='username'
                                />
                            </div>
                            <div className='user-details'>
                                <span className='label'>Email</span> <br />
                                <input
                                    type="email"
                                    placeholder="Enter your GitHub email"
                                    value={data.email}
                                    onChange={handleChange}
                                    name='email'
                                />
                            </div>
                            <div className='user-details'>
                                <span className='label'>Password</span> <br />
                                <input
                                    type="password"
                                    placeholder="Enter your Password"
                                    value={data.password}
                                    onChange={handleChange}
                                    name='password'
                                />
                            </div>
                            <div className='bottom'>
                                <button className='but' type="submit">Sign Up</button>
                                <p>
                                    Already have an account? <span className='switch' onClick={() => setLogin('login')}>Login</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            }
        </>
    );
}

export default Login;