import React, { useState, useEffect } from 'react'
import avatar from '.././Images/bg.png'
import { Repositories } from "../../public/list"
import './CSS/Repo.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
//comment
function Repo(props) {
    const [repo, setRepo] = useState(Repositories);
    const [userProfile, setUserProfile] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRepo, setFilteredRepo] = useState([]);
    const params = useParams();
    const userName = params.username;
    console.log(userName)

    useEffect(()=>{
        gettingUserProfile();
        gettingAllRepo();
    },[]);

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
            return a.forks - b.forks;
        } else if (sortBy === 'star') {
            return a.star - b.star;
        } else if (sortBy === 'open_issues') {
            return a.open_issues - b.open_issues;
        }
        return 0;
    });

    const gettingAllRepo = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}/repos`);
            const data = response.data
            console.log(data)
            setRepo(data)
        } catch (error) {
            console.error('Error in fetching Repos:', error);
        }
    };
    const gettingUserProfile = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}`);
            const data = response.data
            console.log(data);
            setUserProfile(data);
        } catch (error) {
            console.error('Error in fetching user details:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <nav>
                    <div className="leftn">
                        <h1>UserNAme</h1>
                    </div>
                    <div className="rightn">
                        <a href="">HOME</a>
                    </div>

                </nav>
                <section>
                    <div className="left">
                        <img src={avatar} alt="" />
                        <h1>ABC XYZ </h1>
                        <h3>abc@gmail.com</h3>
                        <h4>Total Repositories: {repo.length}</h4>
                    </div>
                    <div className="right">
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
                                                <span >{rep.name}</span>
                                                <p className='des'>{rep.desc}</p>
                                            </div>
                                            <div className="meta">
                                                <p><i class="ri-git-fork-line"></i>{rep.forks}</p>
                                                <p><i class="ri-star-line"></i>{rep.star}</p>
                                                <p>Open Inssue: {rep.open_issues}</p>
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
