import logo from "../../assets/imgs/logo.svg";
import styled from "styled-components";

export default function Banner() {
    return (
        <StyledBanner>
            <span><h1>Shortly</h1><img src={logo} alt='logo'/></span>
        </StyledBanner>
    )
};

const StyledBanner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 60px;

    span{
        display: flex;
        gap: 15px;
    }
    img{
        object-fit: scale-down;
        width: 100%;
        height: 60px;
    }
    h1{
        font-size: 50px;
        font-weight: 200;
        color: #000000;
    }
`