import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import server from '../_mock/server'
// sections
import {
  NutriRecommend,
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,

} from '../sections/@dashboard/app';
import { fetchMain } from 'src/servies';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setId } from '../store/reducers/id';
import { setDATA } from '../store/reducers/maindata';
import Loading  from 'src/Loading';

// ----------------------------------------------------------------------
const accessToken = ''
const score = 90

const neednut =['비타민A', '비타민D', '비타민C', '칼슘', '아연', '마그네슘']

let widjetcolor1,widjetcolor4
function getDaysPassed(startDate) {
  const today = new Date();
  const start = new Date(startDate);
  
  // 밀리초 단위로 시간 차이 계산
  const timeDiff = today.getTime() - start.getTime();
  
  // 일 단위로 시간 차이를 변환
  const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));

  return daysPassed;
}
const startDate = '2023-05-01';

export default function DashboardAppPage() {

  const [ uid, setIud ]= useState(sessionStorage.getItem("uid"))
  const [loading, setLoading] = useState(false);
  const accessToken=sessionStorage.getItem("accessToken")
  const [ res, setRes ]= useState(false)
  const [recommendNutrientData,setrecommendNutrientData] = useState()
  const [recommendNutrientData1,setrecommendNutrientData1] = useState()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
       var response =await axios.post(
        server.ip+"dashboard/app",{uid},{headers:{
          authorization: accessToken
        }}
      );
      console.log(response.data)
      setRes(response.data)
      
      console.log(res)
      const recommendedData = response.data.recommendNutrient.map(nutrient => {
        const nutrientData = response.data.dailyEating.find(item => item.nutrient_name === nutrient);
        return [nutrientData.nutrient_name, nutrientData.commend, nutrientData.unit];
      });
      setrecommendNutrientData(recommendedData)
      
      const formattedData = response.data.recommendNutritional.map((item) => {
      const {nid, company, name, nutrient_info} = item;
      return {nid, company, name, nutrient_info};
      });
      setrecommendNutrientData1(formattedData)
      console.log(formattedData)
      setLoading(true);

    };
    fetchData();
  }, []);

if(res.healthScore>=70){
    widjetcolor1="info"
 }
 else if(res.healthScore>=40){
   widjetcolor1="warning"
 }
 else{
    widjetcolor1="error"
 }
if(res.tmtl ==0){
  widjetcolor4 = 'info'
}
else{
  widjetcolor4="error"
}
  const theme = useTheme();
  if(res==false){
    return(
      <Loading/>
    )
  }
  console.log(res)

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          안녕하세요 {uid}님 
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {console.log(res)}
            <AppWidgetSummary title="건강점수" total= {res.healthScore==null?0:res.healthScore} color={widjetcolor1} icon={'circum:pill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="먹고있는 영양소 수" total={res.countNutrient==null?0:res.countNutrient} color="info" icon={'uil:cell'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="영양제 수" total={res.countNutritional==null?0:res.countNutritional} color="warning" icon={'mdi:bottle-plus-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="위험해요" total={res.tmtl==null?0:res.tmtl} color={widjetcolor4} icon={'ion:warning-outline'} />
          </Grid>
          {res.countNutritional>0&&(
          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="영양소 섭취량"
              subheader= {uid+'님의 현재 영양제 섭취량입니다.'}
              userEating ={res.userEating}
              countNutrient={res.countNutrient}
              dailyEating={res.dailyEating}


            />
          </Grid>
          )}
          {res.countNutritional>0&&(
          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject
              title="필수 영양소 섭취량"
              chartLabels={neednut}
              chartData={[
                { name: '권장 섭취량', data: [100, 100, 100, 100, 100, 100] },
                { name: '다른이용자평균', data: [80, 40, 90, 80, 70, 60] },
                { name: uid+'님 의 섭취량', data:neednut.map(nutrient => {
                  const { eating, commend } = res.userEating[nutrient]==undefined?{eating:"0",commend:"1"}:res.userEating[nutrient]
                  console.log(eating/commend);
                  return eating/commend*100>100?100:eating/commend*100
                }) },
                
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>)}

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="영양소 섭취 현황판"
              subheader={uid+"님의 영양소 섭취 현황입니다."}
              userEating={res.userEating}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <NutriRecommend
              title="추천 영양소"
              subheader={uid+"님의 추천 영양소 입니다."}
              recommendNutrientData={recommendNutrientData}
            />
          </Grid>

          

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="추천 영양제에요"
              subheader={uid+"님꼐 맞춤형 영양제에요"}
              list={recommendNutrientData1}
              title2="이것도 먹어보세요"
              subheader2={uid+"님이 섭취하지않고있는 영양소에요"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="최근 영양제 기록"
              subheader={uid+"님의 기록이에요"}
              list={res.log}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="우리 사이트는요..."
              list={[
                {
                  name: '사용자와',
                  value: `${res.people} 명의`,
                  icon: <Iconify icon={'pepicons-print:people'} color="#1877F2" width={32} />,
                },
                {
                  name: '영양제랑',
                  value: 1001,
                  icon: <Iconify icon={'mdi:pill'} color="#DF3E30" width={32} />,
                },
                {
                  name: '영양소랑',
                  value: 42,
                  icon: <Iconify icon={'uil:cell'} color="#006097" width={32} />,
                },
                {
                  name: '일 동안 함께했어요',
                  value: getDaysPassed(startDate),
                  icon: <Iconify icon={"streamline:interface-calendar-blank-calendar-date-day-month"} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>
    
        </Grid>
      </Container>
    
    </>
  );
}
