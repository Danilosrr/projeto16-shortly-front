import logo from "../../assets/imgs/logo.svg";
import styled from "styled-components";

export default function Banner() {
    return (
        <StyledBanner>
            <h1>Shortly</h1><img src={logo} alt='logo'/>
        </StyledBanner>
    )
};

const StyledBanner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 60px;
    
    img{
        object-fit: cover;
        width: 90px;
    }
    h1{
        font-size: 64px;
        font-weight: 200;
        color: #000000;
    }
`