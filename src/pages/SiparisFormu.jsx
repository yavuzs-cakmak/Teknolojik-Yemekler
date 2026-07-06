import Header from "../components/Header";
import React from "react";
import styled from "styled-components";
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const BOYUTLAR = [
{id:"kucuk", label:"Küçük",value:"kucuk"},
{id:"orta", label:"Orta",value:"orta"},
{id:"buyuk", label:"Büyük",value:"buyuk"}
];

const HAMURLAR =[
    { value: "İnce", text: "İnce Kenar"},
    { value: "Klasik", text: "Klasik Kenar"},
    { value: "Kalın", text: "Kalın Kenar"}
];
const MALZEMELER =[
    "Pepperoni", "Sosis", "Kanada Jambonu", 
  "Tavuk Izgara", "Soğan", "Domates", 
  "Mısır", "Sucuk", "Jalapeno", 
  "Sarımsak", "Biber", "Ananas", "Kabak"
];
const PageContainer = styled.main`
width: 100%;
max-width: 532px;
text-align: left;
margin: 31px auto 0;

@media(max-width:550px){
margin: 0 auto;
padding: 15px clamp(16px, 5vw, 64px);
}
`;
const TitleContainer = styled.h1`
font-family: ${props => props.theme.fonts.barlow};
color: ${props => props.theme.colors.darkGray};
font-size: 22px;
font-weight: 600;
line-height: 29.44px;
margin:0;
height: 56px;
display: flex;
align-items: center;

@media(max-width: 550px){
font-size: clamp(18px, 5vw, 22px);
}
`;
const PriceAndRatingRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 14px;
margin-bottom: 18px;

@media(max-width: 550px){
justify-content: flex-start; 
gap: 120px;
}
@media(max-width: 420px) {
    gap: 24px;  
    flex-wrap: wrap;  
    justify-content: flex-start; 
  }
`;
const Price = styled.h2`
color: ${props=>props.theme.colors.darkGray};
font-family: ${props=>props.theme.fonts.barlow};
font-size: 28px;
font-weight: 700;
line-height: 37.47px;

@media(max-width: 550px){
font-size: clamp(22px, 6vw, 26px);
}
`;
const RatingGroup = styled.div`
color: ${props=>props.theme.colors.lightGray};
display: flex;
align-items: center;
gap: 54.2px;
font-size: 16px;

@media(max-width: 550px){
gap: 64px;
font-size: clamp(14px, 4vw, 16px);
}
`;
const ExplanationPizza = styled.p`
color: ${props=>props.theme.colors.lightGray};
font-size: 16px;
font-family: ${props=>props.theme.fonts.barlow};
line-height: 28.8px;
font-weight: 400;

@media(max-width:550px){
font-size: clamp(14px, 4vw, 16px);
width: 82%;
line-height: 1.5;
word-wrap: break-word;
}

`;
const PizzaForm = styled.form`
display: flex;
flex-direction: column;
margin-top: 40px;

`;
const OptionsRow = styled.div`
width: 100%;
display:flex;
justify-content: flex-start;
gap: 121.88px;
margin-bottom: 40px;

@media(max-width: 550px) {
    gap: 28px;
  }
`;
const StyledFieldset = styled.fieldset`
border: none;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
width: 147px;

`;
const StyledLegend = styled.legend`
font-family: ${props=>props.theme.fonts.barlow};
color: ${props=>props.theme.colors.darkGray};
font-size: 20px;
font-weight: 600;
margin-bottom:${props=> props.$mb || "20px"};

@media(max-width:550px){
font-size: clamp(18px, 5vw, 20px);
}
`;
const OptionLabel = styled.label`
font-family: ${props=>props.theme.fonts.barlow};
color: ${props=>props.theme.colors.lightGray};
font-size: 16px;
font-weight: 500;
cursor: pointer;
align-items: center;
display: flex;
margin-bottom: 10px;
line-height: 30px;

@media(max-width: 550px){
font-size: clamp(14px, 4vw, 16px);
}
`;
const HamurSelectGroup = styled.div`
display: flex;
gap: 12px;
flex-direction: column;

