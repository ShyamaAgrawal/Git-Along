// import React from 'react'
import './CSS/Profile.css'
import shyama from '../Images/shyss.jpg'
import gmail from '../Images/gmail.png'
import location from '../Images/location.png'
import followers from '../Images/followers.png'

const Profile = () => {
    const handleLoginClick = () => {
        const modal = document.getElementById('my_modal_2');
        if (modal) {
            modal.style.display = 'none';
            modal.close();
        }
    };
    return (
        <div>

            <dialog id="my_modal_2" className="profile-box">
                <div className="profile-modal">
                    <button className="close"  onClick={() => { handleLoginClick() }} >✕</button>
                    <img className='avatar' src={shyama} alt="" />
                    <h1 >Kashish Bansal</h1>
                    <h5 style={{ lineHeight: 1.5 ,textAlign:'center'}}> Lorem ipsum dolor sit amet, consectetur adipisicing elit </h5>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={gmail} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                        <p>mejayantsh@gmail.com</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={location} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                        <p>New Mathura</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={followers} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                        <p style={{ marginRight: '10px', }}> 50 followers</p>
                        <p> 20 following</p>
                    </div>

                    <button className='search_btn' style={{marginTop: '20px',}}>Logout</button>

                </div>
            </dialog>
        </div>
    )
}

export default Profile