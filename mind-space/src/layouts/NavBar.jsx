import React from 'react'
import {Link} from 'react-router-dom';
const NavBar = () => {
return (
    <div>
        <ul style={{ listStyleType: 'none', display: 'flex', padding: 0,}}>
            <li><Link to="/">Home</Link></li>
            <li style={{marginLeft:"10px"}}><Link to="/quotes">Quotes</Link></li>
            <li style={{marginLeft:"10px"}}><Link to="/mood-tracker">Mood Tracker</Link></li>
            <li style={{marginLeft:"10px"}}><Link to="/journal">Journal</Link></li>
        </ul>
    </div>
)
}

export default NavBar
