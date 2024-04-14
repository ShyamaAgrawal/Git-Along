import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import avatar from '.././Images/bg.png'
// import Repositories from '../list.js'
import './CSS/Repo.css'
import gmail from '../Images/gmail.png'
import location from '../Images/location.png'
import followers from '../Images/followers.png'
//comment
function Repo() {
    const [repo, setRepo] = useState([
        {
            "id": 1,
            "name": "Bookstore",
            "desc": "This is a repository 1",
            "star": 10,
            "forks": 5,
            "open_issues": 3
        },
        {
            "id": 2,
            "name": "Hackathon",
            "desc": "This is a repository 2",
            "star": 14,
            "forks": 4,
            "open_issues": 5
        },
        {
            "id": 3,
            "name": "Project-clg",
            "desc": "This is a repository 3",
            "star": 19,
            "forks": 5,
            "open_issues": 6
        },
        {
            "id": 4,
            "name": "Machine learning",
            "desc": "This is a repository 4",
            "star": 14,
            "forks": 3,
            "open_issues": 8
        },
        {
            "id": 5,
            "name": "Cloud project",
            "desc": "This is a repository 5",
            "star": 19,
            "forks": 5,
            "open_issues": 3
        },
        {
            "id": 6,
            "name": "Gla-2025",
            "desc": "This is a repository 6",
            "star": 13,
            "forks": 8,
            "open_issues": 6
        },
        {
            "id": 7,
            "name": "Placements",
            "desc": "This is a repository 7",
            "star": 15,
            "forks": 3,
            "open_issues": 3
        },
        {
            "id": 8,
            "name": "Scaler",
            "desc": "This is a repository 8",
            "star": 9,
            "forks": 7,
            "open_issues": 1
        }
    ]);
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRepo, setFilteredRepo] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const para = useParams();
    const userName = para.username;
    console.log(userName)

    useEffect(() => {
        getRepoDetails();
        getProfileDetails();
    }, [])

    useEffect(() => {
        const filtered = repo.filter(rep => {
            return rep.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredRepo(filtered);
    }, [searchTerm, repo]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    }

    const sortedRepo = [...filteredRepo].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'forks') {
            return b.forks - a.forks;
        } else if (sortBy === 'star') {
            return b.star - a.star;
        } else if (sortBy === 'open_issues') {
            return b.open_issues - a.open_issues;
        }
        return 0;
    });

    const getRepoDetails = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}/repos`);
            const data = response.data
            console.log(data)
            setRepo(data)
        } catch (error) {
            console.error('Error in fetching Repo Details:', error);
        }
    };
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
        <>
            <div className='container'>
                <nav>
                    <div style={{ marginLeft: '10%', color: '#10147d' }}><h1 className='logo' >UserName</h1></div>
                    <div style={{ marginRight: '10%', backgroundColor: '#10147d', padding: '8px 16px', borderRadius: '10px', }} className='home'><a style={{ color: 'white' }} href="">HOME</a></div>

                </nav>
                <section style={{ marginLeft: '10%', marginRight: '10%', height: '90vh' }}>
                    <div className="left">
                        {userProfile.length == 0 ? <img className='avatar' src={avatar} alt="" /> :
                            <img className='avatar' src={userProfile.avatar_url} alt="" />}
                        <h1 style={{ color: 'beige' }}>{userProfile.name}</h1>
                        <h3 style={{ lineHeight: 1.5 }}>{userProfile.bio}</h3>
                        {userProfile.email && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src={gmail} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                            <h3>{userProfile.email}</h3>
                        </div>}
                        {userProfile.location && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src={location} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                            <p>{userProfile.location}</p>
                        </div>}
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src={followers} style={{ width: '20px', height: '20px', marginRight: '5px' }} alt="" />
                            <p style={{ marginRight: '10px', }}>{`${userProfile.followers} followers`}</p>
                            <p>{` * ${userProfile.following} following`}</p>
                        </div>


                    </div>
                    <div className="right">
                        <h1 style={{ color: '#10147d', display: 'inline-block', }}>Your Repositories</h1> <div style={{ display: 'inline-block', border: '1px solid gray', color: '#10147d', padding: '3px', backgroundColor: '#eeeef6', width: '20px', height: '20px', textAlign: 'center', borderRadius: '10px', fontWeight: 'bold', alignSelf: 'center' }}>{repo.length}</div>
                        <div className="func">
                            <div className="sort">
                                <label htmlFor="sortBy">Sort by:</label>
                                <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                                    <option value="name">Name</option>
                                    <option value="forks">Forks</option>
                                    <option value="star">Stars</option>
                                    <option value="open_issues">Open Issues</option>
                                </select>
                            </div>
                            <div className="search">
                                <label htmlFor="search">Search:</label>
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="box">
                            <div className='repo-cards-wrapper'>
                                <div className="repo-cards">
                                    {sortedRepo.map(rep => (
                                        <div key={rep.id} className="repo-card" >
                                            <div className="content">
                                                <div>
                                                    <span >{rep.name}</span>
                                                    <p className='des'>{rep.description}</p></div>
                                                <div style={{ backgroundColor: '#10147d', padding: '8px 16px', borderRadius: '30px' }} className='home' ><a style={{ color: 'white' }} href="">View</a></div>
                                            </div>
                                            <div className="meta">
                                                <p><i className="ri-git-fork-line"></i>{rep.forks}</p>
                                                <p><i className="ri-star-line"></i>{rep.star}</p>
                                                <p>Open Issue: {rep.open_issues}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Repo
