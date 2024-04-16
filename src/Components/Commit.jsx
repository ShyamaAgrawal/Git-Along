import React from 'react'
import committer from '../Images/shyss.jpg';
import './CSS/DashBoardCSS.css'
const Commit = (props) => {
  return (
      <div className="commit">
          <div className="date">
              <h3>16 April</h3>
              <h5>12:00 AM</h5>
          </div>
          <div className="break"></div>
          <div className="commit-detail">
              <h3>{props.name}</h3>
              <div className="committed-by">
                  <h5 style={{ marginRight: '10px', }}>Committed by</h5>
                  <div className="committer">
                      <img src={committer} style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }} alt="" />
                      <h5>{props.author}</h5>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Commit