`;
const StyledLabel = styled.label`
font-family: ${props=>props.theme.fonts.barlow};
color: ${props=>props.theme.colors.darkGray};
font-size: 20px;
font-weight: 600;

@media(max-width: 550px){
font-size: clamp(18px, 5vw, 20px);
}
`;
const RequiredStar = styled.span`
color: ${props=>props.theme.colors.red};
`;
const StyledSelect = styled.select`
  width: 159px; 
  height: 26px; 
  padding: 0px 2px 0px 4px;
  font-family: ${props => props.theme.fonts.barlow};
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.darkGray};
 
  @media(max-width: 550px){
  margin-top: 16px;
  }
`;
const StyledInput = styled.input`
margin-right: 11px;

`; 
const WideFieldset = styled(StyledFieldset)`
width: 97%;
margin-bottom: 32px;

@media(max-width: 550px){
min-width: 0;
width: 100%;
}
`;
const SectionSubText = styled.p`
font-family: ${props => props.theme.fonts.barlow};
color: ${props => props.theme.colors.lightGray};
font-size: 16px;
vertical-align: middle;
font-weight: 500;
line-height: 56px;
margin: 0 0 40px 0;

@media(max-width:550px){
line-height: 1.4;
margin: 16px 0 16px 0;
font-size: clamp(14px, 4vw, 16px);
}
`;
const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px; 
  margin-bottom: 8px;

  @media(max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;
const CheckboxLabel = styled(OptionLabel)`
  margin-bottom: 0; 
  gap: 11px;
  line-height: 28.8px;
  font-weight: 700;

`;
const TextInput = styled.input`
width: 100%;
padding: 10px;
margin: 20px 0 8px 0;
border: 1px solid #D9D9D9;
border-radius: 6px;
font-family: ${props=> props.theme.fonts.barlow};
font-size: 14px;
font-weight: 500;

`;
const TextArea = styled.textarea`
width: 100%;
padding: 20px;
margin: 0px 0 0px 0;
border: 1px solid #D9D9D9;
border-radius: 6px;
font-family: ${props => props.theme.fonts.barlow};
min-height: 56px;
overflow-y: hidden;
resize: none;
font-size: 14px;
font-weight: 500;

`;
const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #5F5F5F80; 
  width: 100%;
  margin: 36px 0 40px 0;
`;
const SubmitButton = styled.button`
background-color: ${props=> props.theme.colors.yellow};
color: ${props=> props.theme.colors.darkGray};
border: none;
border: 1px solid #D9D9D9;
border-radius: 6px;
padding: 5px 0;
font-size: 18px;
font-weight: 600;
height:62px;
cursor: pointer;
width: 350px;
transition: all 0.4s;
flex-shrink: 0;

&:disabled{
background-color: #E5E5E5;
color: #999;
cursor: not-allowed;
flex-shrink: 0;
}
@media(max-width: 550px) {
    width: 45%; 
    height:56px;
    order: 3;
    margin-top: 35px; 
    margin-left: 55%;
  }
`;
const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.red};
  font-family: ${props => props.theme.fonts.barlow};
  font-size: 14px;
  font-weight: 500;
  margin: 4px 0 0 0;
