// import React from 'react'
import './CSS/DashBoardCSS.css'
// import gitlogo from '../Images/github.png'
import bg from '../Images/bg2.png'
import Card from './Card'
import axios from 'axios'
import shyama from '../Images/shyss.jpg'
import jayant from '../Images/jayant.jpg'
import kashish from '../Images/Kashish.jpg'

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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
  return (
    <div>
      <div className='dashBg'>
        <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <a href='#footer' className='nav-link'>About Us</a>
          <a href='#' className='nav-link' style={{ marginLeft: '20px', marginRight: '20px'}}>Login</a>
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
          <div className='about' style={{ width: '50%', padding: '30px', textAlign: 'center' }}>
            <p>The GitHub Analytics Dashboard offers comprehensive insights into GitHub users and repositories. Users can effortlessly search for GitHub profiles and view a concise list of results. Upon selecting a user, a detailed repository table showcases vital information such as stars, forks, and open issues. Sorting and filtering options enhance user experience, enabling efficient navigation through repositories. Clicking on a repository reveals its commit activity graph for the past year, facilitating deeper analysis. Additionally, the dashboard lists contributors and their contributions, fostering community engagement. With a dedicated repository detail view featuring README files, recent commits, and open issues, users can gain comprehensive project insights. Smart rate limit handling ensures uninterrupted access to GitHub's API, guaranteeing a seamless user experience.</p>
          </div>
          <div style={{ width: '50%', display: "flex", flexDirection: 'row', justifyContent: 'center' }} >
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
      <div style={{ backgroundColor: 'rgb(244, 240, 240)', textAlign: 'center', padding: '20px' }}>
        <h4 style={{ color: 'gray' }}>Thanks for visiting!</h4>
      </div>
    </div>
  )
}

export default DashBoard