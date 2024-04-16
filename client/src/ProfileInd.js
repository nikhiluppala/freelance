import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';


    
const ProfileInd = ({props}) => {

const [redirect, setRedirect] = useState(false);

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
            <section className='container'>
                <Link to="/dashboard">Back to Dashboard</Link>
                
                <div className='profile-grid my-1'>
                    <div>
                        <img 
                            className="round-img"
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                            alt=""
                        />
                        <h1 className='large'>{props.params.fullname}</h1>
                        <p className='lead'>{props.params.email}</p>
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
                                            required
                                        />
                                    </div>
                                    <input type='submit' className='btn btn-primary' value="Add Rating"/>
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