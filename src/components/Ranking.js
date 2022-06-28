import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Banner from "./shared/Banner";
import Header from "./shared/Header";
import { url } from "../assets/Urls";
import rank from "../assets/imgs/rank.svg";

export default function Ranking() {
    const { token } = useContext(UserContext);
    const [name, setName] = useState('');
    const [arrayRank,setArrayRank] = useState([])
    const userToken = !token
    ? localStorage.getItem("shortlyToken")
    : token;

    async function rankingFunction(){
        const promise = axios.get(
            `${url}ranking`
        );
        promise.then((response)=>{
            setArrayRank(response.data);
        });
        promise.catch((error)=>{
            console.log(error.response);
        });
    };
    async function userInfo(){
        const authorization = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            }
        };

        const promise = axios.get(
            `${url}users`,
            authorization
        );
        promise.then((response)=>{
            setName(response.data.name);
        });
        promise.catch((error)=>{
            console.log(error.response);
        });
    };
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    useEffect(()=>{
        rankingFunction();
        userInfo();
    },[])

    return (
        <StyledRanking>
            {!!userToken?<Header type='online' name={name}/>:<Header type='offline'/>}
            <Banner/>  
            <BannerRank>
                <img src={rank} alt='rank icon'/>
                <p>Ranking</p>
            </BannerRank>
            <StyledContent>
                    {arrayRank.map((user) => (<li key={user.id}>{user.name} - {user.linksCount} links - {formatNumber(user.visitsCount)} vizualizações</li>))}
            </StyledContent>
            {!!userToken ? <Blankdiv></Blankdiv>:<h5>Crie sua conta para usar nosso serviço!</h5>}
        </StyledRanking>
    )  
}

const StyledRanking = styled.div`
    box-sizing: border-box;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: space-around;
    
    h5{
        max-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
    }
`
const BannerRank = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 10px auto;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;

    img{
        margin: auto 10px;
        height: 26px;
    }
`
const StyledContent = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    min-height: 240px;
    border: 1px solid #78B15940;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 5px;
    font-size: 14px;
    padding: 5px 2.5%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    li{
        display: list-item;
        list-style: number;
        list-style-position: inside;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
    }
`
const Blankdiv = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`