import { toast } from "react-toastify";
import { useHistory,Link } from "react-router-dom";
import React,{ useEffect,useRef } from "react";
import styled from "styled-components";

const SuccessPageContainer = styled.main`
min-height: 100vh;
width: 100%;
background-color:${props => props.theme.colors.red};
display: flex;
justify-content: center;
align-items: center;
position: relative;

`;
const SuccessLogo = styled.img`
position: absolute;
top: 15%;
height: 45.79px;
max-width: 361.93px;

@media(max-width: 550px){
    width: 70%;
  }
`;
const SuccessTitle = styled.h1`
font-size: 86px;
font-weight:300;
color: white;
font-family: ${props=> props.theme.fonts.roboto};
line-height: 92px;
letter-spacing: 1.5px;
max-width: 723.87px;
height: 195px;
text-align: center;
span {
    display: block;
  }
br {
    display: none;
  }    

@media(max-width: 550px){
font-size: clamp(56px, 9vw, 66px);
line-height: 1.2;
br {
    display: block;
  }
}  
`;
function SiparisOnayi(){
    const history = useHistory();
    const isToasted = useRef(false);
    useEffect(()=>{
      if(history.location.state && history.location.state.siparisBasarili && !isToasted.current){
        toast.success("Sipariş Başarıyla Alındı!");
        isToasted.current = true;
        history.replace({ ...history.location, state: {} });
      }
    },[history]);
return(
    <SuccessPageContainer>
    <SuccessLogo src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" />
<SuccessTitle>TEBRİKLER! 
  <span>SİPARİŞİNİZ <br /> ALINDI!</span></SuccessTitle>
</SuccessPageContainer>
);
}
export default SiparisOnayi;