import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {motion} from 'framer-motion';
import axios from 'axios';

const AdminView = ({blogs})=>{

    const history = useHistory();
    function clickHandler(idx){
        const path = '/:' + blogs[idx]._id;
        history.push(path);
    }

    const acceptBlog = async (idx)=>{
            const {data} = await axios.post(
                '/blogs/accept',
                JSON.stringify({ blogId:blogs[idx]._id }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log("data is",data);
    }

    const rejectBlog = async (idx)=>{
            const {data} = await axios.post(
                '/blogs/reject',
                JSON.stringify({ blogId:blogs[idx]._id }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log("data is",data);
    }

    return (
    <motion.div layout initial={{opacity:0}} animate={{opacity:1}} className='content'>
        {
            blogs.map((item,idx)=>{
                return(
                    <div key={idx} className='blog-content' >
                        <div className='img'>
                            <img src={item.img} className='cover-img'></img>
                        </div>
                        <div className='header'>
                            <div className='tags'>
                                {
                                    item.tags.map((tg,idx)=>{
                                        return(
                                            <span key={idx} className='tag'>
                                                {tg.tagName}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div className='likes'>
                               <i class='fas fa-thumbs-up like-icon'></i>
                               {item.likes.length} 
                            </div>
                        </div>
                        <div className='blog-main'>
                            <div className='blog-heading'>
                                {item.heading}
                                </div>
                            <div className='blog-desc'>
                                {item.content}
                            </div>
                        </div>
                        <div className='blog-footer'>
                            Created By: {item.created}
                        </div>
                        <div>
                            <button onClick={()=>acceptBlog(idx)} >
                                Accept
                            </button>
                            <button onClick={()=>rejectBlog(idx)} >
                                Reject
                            </button>
                        </div>
                        <button onClick={()=>{clickHandler(idx)}}>
                            view blog
                        </button>
                        <p>{item.status}</p>
                    </div>
                )
            })
        }
    </motion.div>
    )
}

const UserView = ({blogs})=>{
    const history = useHistory();
    function clickHandler(idx){
        const path = '/:' + blogs[idx]._id;
        history.push(path);
    }
  return (
    <motion.div layout initial={{opacity:0}} animate={{opacity:1}} className='content'>
        {
            blogs.map((item,idx)=>{
                return(
                    item.status === 'approved'?
                    <div key={idx} className='blog-content' onClick={()=>{clickHandler(idx)}}>
                        <div className='img'>
                            <img src={item.img} className='cover-img'></img>
                        </div>
                        <div className='header'>
                            <div className='tags'>
                                {
                                    item.tags.map((tg,idx)=>{
                                        return(
                                            <span key={idx} className='tag'>
                                                {tg.tagName}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div className='likes'>
                               <i class='fas fa-thumbs-up like-icon'></i>
                               {item.likes.length} 
                            </div>
                        </div>
                        <div className='blog-main'>
                            <div className='blog-heading'>
                                {item.heading}
                                </div>
                            <div className='blog-desc'>
                                {item.content}
                            </div>
                        </div>
                        <div className='blog-footer'>
                            Created By: {item.created}
                        </div>
                    </div>:null
                )
            })
        }
    </motion.div>
  )
}
const ShowBlogs = ({blogs,setViewBlog}) => {
    const [isAdmin,setIsAdmin] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem("isAdmin")){
            setIsAdmin(true);
        }
    },[])
    return (
        isAdmin?<AdminView blogs={blogs}/>:<UserView blogs={blogs}/>
    )
}

export default ShowBlogs