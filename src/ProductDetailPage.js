
import Container from '@mui/material/Container';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ThirdCard from './productComponent/ThirdCard'
import SecondCard from './productComponent/SecondCard'
import FirstCard from './productComponent/FirstCard'
import AlignItemsList from './productComponent/ReviewList'
import { useState, useEffect } from "react"
import axios from "axios"
//import ForthCard from './ForthCard'
import FifthCard from './productComponent/FifthCard'
import SixCard from "./productComponent/SixCard";
import {useRef } from 'react';
import server from './_mock/server'
import { useParams } from "react-router-dom";
export default function ProductDetail() {

  const [ id, setId ]= useState(sessionStorage.getItem("id"))
  const [loading, setLoading] = useState(false);
  const accessToken=sessionStorage.getItem("accessToken")
  const [ res, setres ]= useState(false)
  const{nid}= useParams()
   useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
       var response =await axios.get(
        server.ip+"nutritional/"+nid
      );
      console.log(response.data)
      setres(response.data)
      setLoading(true);
    };
    fetchData();
  }, []);

  if(loading==false){
    return("로딩중")
  }
  

  const nutrient = [];
  const sub_nutrient =[];

  for (const [key, value] of Object.entries(res.product.nutrient_info)) {
    nutrient.push({ nname: key, filledSize: value });
}

for (const [key, value] of Object.entries(res.product.sub_nutrient_info)) {
  sub_nutrient.push({ nname: key, size: value });
}


const compare=()=>{
  if(res.product.iherb_price>res.product.naver_price){
    return (parseInt(res.product.naver_price).toLocaleString())
  }else{
    return (parseInt(res.product.iherb_price).toLocaleString())
  }
}
const compare_link=()=>{
if(res.product.iherb_price>res.product.naver_price){
  return (res.product.naver_link)
}else{
  return (res.product.iherb_link)
}
}


  const handleReviewLinkClick = () => {
    window.location.href ="";
  };
 
  return (
      <Container sx={{mt:5}}>

        <Link size="large"  color="#78909c">{res.product.company}</Link>
        -
        <Link size="large"  color="#78909c" onClick={handleReviewLinkClick}>{res.product.name}</Link>
      

        <FirstCard 
          
          id ={res.product.nid}
          pimage ={server.ip+"image/"+res.product.nid+'.jpg'}
          pname ={res.product.name}
          pform ={res.product.company}
          prating ={res.product.rating}
          sname1 ={"iHerb"}
          price1 ={parseInt(res.product.iherb_price).toLocaleString()}
          plink1 ={res.product.iherb_link}
          sname2 ={"Naver"}
          price2 ={parseInt(res.product.naver_price).toLocaleString()}
          plink2 ={res.product.naver_link} 
          lowPrice ={compare()}
          lowPrice_link = {compare_link()}

        ></FirstCard>
   
        <Typography  sx={{mt:10,mb:5,fontSize:25}}  variant="h3">
        영양제 영양소 확인
        </Typography>
        <SixCard 
          vitamins={nutrient}
          sub_Vitamins={sub_nutrient}
        >
          
        </SixCard>
        <Typography  sx={{mt:10,mb:5,fontSize:25}}  variant="h3">
          제품 효과 
        </Typography>
   
        <Typography  sx={{mt:10,mb:5,fontSize:25}}  variant="h3">
          복용법
        </Typography>

        <ThirdCard 
        eat={res.product.daily_eating}
        caut={res.product.caution}>
      </ThirdCard>
        <Typography  sx={{mt:10,mb:5,fontSize:25}}  variant="h3">
          제품 리뷰
        </Typography>
        <AlignItemsList reviews={res.review}></AlignItemsList> 

        <Typography  sx={{mt:10,mb:5,fontSize:25}}  variant="h3">
          리뷰 작성
        </Typography>
        <FifthCard id={res.product.id}/>

      </Container>
  );
}