import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header(props) {
    const [path, setPath] = useState('/')
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
        localStorage.removeItem("tokenUser");
        navigate('/')
    }
    function markHeader(url){
        if (window.location.pathname === url){ return 'marked'}
    }
    return (
        <StyledHeader>
            {props.type==='online'?
            <>
                <h4>Seja bem-vindo(a), Pessoa!</h4>
                <span>
                    <h2 onClick={()=>headerBtn('/')} className={markHeader('/')}>Home</h2>
                    <h2 onClick={()=>headerBtn('/ranking')} className={markHeader('/ranking')}>Ranking</h2>
                    <h2 onClick={()=>logout()}>Sair</h2>
                </span>
            </>:
            <span>
                <h2 onClick={()=>headerBtn('/signin')} className={markHeader('/signin')}>Entrar</h2>
                <h2 onClick={()=>headerBtn('/signup')} className={markHeader('/signup')}>Cadastrar-se</h2>
            </span>
            }
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    padding: 5%;
    width: 100%;
    display: flex;
    justify-content: ${props => props.type==='online'?'space-between':'flex-end'};

    font-size: 14px;
    color: #9C9C9C;

    .marked, h4{
        font-weight: 700;
        color: #5D9040;
    }
    span{
        display: flex;
        gap: 5px;
    } 

`