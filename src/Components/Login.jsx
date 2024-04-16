import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './CSS/login.css'

function Login() {
    const [login,setLogin] = useState('login');
    const {
        // register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);
    const handleLoginClick = () => {
        const modal = document.getElementById('my_modal');
        if(modal){
            modal.style.display='none';
          modal.close();
        }
      };

    return (
        <>
            {login === 'login' ?<dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                       <div className='top'>
                       <h1>Login</h1>
                        <button className="cross" onClick={() => { handleLoginClick() }}>
                        ✕
                        </button>
                       </div>
                        <div className='user-details'>
                            <span className='label'>Username</span> <br />
                            <input
                                type="text"
                                placeholder="Enter your GitHub username"
                            />
                        </div>
                        <div className='user-details'>
                            <span className='label'>Password</span> <br />
                            <input
                                type="password"
                                placeholder="Enter your Password"
                            />

                        </div>
                        <div className='bottom'>
                            <button className='but' type="submit">Login</button>
                            <p>
                                Don't have an account? <span className='switch' onClick={()=>setLogin('signup')}>SignUp</span>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog> :
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box" style={{height:'500px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        />
                    </div>
                    <div className='user-details'>
                        <span className='label'>Email</span> <br />
                        <input
                            type="email"
                            placeholder="Enter your GitHub email"
                        />
                    </div>
                    <div className='user-details'>
                        <span className='label'>Password</span> <br />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                        />
                    </div>
                    <div className='bottom'>
                        <button className='but' type="submit">Sign Up</button>
                        <p>
                            Already have an account? <span className='switch' onClick={()=>setLogin('login')}>Login</span>
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
