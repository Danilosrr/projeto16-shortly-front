import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';

export default function Header(props) {
    const [path, setPath] = useState('/')
    const {token, setToken} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        setPath(window.location.pathname);
    },[]);

    function headerBtn(url){
        if (window.location.pathname !== url) {
            navigate(url);
        }
    }
    function logout(){
        localStorage.removeItem("shortlyToken");
        setToken(undefined);
        navigate('/signin');
    }
    function markHeader(url){
        if (window.location.pathname === url){ return 'marked'}
    }
    return (
        <StyledHeader>
            {props.type==='online'?
            <>
                <h4>Seja bem-vindo(a), {props.name}!</h4>
                <span>
                    <h2 onClick={()=>headerBtn('/')} className={markHeader('/')}>Home</h2>
                    <h2 onClick={()=>headerBtn('/ranking')} className={markHeader('/ranking')}>Ranking</h2>
                    <h2 onClick={()=>logout()}>Sair</h2>
                </span>
            </>:
            <>            
                <span/>
                <span>
                    <h2 onClick={()=>headerBtn('/signin')} className={markHeader('/signin')}>Entrar</h2>
                    <h2 onClick={()=>headerBtn('/signup')} className={markHeader('/signup')}>Cadastrar-se</h2>
                </span>
            </>
            }
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    padding: 5%;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;

    h2, h4{
        font-size: 14px;
        color: #9C9C9C;    
    }
    .marked, h4{
        font-weight: 700;
        color: #5D9040;
    }
    span{
        display: flex;
        gap: 5px;
    } 
`