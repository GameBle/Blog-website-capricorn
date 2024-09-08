import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import imgLogin from '../assets/loginImage.jpg';
import axios from 'axios';
import './style/login.css';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [constant, setConstant] = useState();
    const clientId ="745449942420-hvv2fks9tubfn3m4ub533d1qs3c0cjua.apps.googleusercontent.com";
    const history = useHistory();
    useEffect(() => {
            const initClient = () => {
                    gapi.client.init({
                            clientId: clientId,
                            scope: ''
                        });
        };
        gapi.load('client:auth2', initClient);
    },[constant]);
    
    const submitHandler = async ()=>{
        
        try{
            const {data} = await axios.post(
                '/user/login',
                JSON.stringify({ email, password:password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log("isAdmin",data.isAdmin,data);
            if(data.email == 'error'){
                return;
            }
            // const {data} = await axios.post('/user/login',JSON.stringify({email,password}),config);
            localStorage.setItem('isAuth',true);
            localStorage.setItem('user',JSON.stringify(data));
            localStorage.setItem("isAdmin",data.isAdmin)
            history.push('/');
        }
        catch(error){
            console.log(error);
        }
    }
    const onSuccess = async (res) => {
        console.log("res is",res);
        setEmail(res.wt.cu);
        try{
            const {data} = await axios.post(
                '/user/loginByGoogle',
                JSON.stringify({ email }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log("email is",email);
            // const {data} = await axios.post('/user/loginByGoogle',{email:email},config);
                localStorage.setItem('isAuth',true);
                localStorage.setItem('user',JSON.stringify(data));
                history.push('/');
        }
        catch(error){
            console.log(error);
        }
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };


  return (
    <div className='login-content'>
        <div className='navbar'>
            <p className='brand' onClick={()=>{history.push('/')}}>
                Blog
            </p>
            <div className='links'>
                <div className='links nav-links' onClick={()=>{history.push('/')}}>
                    Explore
                </div>
                <div className='links nav-links'>
                    Create
                </div>
                <div className='links'>
                    <button className='login'>
                        Login
                    </button>
                </div>
            </div>
        </div>
        <div className='login1'>
            <div className='login-heading'>
                Login
            </div>
            <div className='input'>
                <input placeholder='Email' type='text' onChange={(e)=>{setEmail(e.target.value)}} />
                <input placeholder='Password' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='buttons'>
                <button className='login-btn btn' onClick={submitHandler}>
                    Login
                </button>
                <button className='signup-btn btn'>
                    Sign Up
                </button>
            </div>
            <div className='google-login'>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        </div>
        <div className='img1'>
            <img src = {imgLogin} className='image'></img>
        </div>
    </div>
  )
}

export default Login