import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import logo from "../assets/imgs/logo.svg"
import LoadingContext from '../context/LoadingContext.js';
import UserContext from '../context/UserContext.js';

export default function Signin(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { loading, setLoading } = useContext(LoadingContext);
    const { setToken } = useContext(UserContext);

    const navigate = useNavigate();

    function efetuarLogin(event){
        event.preventDefault();
        setLoading(true);
        
        const promise = axios.post(
            "url/login",
             {
                email: email,
                password: senha
            }
        );
        promise.then((response)=>{
            setToken(response.data.token);
            localStorage.setItem('shortlyToken', JSON.stringify(response.data.token));
            setLoading(false);
            navigate("/");    
        });
        promise.catch((error)=>{
            console.log(error.response)
            setLoading(false);
        });    
    };

    return(
        <PaginaLogin>
            <StyledForm>
                <span><h1>Shortly</h1><img src={logo} alt='logo'/></span>
                <form className='loginForm' onSubmit={loading?()=>{}:efetuarLogin}>
                    <input type="email" placeholder='email'id='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder='senha' id='senha' value={senha} onChange={(e)=>setSenha(e.target.value)} disabled={loading}/>
                    {loading?
                        <button className='loadingButton'>
                            <ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={45}/>    
                        </button>
                        :<input type="submit" value='Entrar' id='enviarLogin'/>
                    }
                </form> 
            </StyledForm>
        </PaginaLogin>

    )
}

const PaginaLogin=styled.div`
    box-sizing: border-box;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const StyledForm=styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;

    span{
        gap: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    img{
        object-fit: cover;
        width: 50px;
        height: 50px;
    }
    h1{
        font-size: 64px;
        font-weight: 200;
        color: #000000;
    }
    .loginForm{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loginForm input, .loginForm button{
        width: 100%;
        height: 45px;
        margin: 10px;
        border: 1px solid #78B15940;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 5px;
        font-size: 21px;
    }
    .loginForm ::placeholder{
        padding: 0px 10px;
        font-family: 'Raleway', sans-serif;
        color: gray;
    }
    .loadingButton{
        background-color: #5D9040;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #enviarLogin{
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        background-color: #5D9040;
        color: #FFFFFF;
    }
`