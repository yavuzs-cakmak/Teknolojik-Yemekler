import React from 'react';
import styled from 'styled-components';
import { useHistory,Link } from 'react-router-dom';
 const Topside = styled.header`
    background-color: ${props=>props.theme.colors.red};
    width: 100%;
    padding-top: 66.49px; 
    padding-bottom: 21px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    @media(max-width: 550px){
    padding-top: 70px; 
    padding-bottom: 20px;
    }
    `;
    const HeaderContainerWrapper = styled.div`
  width: 100%;
  max-width: 532px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
    const LogoImage= styled.img`
    height: 45.79px;
    width: auto;
    margin-bottom: 44.72px;

     @media (max-width: 550px) {
     margin-bottom: 25px; 
     margin-right: 10px;
     height: 38px;
  }
    `;
    const Breadcrumb = styled.div`
    font-family: ${props=>props.theme.fonts.barlow};
    color: white;
    font-size: 16px;
    width: 100%;
    max-width: 532px;
    text-align:left;
    line-height: 29px;

    @media(max-width:550px){
    padding: 0 64px;
    font-size: 18px;
    }
    `;
    const ExtinctLink = styled(Link)`
    color: rgba(255,255,255,0.7);
    text-decoration: none;

    &:hover{
    text-decoration: underline;
    }
    `;
function Header(){
   const history= useHistory();
   const gecerliYol = history.location.pathname;

    return(
        <Topside>
        <HeaderContainerWrapper>
    <LogoImage src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" />
    {gecerliYol==="/PizzaSiparisi" &&(
    <Breadcrumb>
    <ExtinctLink to="/"> Anasayfa </ExtinctLink>
        <span> - </span>
        <strong>Sipariş Oluştur</strong>
    
    </Breadcrumb>
    )} 
    </HeaderContainerWrapper>   
    </Topside>
    );
}
export default Header;