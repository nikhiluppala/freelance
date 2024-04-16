import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const MyProfile = () => {

    const [data, setData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [review, setReview] = useState([]);
    
    useEffect(() => {
            axios.get('http://localhost:3001/myprofile', {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setData(res.data))
        .catch( err => console.log(err))

        axios.get('http://localhost:3001/myreview', {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setReview(res.data))
        .catch( err => console.log(err))

        }, []);

    const logout = () => {
        
        localStorage.removeItem('token');
        setRedirect(true);
    }
    
    if(redirect){
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
           <section className='container'>
            <Link to="/dashboard">Back to Dashboard</Link>
            {data &&
            <div className='profile-grid my-1'>
                <div>
                    <img 
                        className="round-img"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                        alt=""
                    />
                    <h1 className='large'>{data.fullname}</h1>
                    <p className='lead'>{data.email}</p>
                    <p>India</p>
                </div>

                <div className='profile-githb'>
                    <h2 className='text-primary my-1'>
                        <i className='fab fa-github'></i> Reviews and Ratings
                    </h2>
                    <div className='repo bg-white p1 my-1'>
                        {review.length>=1 ?  
                        review.map(review => 
                            <div>
                            <h4><Link to="#">{review.taskprovider}</Link></h4>
                            <p>{review.rating}/5</p>
                        </div> ) : <p>No Review Added</p>
                        }
                        
                    </div>
                   
                </div>
            </div>
        
        }
       </section>
    </div>
  )
}

export default MyProfile