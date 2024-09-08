import React, { useEffect, useState } from 'react'
import './style/content.css';
import { useHistory, useParams } from 'react-router-dom';
import {motion} from 'framer-motion';
import axios from 'axios';
const Content = () => {
    const history = useHistory();
    const backHandler = ()=>{
        history.push('/');
    }
    const [blog, setBlog] = useState({});
    const [likeColor, setLikeColor] = useState('#ffffff');
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState();
    const [show, setShow] = useState(-1);
    const [reply, setReply] = useState();
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
      async function fetch(){
            try{
                var {data} = await axios.post(
                    '/blogs/fetchablog',
                    JSON.stringify({ blogId:id.substring(1) }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setBlog(data);
                if(data.likes.length!=0){
                    if(data.likes.filter((item)=>{return item.user==user.email}).length!=0){
                        setLikeColor('cyan');
                    }
                } 
                var {data} = await axios.post(
                    '/comment/fetch',
                    JSON.stringify({ blogId:id.substring(1) }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setComments(data);
            }
            catch(error){
                console.log(error);
            }   
        }
        fetch();
    }, [])

    
    
    
    const likeHandler = async ()=>{
        const email = user.email;
        try{
            var {data} = await axios.post(
                    '/blogs/like',
                    JSON.stringify({ email,blogId:id.substring(1) }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

            setBlog(data);
            if(data.likes.length!=0){
                if(data.likes.filter((item)=>{return item.user===user.email}).length!=0){
                    setLikeColor('cyan');
                }
                else{
                    setLikeColor('#ffffff');
                }
            }
            else{
                setLikeColor('#ffffff');
            }
            window.location.reload(false);
        }
        catch(error){
            console.log(error);
        }
    }

    const commentHandler = async ()=>{
        try{
            if(JSON.parse(localStorage.getItem("isAuth"))==false){
                history.push('/login')
            }
            const {data} = await axios.post(
                    '/comment/add',
                    JSON.stringify({ blogId:id.substring(1),message,sendBy:user.email }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
            setComments(data);
            setMessage("");
        }
        catch(error){
            console.log(error);
        }
    }

    function showHandler(idx){
        if(idx==show){
            setShow(-1);
        }
        else{
            setShow(idx);
        }
    }

    async function replyHandler(idx){
        try{
            const {data} = await axios.post(
                    '/comment/reply',
                    JSON.stringify({ blogId:id.substring(1),message:reply,sendBy:user.email,id:comments[idx]._id }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

            setComments(data);
            setShow(-1);
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <motion.div  animate={{opacity:1}} initial={{opacity:0}} className='blog-viewer' style={{
        display:(id[0]===':')?'flex':'none'
    }}>
        <div className='backbtn btn' onClick={backHandler}>
            <i class='fas fa-arrow-right'></i>
        </div>
        <div className='top btn'>
            <i class='fas fa-angle-up'></i>
        </div>
        <div className='like btn' style={{
            display:(user&&(id[0]==':'))?'flex':'none'
        }} onClick={likeHandler}>
            <i class='fas fa-thumbs-up' style={{
                color:(likeColor==='cyan')? '#e02957':'#ffffff',
            }}></i>
        </div>
        <div className='viewer-heading'>
            {blog.heading}
        </div>
        <div className='viewer-img'>
            <img className='imgBlog' src={blog.img}></img>
        </div>
        <div className='caption1'>
            {blog.caption}
        </div>
        <div className='viewer-content'>
            {blog.content}
        </div>
        <div className='comments-section'>
            <div className='comment-heading'>
                Comments
            </div>
            <div className='send-comments'>
                <div className='name'>
                    {user.email}
                </div>
                <div className='input-section'>
                    <input className='comment-input' placeholder='Add Comments...' value={message} onChange={(e)=>{setMessage(e.target.value)}}></input>
                    <div className='btn-comment'>
                        <button type='submit' className='submit-btn1' onClick={commentHandler}> 
                            Add
                        </button>   
                    </div>
                </div>
            </div>
            <div className='show-comments'>
                {
                    (comments.length==0)?'No Comments':
                    comments.map((item,idx)=>{
                        return (
                            <motion.div key={idx} initial={{scale:0}} animate={{scale:1}} className='comment1'>
                                <div className='comment'>
                                    <div className='user-id'>
                                        {item.sendBy}:
                                    </div>
                                    <div className='message'>
                                        {item.message}
                                    </div>
                                    <div className='reply'>
                                        <button className='reply-btn' onClick={()=>{showHandler(idx)}}>
                                            <i class='fas fa-reply icon'></i>Reply
                                        </button>
                                    </div>
                                </div>
                                <div className='reply-control' style={{
                                    display:(show==idx)?'block':'none'
                                }}>
                                    <input className='reply-input' type='text' onChange={(e)=>{setReply(e.target.value)}}></input>
                                    <div className='btn-comment1'>
                                        <button type='submit' className='submit-btn1' onClick={()=>replyHandler(idx)}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                                <div className='reply-section'>
                                    {
                                        item.reply.map((item1,i)=>{
                                            return(
                                                <div className='reply-box'>
                                                    <div className='reply-header'>
                                                        {item1.sendBy}:
                                                    </div>
                                                    <div className='reply-message'>
                                                        {item1.message}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
    </motion.div>
  )
}

export default Content