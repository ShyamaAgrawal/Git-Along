
// import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import './CSS/Repository.css'
import readme from '../Images/readme.png'
import CalendarHeatmap from 'react-calendar-heatmap';
// import ReactTooltip from 'react-tooltip';
import Commit from './Commit';
import ReactMarkdown from 'react-markdown';


const today = new Date();
console.log(today)

const Repository = () => {
    const [userProfile, setUserProfile] = useState([]);
    const [readMe, setReadMe] = useState([]);
    const [repoDetails, setRepoDetails] = useState([]);
    const [commitHistory, setCommitHistory] = useState([]);

    const para = useParams();
    const userName = para.username;
    const reponame = para.reponame;
    const repoId = para.repoId;

    console.log(reponame);



    const getRange = (count) => {
        return Array.from({ length: count }, (_, i) => i);
    };

    // Define the shiftDate function
    const shiftDate = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    // Define the getRandomInt function
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomValues = getRange(365).map(index => {
        return {
            date: shiftDate(today, -index),
            count: getRandomInt(0, 0),
        };
    });
    const [graphValues, setGraphValues] = useState(randomValues);
    

    useEffect(() => {
        getProfileDetails();
        getReadme();
        getRepoInfo();
        getCommitHistory();
    }, [])

    const getProfileDetails = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}`);
            const data = response.data
            // console.log(data)
            setUserProfile(data)
        } catch (error) {
            console.error('Error in fetching UserProfile Details:', error);
        }
    };
    const getReadme = async () => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${userName}/${reponame}/readme`);
            const data = response.data.content

            setReadMe(atob(data));
        } catch (error) {
            console.error('Error in getReadme:', error);
        }
    };

    const getRepoInfo = async () => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${userName}/${reponame}`);
            const data = response.data
            // console.log(data)
            setRepoDetails(data)

        } catch (error) {
            console.error('Error in getRepoInfo:', error);
        }
    };
    const getCommitHistory = async () => {
        let i = 1;
        const commits = [];
        const graphData = {};

        try {
            while (true) {
                const response = await axios.get(`https://api.github.com/repositories/${repoId}/commits?page=${i}`);
                const data = response.data;
                if (!Array.isArray(data) || data.length === 0) {
                    break;
                }
                commits.push(...data);
                i++;
            }
            setCommitHistory(commits);
            commits.forEach(item => {
                const date = item.commit.committer.date.slice(0, 10); // Extract the date part only
                if (!graphData[date]) {
                    graphData[date] = 1; // Initialize count to 1 for the first occurrence of each date
                } else {
                    graphData[date]++; // Increment count for subsequent occurrences of the same date
                }
            });

            const graphDataArray = Object.entries(graphData).map(([date, count]) => ({ date, count }));
            console.log(graphDataArray);

            // Function to convert the graphData object to an array of values
            const values = graphDataArray.map(entry => ({
                date: new Date(entry.date),
                count: entry.count,
            }));
            console.log(values);
            setGraphValues(values)

        } catch (error) {
            console.error('Error in getCommitHistory:', error);
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
                        <h1>{repoDetails.name}</h1>
                    </div>
                    <div className='visibility'>
                        <p>Public</p>
                    </div>
                </div>
                <hr />
                <div className="mid">
                    <div className="readme">
                        <div style={{ display: 'flex', width: '100px', padding: '4px', marginBottom: '5px' }}>
                            <img src={readme} style={{ width: '20px', marginRight: '5px', }} alt="" />
                            <h4>README</h4>
                        </div>
                        <hr />
                        <div className='readme-desc'>
                            <ReactMarkdown components={{
                                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>
                            }}>
                                {`${readMe}`}
                            </ReactMarkdown>

                        </div>
                    </div>

                    <div className="details">
                        <div className='info'>
                            <p style={{ marginRight: '5px', }}><i className="ri-git-fork-line" style={{ marginRight: '10px', }}></i>Fork</p>
                            <div className='num'><p>{repoDetails.forks}</p></div>
                        </div>

                        <div className='info'>
                            <p style={{ marginRight: '5px', }}><i className="ri-star-line" style={{ marginRight: '10px', }}></i>Stars</p>
                            <div className='num'>{repoDetails.stargazers_count}</div>
                        </div>

                        <div className='info' style={{ width: '40%' }}>
                            <p style={{ marginRight: '5px', }}>Open Issues</p>
                            <div className='num'>{repoDetails.open_issues}</div>
                        </div>
                        <div className="clone">
                            <h4>Clone</h4>
                            <hr />
                            <a href="" target='_blank' style={{ fontSize: 'small', color: 'black' }}>{`https://github.com/${userName}/${reponame}`}</a>
                        </div>
                    </div>
                </div>
                <div className="graph">
                    <h3>Contributions in last year</h3>
                    <CalendarHeatmap
                        startDate={shiftDate(today, -365)}
                        endDate={today}
                        values={graphValues}
                        classForValue={value => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-github-${value.count}`;
                        }}
                        // tooltipDataAttrs={value => {
                        //     return {
                        //         'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
                        //             }`,
                        //     };
                        // }}
                        showWeekdayLabels={true}
                        onClick={value => alert(`${value.date}: Total commits-${value.count}`)}
                    />
                    {/* <ReactTooltip /> */}
                </div>

                {/* Commit history */}
                <div className="commits">
                    <h3>Commit History</h3>
                    <div className="allcommits">
                        {commitHistory.map(item => (
                            <Commit key={item.node_id} name={item.commit.message} author={item.commit.committer.name} url={item.author.avatar_url} date={item.commit.committer.date} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repository
