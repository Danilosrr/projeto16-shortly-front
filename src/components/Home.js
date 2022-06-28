import { useState, useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { url } from "../assets/Urls";
import axios from "axios";
import styled from "styled-components";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import Banner from "./shared/Banner";
import Header from "./shared/Header";
import ShortLink from "./shared/ShortLinks";

export default function Home() {
    const { loading, setLoading } = useContext(LoadingContext);
    const { token } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [arrayLink, setArrayLink] = useState([]);

    const userToken = !token
    ? localStorage.getItem("shortlyToken")
    : token;

    function urlFunction(event){
        event.preventDefault();
        setLoading(true);
        
        const authorization = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            }
        }
      
        const promise = axios.post(
            `${url}urls/shorten`,
            { url: link },
            authorization
        );
        promise.then((response)=>{
            setLink('');
            setLoading(false);
            setRefresh(!refresh);
        });
        promise.catch((error)=>{
            console.log(error.response)
            setLoading(false);
            setRefresh(!refresh);
        });    
    };
    function usersFunction(){
        const authorization = {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
        };
      
        const promise = axios.get(
            `${url}users`,
            authorization
        );
        promise.then((response)=>{
            setName(response.data.name);
            setArrayLink(response.data.shortenedUrls[0]);
        });
        promise.catch((error)=>{
            console.log(error.response);
        });
    };

    useEffect(()=>{
        usersFunction();
    },[refresh])

    return (
        <StyledHome>
            <Header type='online' name={name}/>
            <Banner/>
            <StyledContent>
                <form onSubmit={loading?()=>{}:urlFunction}>
                    <input type="url" placeholder='Links que cabem no bolso' id='url' value={link} onChange={(e)=>setLink(e.target.value)} disabled={loading}/>
                    {loading?
                        <button className='loadingButton'>
                            <ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={45}/>    
                        </button>:
                        <input  type="submit" value='Encurtar link' id='sendForm'/>
                    }
                </form>
                <div className="homeContent">
                    {arrayLink.map((url) => (<ShortLink key={url.id} data={url} refresh={{refresh,setRefresh}}/>))}
                </div>
            </StyledContent>
        </StyledHome>
    )
}

const StyledHome = styled.div`
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
const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    form input, form button{
        width: 100%;
        height: 45px;
        margin: 10px 5px;
        border: 1px solid #78B15940;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 5px;
        font-size: 14px;
    } 
    #sendForm, .loadingButton{
        width: fit-content;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        background-color: #5D9040;
        color: #FFFFFF;
    }

    .homeContent{
        width: 100%;
        height: 380px;
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`