import React, {useState, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

    const [data, setData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() => {
            axios.get('http://localhost:3001/allprofiles', {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setData(res.data))
        .catch( err => console.log(err))
        }, []);

    const logout = () => {
        
        localStorage.removeItem('token');
        setRedirect(true);
    }
    
    if(!(localStorage.getItem('token'))){
        return <Navigate to="/login" />
    }

  return (
    <div>
        <nav className='navbar bg-dark'>
            <h1>
                <Link to="/"><i className='fas fa-code'></i> Developers Hub</Link>
            </h1>
            <ul>
                <li><Link to="/myprofile">My Profile</Link></li>
                <li><Link onClick={logout}>Logout</Link></li>
            </ul>
        </nav>
        <section className="container">
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'>Browse and connect with developers</i>
            </p>
            <div className='profiles'>
                {data.length>=1 ?  
                data.map(profile =>
                    
                    <div className='profile bg-light'>
                    <img 
                        className="round-img"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                        alt=""
                    />
                    <div>
                        <h2>{profile.fullname}</h2>
                        <p>{profile.email}</p>
                        <p>{profile.mobile}</p>
                        <Link to={`/profileind/${profile.fullname}/${profile.email}/${profile.skill}`} className='btn btn-primary'>View Profile</Link>
                    </div>
                    <ul>
                        {profile.skill.split(",").map(skill =>
                        <li className='text-primary'>
                            <i className='fas fa-check'></i> {skill}
                        </li>      
                    )} 
                        
                    </ul>
                </div>    
                )
                : null}
                

            </div>
        </section>
    </div>
  )
}

export default Dashboard