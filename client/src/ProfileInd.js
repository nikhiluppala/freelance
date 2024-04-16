import axios from 'axios';
import React, {useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';


    
const ProfileInd = () => {

const [redirect, setRedirect] = useState(false);
const {fullname, email, skill,id} = useParams();
const [rating, setRating] = useState(null);
const [taskprovider, setTaskprovider] = useState(null);

const submitHandler = () => {
axios.post('http://localhost:3001/myprofile', {
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}) .then(res => setTaskprovider(res.data.fullname));

    let review = {
        taskprovider,
        taskworker : {id},
        rating,
    }

axios.post('http://localhost:3001/addreview', review, {
    headers:{
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
}) .then(res => alert(res.data));
}



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
            
            <div className='profile-grid my-1'>
                <div>
                    <img 
                        className="round-img"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                        alt=""
                    />
                    <h1 className='large'>{fullname}</h1>
                    <p className='lead'>{email}</p>
                    <p>India</p>
                </div>

                <div className='profile-githb'>
                    <h2 className='text-primary my-1'>
                        <i className='fab fa-github'></i> Reviews and Ratings
                    </h2>
                    <div className='repo bg-white p-1 my-1'>
                        {}
                        <div>
                            <h4>Enter your reviews</h4>
                            <form className='form' autoCapitalize='off'>
                                <div className='form-group'>
                                    <input 
                                        type='text'
                                        placeholder='Enter your rating out of 5'
                                        name='rating'
                                        onChange={ e => setRating(e.target.value)}
                                        required
                                    />
                                </div>
                                <input type='submit' className='btn btn-primary' value="Add Rating" onSubmit={submitHandler}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
    </section>
    </div>
)
}
export default ProfileInd;