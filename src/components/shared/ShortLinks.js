import styled from "styled-components";
import trash from "../../assets/imgs/trash.svg";
import { useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { url } from "../../assets/Urls";

export default function ShortLink(props) {
    const { id,url:originalUrl,shortUrl,visitCount } = props.data;
    const { refresh,setRefresh } = props.refresh;
    const { token } = useContext(UserContext);

    function deleteUrl(id){
        const authorization = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.delete(
            `${url}urls/${id}`,
            authorization
        );
        promise.then((response)=>{
            setRefresh(!refresh);
        });
        promise.catch((error)=>{
            console.log(error.response);
            setRefresh(!refresh);
        });
    };
    function acessUrl(shortUrl){
        window.open(`${url}urls/open/${shortUrl}`,"_blank");
        setRefresh(!refresh);
        window.location.reload();
    };

    return (
        <StyledUrl>
            <span onClick={()=>acessUrl(shortUrl)}>
                <h3 className="bigUrl">{originalUrl}</h3>
                <h3>{shortUrl}</h3>
                <h3>visitas: {visitCount}</h3>
            </span>
            <button onClick={()=>deleteUrl(id)}>
                <img src={trash} alt="trash icon"/>
            </button>
        </StyledUrl>
    )
}

const StyledUrl = styled.div`
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 45px;
    border: 1px solid #78B15940;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    margin: 10px auto;

    span{
        background-color: #80CC74;
        display: flex;
        justify-content: space-around;        
        align-items: center;        
        width: 100%;
        padding: 2px;
        font-size: 14px;
        border-radius: 12px 0px 0px 12px;
    }
    span h3{
        font-size: 10px;
        font-weight: 400;
    }
    .bigUrl{
        overflow: hidden;
        white-space: nowrap;
        width: 40%;
        text-overflow: ellipsis;
    }
    button{
        background-color: #FFFFFF;
        width: 50px;
        height: 100%;
        font-size: 14px;
        border: none;
        border-radius: 0px 12px 12px 0px;
    }
    button img{
        object-fit: cover;
        height: 20px;
    }
`