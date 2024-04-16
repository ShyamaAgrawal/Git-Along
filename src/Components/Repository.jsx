// import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import './CSS/Repository.css'
import readme from '../Images/readme.png'

const Repository = () => {
    const [userProfile, setUserProfile] = useState([]);
    const para = useParams();
    const userName = para.username;
    // console.log(para);

    useEffect(() => {
        getProfileDetails();
    }, [])

    const getProfileDetails = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}`);
            const data = response.data
            console.log(data)
            setUserProfile(data)
        } catch (error) {
            console.error('Error in fetching UserProfile Details:', error);
        }
    };
    return (
        <div>
            <nav>
                <div style={{ marginLeft: '10%', color: '#10147d' }}><h1 className='logo' >{userProfile.login}</h1></div>
                <div style={{ marginRight: '10%', backgroundColor: '#10147d', padding: '8px 16px', borderRadius: '10px', }} className='home'><NavLink style={{ color: 'white' }} to={`/repo-details/${userName}/${userProfile.id}`}>BACK</NavLink></div>
            </nav>
            <div className="main">
                <div className="repo">
                    <div className='repo-name' >
                        <img className='dp' src={userProfile.avatar_url} alt="" />
                        <h1 >Git-Along</h1>
                    </div>
                    <div className='visibility'>
                        <p>Public</p>
                    </div>
                </div>
                <div className="mid">
                    <div className="readme">
                        <div className='read' style={{ display: 'flex' ,width:'100px', padding:'4px',marginBottom:'5px'}}>
                            <img src={readme} style={{ width: '20px', marginRight: '5px', }} alt="" />
                            <h4>README</h4>
                        </div>
                        <hr />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, debitis molestiae eligendi ipsum laborum necessitatibus, quo similique expedita perspiciatis adipisci beatae sunt repellat libero blanditiis saepe atque, maxime rem ipsam!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor a minima aliquid, quisquam ab accusamus, id aut hic vel eum explicabo aspernatur laborum! Quod in recusandae sequi iure culpa.</p>
                    </div>
                    <div className="details">
                        <div className='info'>
                            <p style={{ marginRight: '5px', }}><i className="ri-git-fork-line" style={{ marginRight: '10px', }}></i>Fork</p>
                            <div className='num'><p>5</p></div>
                        </div>

                        <div className='info'>
                            <p style={{ marginRight: '5px', }}><i className="ri-star-line" style={{ marginRight: '10px', }}></i>Stars</p>
                            <div className='num'>5</div>
                        </div>

                        <div className='info' style={{ width: '40%' }}>
                            <p style={{ marginRight: '5px', }}>Open Issues</p>
                            <div className='num'>5</div>
                        </div>
                        <div className="clone">
                            <h4>Clone</h4>
                            <hr />
                            <a href="" style={{fontSize:'small',color:'black'}}>https://github.com/ShyamaAgrawal/Git-Along.git</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repository