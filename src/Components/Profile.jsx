// import React from 'react'
import './CSS/Profile.css'
import shyama from '../Images/shyss.jpg'
import gmail from '../Images/gmail.png'
import location from '../Images/location.png'
import followers from '../Images/followers.png'

const Profile = (props) => {
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
                    <img className='avatar' src={props.userProfile.avatar_url} alt="" />
                    <h1 >{props.userProfile.name}</h1>
                    <h5 style={{ lineHeight: 1.5 ,textAlign:'center'}}>{props.userProfile.bio}</h5>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {props.userProfile.email && <img src={gmail} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />}
                        <p>{props.userProfile.email}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {props.userProfile.location && <img src={location} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />}
                        <p>{props.userProfile.location}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={followers} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                        <p style={{ marginRight: '10px', }}> {`${props.userProfile.followers} followers`}</p>
                        <p>{`${props.userProfile.following} followings`}</p>
                    </div>

                    <button className='search_btn' style={{marginTop: '20px',}} onClick={()=>{localStorage.clear(); handleLoginClick(); props.setLoggedIn(false)}}>Logout</button>

                </div>
            </dialog>
        </div>
    )
}

export default Profile