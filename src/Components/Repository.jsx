// import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'

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
            
        </div>
    )
}

export default Repository