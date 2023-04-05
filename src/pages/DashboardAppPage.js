import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
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

// ----------------------------------------------------------------------
const accessToken = ''
const score = 90

const dashchart=['비타민','비타민1','비타민2','비타민3','비타민','비타민','비타민','비타민','비타민','비타민','비타민'];


let widjetcolor1,widjetcolor4


export default function DashboardAppPage() {

  const [ id, setId ]= useState(sessionStorage.getItem("id"))
  const [loading, setLoading] = useState(false);
  const accessToken=sessionStorage.getItem("accessToken")
  const [ res, setres ]= useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
       var response =await axios.post(
        "http://192.168.1.9:3000/dashboard/app",{id},{headers:{
          authorization: accessToken
        }}
      );
      console.log(response.data)
      setres(response.data)
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
  if(loading==false){
    return("로딩중")
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          안녕하세요 {id}님 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="건강점수" total= {res.healthScore} color={widjetcolor1} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="먹고있는 영양소 수" total={res.countNutrient} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="영양제 수" total={res.countNutritional} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="위험해요" total={res.tmtl} color={widjetcolor4} icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={5.5}>
            <AppWebsiteVisits
              title="영양소 섭취량"
              subheader= {id+'님의 현재 영양제 섭취량입니다.'}
              userEating ={res.userEating}
              countNutrient={res.countNutrient}
              dailyEating={res.dailyEating}


              

            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="필수 영양소 섭취량"
              chartLabels={['비타민', '비타민', '비타민', '비타민', '비타민', '비타민']}
              chartData={[
                { name: id+'님 의 섭취량', data: [80, 50, 30, 40, 100, 20] },
                { name: '다른이용자평균', data: [20, 30, 40, 80, 20, 80] },
                { name: '권장 섭취량', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="섭취량 현황"
              chartData={[
                { label: '잘해요', value: 4344 },
                { label: '', value: 5435 },
                { label: '부족해요', value: 1443 },
                { label: '과해요', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="이런영양소 먹는걸 추천해요"
              subheader={id+"님을 위한 영양소 추천서비스에요"}
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="추천 영양제에요"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: dashchart[index],
                description: dashchart[index],
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>
      

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
