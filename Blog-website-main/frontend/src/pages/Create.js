import React, { useEffect, useState } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import './style/create.css';
import axios from 'axios';
import {motion} from 'framer-motion';
import { useHistory } from 'react-router-dom';
const Create = () => {
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("fjkfjs hdafjsadk hsdfjsdf hjsfksdj f");
    const [caption, setCaption] = useState("");
    const [img, setImg] = useState("");
    const history = useHistory()
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isAuth'))){

        }
        else{
            history.push('/login');
        }
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
    
    const submitHandler = async ()=>{
        console.log(caption);
        const user = JSON.parse(localStorage.getItem('user'));
        if(!heading || !content || !caption ){
            return;
        }
        const created = user.email;
        console.log(user);
        try{

            const {data} = await axios.post(
                '/blogs/create',
                JSON.stringify({ heading,content,caption,created,img}),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            history.push('/');
        }
        catch(error){
            console.log(error);
        }
    }
    const postDetails = (pic)=>{
        if(pic === undefined){
            console.log('error');
        }
        if(pic.type==='image/png' || pic.type === 'image/jpeg'){
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset","blog-app")
            data.append("cloud_name","dsl8fcdfa");
            console.log("uploading...");
            fetch('https://api.cloudinary.com/v1_1/dsl8fcdfa/upload',{
                method:'post',
                body:data,
            }).then((res)=> res.json())
            .then(data =>{
                setImg(data.url.toString());
                console.log(data.url.toString());
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            console.log("not supported");
        }
    }
  return (
    <div >
        <div className='navbar'>
            <p className='brand' onClick={()=>{history.push('/')}}>
                Blog
            </p>
            <div className='links'>
                <div className='links nav-links' onClick={()=>{history.push('/explore')}}>
                    Explore
                </div>
                <div className='links nav-links' onClick={()=>{history.push('/create')}}>
                    Create
                </div>
                <div className='links'>
                    <button className='login' onClick={loginHandler}>
                        {
                            (JSON.parse(localStorage.getItem('isAuth')))?'Logout':'Login'
                        }
                    </button>
                </div>
            </div>
        </div>
        <motion.div  layout initial={{opacity:0}} animate={{opacity:1}} className='create-content'>
            <div className='title'>
                <input type='text' placeholder='Title of The Blog...' onChange={(e)=>{setHeading(e.target.value)}}></input>
            </div>
            <div className='caption'>
                <input type='file' accept='image/*' onChange={(e)=> postDetails(e.target.files[0])}></input>
                <input className='caption-input' type='text' placeholder='Caption of The Pic...' onChange={(e)=>{setCaption(e.target.value)}} />
            </div>
            <div className='area' >
            <textarea className='input-content' onChange={(e)=>{setContent(e.target.value)}}></textarea>
            </div>
            <div className='bttn'>
                <button type='submit' className='btn11' onClick={submitHandler}>
                    Submit
                </button>
            </div>
        </motion.div>
    </div>
  )
}

export default Create