`;
const BottomBasketRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;

@media(max-width: 550px) {
    flex-direction: row; 
    align-items: stretch;
    flex-wrap: wrap;    
    gap: 24px;              
    width: 100%;
  }
`;
const CounterWrapper = styled.div`
display: flex;
height: 57px;
border-radius: 5px;
overflow: hidden;
width: 170px;
flex-shrink: 0;

@media(max-width: 550px){
           
    max-width: clamp(170px, 6vw, 200px);     
    margin: 0;        
    height: 56px;
    order: 2;
    flex-shrink: 1;  
}
`;
const CounterBtn = styled.button`
width: 57px;
height: 56px;
background-color: ${props=>props.theme.colors.yellow};
border: none;
font-size: 16px;
font-weight: 700;
cursor: pointer;
&:hover{background-color: #eab400;}

@media(max-width: 550px){
font-size:22px;
width: 70px;           
height: 60px;
}
`;
const CounterValue = styled.div`
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
border-top: 1px solid #D9D9D9;
border-bottom: 1px solid #D9D9D9;
font-weight: 700;
font-size: 16px;

@media(max-width: 550px){
font-size:22px;
width: 60px;           
height: 60px; 

}
`;
const SummaryCard = styled.section`
width: 350px;
display: flex;
flex-direction: column;
height: 197px;
border: 1px solid #D9D9D9;
border-radius: 6px;

@media(max-width: 550px){
width: 100%; 
height: 202px;
min-height: 180px;
order: 1;
}
`;
const SummaryContent = styled.div`
  padding: 42px 48.45px 46px 49px;

`;
const SummaryTitle = styled.h3`
  font-family: ${props => props.theme.fonts.barlow};
  font-size: 20px;
  font-weight: 600;
  color:  ${props=>props.theme.colors.darkGray};
  margin: 0 98.55px 22px 0;

`;
const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.barlow};
  font-size: 18px;
  color: ${props => props.$isRed ? "#CE2828" : "#5F5F5F"};
  font-weight: ${props => props.$isRed ? "600" : "500"};
  margin-top: ${props => props.$isRed ? "12px" : "0"};

