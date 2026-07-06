import { useHistory } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const HomeBackground = styled.div`
width: 100%;
min-height: 100vh;
background-image: url("/images/iteration-1-images/home-banner.png");
background-size: cover;
background-position: 100% 90%;
background-repeat: no-repeat;
background-color: ${props => props.theme.colors.red};
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
padding:35px 20px 20px 20px;
text-align: center; 
overflow-x: hidden;

@media(max-width: 550px){
background-image: 
      linear-gradient(to bottom, ${props => props.theme.colors.red} 0%, ${props => props.theme.colors.red} 58%, transparent 62%),
      url("/images/iteration-1-images/home-banner.png");
background-size: 280vw auto;
background-position: center bottom;
padding: 9vh 20px 20px 20px;
}
 @media (max-height: 737px){
  padding-top: 6vh;
  }
`;
const Logo = styled.img`
  height: 45.79px;      
  width: 291px;        
  margin: 0 0 35px 0;

  @media (max-width: 540px) {
    width: clamp(200px, 60vw, 331px);
    transform: none;
    height: auto;
  }
`;
const MainTitle = styled.h1`
  font-family: ${props => props.theme.fonts.roboto};
  color: white;
  font-size: 64px;
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: 1px;
  margin: 0 0 40px 0;

  span {
    display: block;
  }
  @media (max-width: 540px) {
    font-size: clamp(40px, 14vw, 86px); 
    width: min-content;
    transform: none;
    margin: 0 0 35px 0;
  }
  @media (max-height: 737px){
  font-size: 42px;
  margin 0 0 12px 0;
  }
`;
const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.yellow};
  color: ${props => props.theme.colors.darkGray};
  font-family: ${props => props.theme.fonts.barlow};
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 2.73px 54.16px 0.27px 54.16px;
  border-radius: 50px;
  line-height:52px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  letter-spacing: 0%;
  
  &:hover {
    background-color: #eab400;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
    @media (max-width: 540px) {
    transform: none;
    font-size: 24px;
  }
`;
function Anasayfa(){
    const history = useHistory();
    const handleSiparisGecis = (event) => {
      event.preventDefault();
      history.push("/PizzaSiparisi");
    };
return(
    <HomeBackground>
    <Logo src="/images/iteration-1-images/logo.svg"
        alt="Teknolojik Yemekler Logosu" /> 
        
    <MainTitle>
      KOD ACIKTIRIR
          <span>PİZZA, DOYURUR</span>  
    </MainTitle>
    <StyledButton onClick={handleSiparisGecis} data-cy="aciktim-button">
          ACIKTIM
        </StyledButton>
</HomeBackground>
);
}
export default Anasayfa;