import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {
    const {
        // register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);
    const handleLoginClick = () => {
        console.log('kash')
        const modal = document.getElementById('my_modal_3');
        if(modal){
          modal.close();
        }
      };

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <NavLink to="/" className="close-btn">
                            ✕
                        </NavLink>
                        <button className="nav-link" style={{ marginLeft: '20px', marginRight: '20px' }} onClick={() => { handleLoginClick() }}>
                            Login
                        </button>
                        <h1>Login</h1>
                        <div>
                            <span>Username</span> <br />
                            <input
                                type="text"
                                placeholder="Enter your GitHub username"
                            // {...register('username', { required: true })}
                            />
                            {/* {errors.username && (
                                <span className="error-message">This field is required</span>
                            )} */}
                        </div>
                        <div>
                            <span>Password</span> <br />
                            <input
                                type="password"
                                placeholder="Enter your Password"
                            // {...register('password', { required: true })}
                            />
                            {/* {errors.password && (
                                <span className="error-message">This field is required</span>
                            )} */}
                        </div>
                        <div>
                            <button type="submit">Login</button>
                            <p>
                                Don't have an account? <Link to="/signup">SignUp</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default Login;