`;
function SiparisFormu(){
    const history = useHistory();
    const {register,handleSubmit,watch,formState:{isValid, errors}} = useForm({
        mode:"onChange",
        defaultValues:{malzemeler:[]}
    });
    const seciliMalzemeler = watch("malzemeler");
     const BASE_PRICE = 85.50;
    const INGREDIENT_PRICE = 5;
    const [adet, setAdet] = useState(1);
    const secimlerTutari = seciliMalzemeler.length * INGREDIENT_PRICE;
    const toplamTutar = (BASE_PRICE + secimlerTutari) * adet;
    const handleArttir = () => setAdet(adet + 1);
    const handleAzalt = () =>{
     if(adet > 1) setAdet(adet - 1);
    };
    const onSubmit = (data) => {
const payload = {
isim: data.isim,
boyut: data.boyut,
hamur: data.hamur,
malzemeler: data.malzemeler,
ozel: data.notlar,
adet: adet
};
axios.post("https://reqres.in/api/pizza",payload,{
    headers:{'x-api-key': 'free_user_3Ct13oENFI8ABP6d8BWp3cYVXiI'}
})
.then((response)=>{
    console.log("Sipariş Başarıyla Alındı! Gelen Yanıt:", response.data);
    history.push({
        pathname: "/Onay",
        state: {siparisBasarili: true}
    });
})
.catch((error)=>{
    console.error("Sipariş gönderilirken hata oluştu:", error);
    toast.error("Sipariş gönderilirken bir hata oluştu!");
});
    };

    return (
    <>
    <Header/>
    <PageContainer>
        <section aria-label="Ürün Özeti">
    <TitleContainer data-cy="pizza-baslik">Position Absolute Acı Pizza</TitleContainer>
    <PriceAndRatingRow>
        <Price> 85.50₺ </Price>
        <RatingGroup>
            <span>4.9</span>
            <span>(200)</span>
        </RatingGroup>
    </PriceAndRatingRow>
    <ExplanationPizza>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.</ExplanationPizza>
        </section>
        <PizzaForm onSubmit={handleSubmit(onSubmit)}>
            <OptionsRow>
            <StyledFieldset>
                <StyledLegend>Boyut Seç <RequiredStar>*</RequiredStar>  </StyledLegend>
                {BOYUTLAR.map((boyut)=>(
                <OptionLabel htmlFor={`${boyut.id}-boyut`} key={boyut.id}>
                    <StyledInput id={`${boyut.id}-boyut`} type="radio" value={boyut.value} data-cy={`${boyut.value}-boyut`} {...register("boyut", {required:true })} /> {boyut.label}
                </OptionLabel>
                ))}
                
            </StyledFieldset>
            <HamurSelectGroup>
             <StyledLabel htmlFor="hamur-select">
               Hamur Seç <RequiredStar>*</RequiredStar>
             </StyledLabel>
             <StyledSelect id="hamur-select" defaultValue="" data-cy="hamur-secimi" {...register("hamur",{required: true})}>
                <option value="" disabled>Hamur Kalınlığı </option>
                {HAMURLAR.map((hamur)=>(
                <option key={hamur.value} value={hamur.value}>{hamur.text} </option>
                ))}
             </StyledSelect>
             
            </HamurSelectGroup>
            </OptionsRow>
    <WideFieldset>
<StyledLegend $mb="0px">Ek Malzemeler</StyledLegend>
<SectionSubText>En az 4, en fazla 10 malzeme seçmelisiniz. Her bir malzemenin fiyatı: 5₺</SectionSubText>
<CheckboxGrid>
    {MALZEMELER.map((malzeme)=>(
        <CheckboxLabel htmlFor={`malzeme-${malzeme}`} key={malzeme}>
    <input
    id={`malzeme-${malzeme}`}
    type="checkbox"
    value={malzeme}
    disabled={seciliMalzemeler.length >= 10 && !seciliMalzemeler.includes(malzeme)}
    data-cy={`malzeme-${malzeme}`}
    {...register("malzemeler",{
        validate: (value)=> value.length >=4 && value.length <=10 || "En az 4, en fazla 10 malzeme seçebilirsiniz."
    })}
     /> {malzeme}
        </CheckboxLabel>
    ))}
</CheckboxGrid>
{errors.malzemeler && <ErrorMessage>{errors.malzemeler.message}</ErrorMessage>}
    </WideFieldset>
    <WideFieldset>
        <StyledLegend $mb="0px" htmlFor="isim-input">Adınız Soyadınız <RequiredStar>*</RequiredStar> </StyledLegend>
        <TextInput 
    id="isim-input"
    type="text"
    data-cy="isim-input"
    placeholder="Lütfen adınızı ve soyadınızı giriniz (Toplam En az 5 karakter)"
    {...register("isim",{
         required: "Ad-Soyad alanı boş bırakılamaz.",  
         minLength: {value:5, message: "Ad ve Soyad toplam en az 5 karakter olmalıdır." } 
        })}
        />
        {errors.isim && <ErrorMessage>{errors.isim.message}</ErrorMessage>}
    </WideFieldset>
    <WideFieldset>
        <StyledLegend htmlFor="notlar-input">Sipariş Notu</StyledLegend>
        <TextArea 
        id="notlar-input"
        data-cy="notlar-input"
        placeholder="Siparişine eklemek istediğin bir not var mı?"
        {...register("notlar")}
        />
        <HorizontalLine />
    </WideFieldset>
    <BottomBasketRow>
        <CounterWrapper aria-label="Sipariş adeti ayarlama alanı">
            <CounterBtn type="button" onClick={handleAzalt} aria-label="Pizza adetini bir azalt"> - </CounterBtn>
            <CounterValue aria-live="polite" aria-label={`Seçilen pizza adeti ${adet}`} data-cy="counter-value">{adet}</CounterValue>
            <CounterBtn type="button" onClick={handleArttir} aria-label="Pizza adetini bir arttır" data-cy="counter-arttir"> + </CounterBtn>
        </CounterWrapper>

    <SummaryCard>
        <SummaryContent>
         <SummaryTitle> Sipariş Toplamı </SummaryTitle>
         <SummaryLine>
           <span>Seçimler</span>
           <span>{secimlerTutari.toFixed(2)}₺</span>
         </SummaryLine>
         <SummaryLine $isRed>
           <span>Toplam</span>
           <span>{toplamTutar.toFixed(2)}₺</span>
         </SummaryLine>
        </SummaryContent>

        <SubmitButton type="submit" data-cy="submit-button" disabled={!isValid}>
        SİPARİŞ VER
        </SubmitButton>
        </SummaryCard>
    </BottomBasketRow>
        </PizzaForm>
    </PageContainer>
    </>
    );
}
export default SiparisFormu;
