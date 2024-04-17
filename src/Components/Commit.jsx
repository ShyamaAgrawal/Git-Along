import React from 'react'
import committer from '../Images/shyss.jpg';
import './CSS/DashBoardCSS.css'
const Commit = (props) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
        
        return formattedTime;
    }
  return (
      <div className="commit">
          <div className="date">
              <h3>{formatDate(props.date)}</h3>
              <h5>{formatTime(props.date)}</h5>
          </div>
          <div className="break"></div>
          <div className="commit-detail">
              <h4>{props.name}</h4>
              <div className="committed-by">
                  <h5 style={{ marginRight: '10px', }}>Committed by</h5>
                  <div className="committer">
                      <img src={props.url} style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }} alt="" />
                      <h5>{props.author}</h5>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Commit