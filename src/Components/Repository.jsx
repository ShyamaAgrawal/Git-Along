// import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import './CSS/Repository.css'
import readme from '../Images/readme.png'
import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
// import ReactTooltip from 'react-tooltip';
import committer from '../Images/shyss.jpg';
import Commit from './Commit';


const today = new Date();
console.log(today)

const Repository = () => {
    const [userProfile, setUserProfile] = useState([]);
    const para = useParams();
    const userName = para.username;
    // console.log(para);



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
            count: getRandomInt(1, 3),
        };
    });

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
                        <h1>Git-Along</h1>
                    </div>
                    <div className='visibility'>
                        <p>Public</p>
                    </div>
                </div>
                <hr />
                <div className="mid">
                    <div className="readme">
                        <div  style={{ display: 'flex' ,width:'100px', padding:'4px',marginBottom:'5px'}}>
                            <img src={readme} style={{ width: '20px', marginRight: '5px', }} alt="" />
                            <h4>README</h4>
                        </div>
                        <hr />
                        <div className='read'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, debitis molestiae eligendi ipsum laborum necessitatibus, quo similique expedita perspiciatis adipisci beatae sunt repellat libero blanditiis saepe atque, maxime rem ipsam!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor a minima aliquid, quisquam ab accusamus, id aut hic vel eum explicabo aspernatur laborum! Quod in recusandae sequi iure culpa. avatar Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, molestiae rerum provident beatae eligendi sint, temporibus harum dolor itaque vitae natus error iure atque nesciunt tempore rem at totam odio.
                                Aperiam consequatur suscipit neque assumenda. Explicabo soluta laboriosam amet, doloribus obcaecati delectus est impedit aliquid laborum, incidunt neque modi animi nihil possimus quisquam? Iusto quis ad, praesentium culpa veniam adipisci.
                                Aliquam, modi perspiciatis. Iure nulla perspiciatis repellat at voluptates, accusamus veniam architecto eligendi id officia repudiandae unde nesciunt totam autem ducimus natus velit dolor sit illum. Maiores laudantium itaque explicabo!
                                Autem ex similique nam amet eius, at et consequuntur, debitis sit corporis, facilis esse eaque saepe dolores qui voluptatum ut nulla placeat accusamus excepturi! Nemo voluptatem corrupti eaque modi recusandae. </p>
                        </div>
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
                            <a href="" style={{ fontSize: 'small', color: 'black' }}>https://github.com/ShyamaAgrawal/Git-Along.git</a>
                        </div>
                    </div>
                </div>
                <div className="graph">
                    <h3>Contributions in last year</h3>
                    <CalendarHeatmap
                        startDate={shiftDate(today, -365)}
                        endDate={today}
                        values={randomValues}
                        classForValue={value => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-github-${value.count}`;
                        }}
                        tooltipDataAttrs={value => {
                            return {
                                'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
                                    }`,
                            };
                        }}
                        showWeekdayLabels={true}
                        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
                    />
                    {/* <ReactTooltip /> */}
                </div>

                {/* Commit history */}
                <div className="commits">
                    <h3>Commit History</h3>
                    <div className="allcommits">
                        <Commit/>
                        <Commit />
                        <Commit />
                        <Commit />
                        <Commit />
                        <Commit />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Repository