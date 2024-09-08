import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ShowBlogs from '../components/ShowBlogs';

const Explore = () => {
    const [blogs, setBlogs] = useState([]);
    const [viewBlog, setViewBlog] = useState("");
    const [user, setUser] = useState(false);
    const history = useHistory();
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isAuth'))==false){
            history.push('/login')
        }
        async function fetch(){
            const user = JSON.parse(localStorage.getItem('user'))
            try{
                var {data} = await axios.post(
                    '/blogs/fetchUser',
                    JSON.stringify({ userId:user.email }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                // console.log(data);
                var arr = [...data];
                console.log(arr);
                setBlogs(arr);  

            }
            catch(error){
                console.log(error);
            }   
        }
        if(JSON.parse(localStorage.getItem('isAuth'))){
            const us = JSON.parse(localStorage.getItem('user'));
            setUser(us);
        }
        else{
            localStorage.setItem('isAuth',false);
            localStorage.setItem('user',false);
        }
      fetch();
    }, [])
    const loginHandler  = ()=>{
        console.log(JSON.parse(localStorage.getItem('isAuth')));
        if(JSON.parse(localStorage.getItem('isAuth'))){
            localStorage.setItem('user',false);
            localStorage.setItem('isAuth',false);
            history.push('/login');
        }
        else{
            history.push('/login')
        }
    }
  return (
    <div>
        <div className='navbar'>
            <p className='brand' onClick={()=>{history.push('/')}}>
                Blog
            </p>
            <div className='links'>
                <div className='links nav-links'>
                    Explore
                </div>
                <div className='links nav-links' onClick={()=>{history.push('/create')}}>
                    Create
                </div>
                <div className='links'>
                    <button className='login' onClick={loginHandler}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
        <button className='create-btn' onClick={()=>{history.push('/create')}}>
            <i class='fas fa-plus'></i>
        </button>
        <div className='main-content'>
            <ShowBlogs blogs={blogs} setViewBlog={setViewBlog} user={user}/>
        </div>
    </div>
  )
}

export default Explore