import React, { useEffect, useState } from 'react'
import './CSS/DashBoardCSS.css'
import { NavLink } from 'react-router-dom'
// import gitlogo from '../Images/github.png'
import bg from '../Images/bg2.png'
import Card from './Card'
import axios from 'axios'
import shyama from '../Images/shyss.jpg'
import jayant from '../Images/jayant.jpg'
import kashish from '../Images/Kashish.jpg'
import Login from './Login'
import Profile from './Profile'

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loggedin, setLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState([])
  useEffect(() => {
    let data = (localStorage.getItem('username'));
    console.log(data)
    if (data == null) {
      setLoggedIn(false)
    }
    else {
      setLoggedIn(true)
      getProfileDetails();
    }

  }, [])

  useEffect(() => {

    const debounceSearch = setTimeout(() => {
      if (search.trim() !== '') {
        searchUsers();
      } else {
        setUsers([]);
      }
    }, 1000); // Adjust the debounce delay as needed (e.g., 300 milliseconds)

    return () => clearTimeout(debounceSearch);
  }, [search]);

  const getProfileDetails = async () => {
    let userName =await localStorage.getItem('username');
    try {
      const response = await axios.get(`https://api.github.com/users/${userName}`);
      const data = response.data
      console.log(response)
      setUserProfile(data)
    } catch (error) {
      console.error('Error in fetching UserProfile Details:', error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${search}`);
      const data = response.data
      console.log(data)
      setUsers(data.items.slice(0, 6)); // Limiting to top 6 results
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);

  }
  const handleLoginClick = () => {
    const modal = document.getElementById('my_modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.showModal();
    }
  };
  const handleProfile = () => {
    const profile_modal = document.getElementById('my_modal_2');
    if (profile_modal) {
      profile_modal.style.display = 'flex';
      profile_modal.showModal();
    }
  }
  return (
    <div>
      <div className='dashBg'>
        <div style={{ marginLeft: 'auto', marginRight: '20px', display: 'flex', alignItems: 'center', padding: '5px', height: '50px' }}>
          <a href='#footer' className='nav-link'>About Us</a>
          {!loggedin ? <button className="nav-link" style={{ marginLeft: '20px', marginRight: '20px' }} onClick={() => { handleLoginClick() }}>
            Login
          </button> :

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="prof-icon" onClick={() => handleProfile()}>
                <img src={userProfile.avatar_url} alt="" className='dp' style={{ width: '35px', height: '35px', marginTop: '2px' }} />
              </div>
            </div>
          }
          <Login setLoggedIn={setLoggedIn}/>
          <Profile setLoggedIn={setLoggedIn} userProfile={userProfile}/>

        </div>

        <img src={bg} id='logo' alt="" style={{ position: 'absolute', zIndex: 1, alignContent: 'center' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, marginTop: '15%' }}>
          <h1 className='title'>Git-Along</h1>
        </div>
        <div className='input' style={{ width: '50%', zIndex: 100, backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>


          <input style={{ width: '80%', border: 'none', fontSize: 'large', marginLeft: '10px', }} type="text" placeholder='Enter the username ' value={search} onChange={handleChange} />
          <button onClick={() => searchUsers()} className='search_btn'>Search</button>
        </div>
        <div style={{ zIndex: 100 }} className='cards'>
          {users.map((user, index) => {
            return <NavLink key={index} to={`/repo-details/${user.login}/${user.id}`}>
              <Card key={index} username={user.login} dp={user.avatar_url} />
            </NavLink>
          })}

        </div>

      </div>
      <div className='footer' id='footer'>
        <h1 style={{ textAlign: 'center', color: '#10147d', marginTop: '10px', }}>About Us</h1>
        <div className='foot'>
          <div className='about' >
            <p>The GitHub Analytics Dashboard offers comprehensive insights into GitHub users and repositories. Users can effortlessly search for GitHub profiles and view a concise list of results. Upon selecting a user, a detailed repository table showcases vital information such as stars, forks, and open issues. Sorting and filtering options enhance user experience, enabling efficient navigation through repositories. Clicking on a repository reveals its commit activity graph for the past year, facilitating deeper analysis. Additionally, the dashboard lists contributors and their contributions, fostering community engagement. With a dedicated repository detail view featuring README files, recent commits, and open issues, users can gain comprehensive project insights. Smart rate limit handling ensures uninterrupted access to GitHub's API, guaranteeing a seamless user experience.</p>
          </div>
          <div  className='contributors-list'>
            <div style={{ marginRight: '20px', textAlign: 'center' }}>
              <a href="https://www.linkedin.com/in/shyama-agrawal162/" target='_blank' >
                <img src={shyama} className='owners' alt="" />
                <h4 style={{ color: '#412C8C' }}>Shyama Agrawal</h4>
              </a>
            </div>
            <div style={{ marginRight: '20px', textAlign: 'center' }}>
              <a href="https://www.linkedin.com/in/kashish-bansal-108684243/" target='_blank' >
                <img src={kashish} className='owners' alt="" />
                <h4 style={{ color: '#412C8C' }}>Kashish Bansal</h4>
              </a>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a href="https://www.linkedin.com/in/jayant-sharma-9544a4242/" target='_blank'>
                <img src={jayant} className='owners' alt="" />
                <h4 style={{ color: '#412C8C' }}>Jayant Sharma</h4>
              </a>
            </div>

          </div>
        </div>
      </div>
      <div className='greeting'>
        <h4 style={{ color: 'gray' }}>Thanks for visiting!</h4>
      </div>
    </div>
  )
}

export default DashBoard