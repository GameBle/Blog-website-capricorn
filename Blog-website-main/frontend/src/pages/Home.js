import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ShowBlogs from '../components/ShowBlogs';
import './style/home.css';
const Home = () => {
    const history = useHistory();
    const [viewBlog, setViewBlog] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetch(){
            try{
                var {data} = await axios.get(
                    '/blogs/fetch',
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                // console.log(data);
                var arr = [...data];
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
            <p className='brand'>
                Blog
            </p>
            <div className='links'>
                <div className='links nav-links' onClick={()=>history.push('/explore')}>
                    Explore
                </div>
                <div className='links nav-links' onClick={()=>{history.push('/create')}}>
                    Create
                </div>
                <div className='links'>
                    <button className='login' onClick={loginHandler}>
                        {
                            (user.email)?'Logout':'Login'
                        }
                    </button>
                </div>
            </div>
        </div>
        <div className='main-content'>
            <ShowBlogs blogs={blogs} setViewBlog={setViewBlog} user={user}/>
        </div>
    </div>
  )
}

export default Home;