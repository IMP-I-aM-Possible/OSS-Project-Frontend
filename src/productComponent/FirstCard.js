import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { IconButton } from '@mui/material';
import StarRatings from 'react-star-ratings';
import {TextRating} from './TextRating'
import Iconify from '../components/iconify';
//import GutterlessList from './Rank'
//import BasicList from './CostRank'
import OutlinedButtons from './Button'
//05.18 변경
export default function FirstCard(props) {
    return (
        <Card sx={{mt:0,amt:10, backgroundColor: '#f5f5f5'}}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{mt:5,mr:3}}
          >
          <OutlinedButtons nid={props.id}></OutlinedButtons>
          </Box>
          
            <Grid container display="flex" justifyContent="center" >
            
            <Card display="flex" sx={{mt:0,mb:2,height: 400,minWidth:300, flex:4}} >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item  sx={{mt:3,mb:5,mr:0}} >
             <CardMedia 
              sx={{height: 350,width:300 }}
              image={props.pimage}
              />
              
            </Grid >
            </Grid>
            </Card>
            <Card  display="flex" sx={{mt:0,mb:2,height: 400, minWidth:300,flex:6}} >
            <Grid xs item  sx={{mt:1,ml:0,mr:0}}>
            <CardContent>
              <Typography variant="h4"  gutterBottom>
              {props.pname}
              </Typography>
              <Typography variant="body1"  gutterBottom noWrap>
              {props.pform}
              </Typography>
              <Grid container>
                <Grid item >
                <Typography variant="body2">
            <StarRatings
            rating={props.prating}
            starRatedColor='#FFD400'
            numberOfStars={5}
            name='rating'
            starDimension="1.3em"
            starSpacing="0.001em"
            />   
            {' '}
            ({props.prating}/5)
            </Typography>
              </Grid>
             
              
              <Grid item sx={{ml:2}} >
                <Link color="#7e57c2">리뷰</Link>
                </Grid>
                </Grid>
                <Grid container display="flex" justifyContent="center" sx={{mt:3}}>
                  <Grid container display="flex" justifyContent="flex-start" spacing={2}>
                    <Grid item>
                      <Typography variant="h4" component="div"  gutterBottom>
                         최저
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link color="inherit" underline="hover" onClick={() => { window.location.href = props.lowPrice_link }}>
                        <Typography variant="h4" component="div"  gutterBottom>
                         {props.lowPrice}&nbsp;원
                        </Typography>
                      </Link>
                    </Grid>
                </Grid>
                <Grid container display="flex" justifyContent="flex-start" sx={{mt:1}} spacing={2}>
                <Grid item>
              <Typography variant="h5" component="div"  gutterBottom>
                {props.sname1}
                 </Typography>
                 </Grid>
                
                <Grid item>
                      <Link color="inherit" underline="hover" onClick={() => { window.location.href = props.plink1 }}>
                        <Typography variant="h5" component="div"  gutterBottom>
                        {props.price1}&nbsp;원
                        </Typography>
                      </Link>
                    </Grid>
              </Grid>
              <Grid container display="flex" justifyContent="flex-start" spacing={2}>
                <Grid item>
              <Typography variant="h5" component="div"  gutterBottom>
                {props.sname2}
                 </Typography>
                 </Grid>
                
                <Grid item>
                      <Link color="inherit" underline="hover" onClick={() => { window.location.href = props.plink1 }}>
                        <Typography variant="h5" component="div" gutterBottom>
                        {props.price2}&nbsp;원
                        </Typography>
                      </Link>
                    </Grid>
              </Grid>
              </Grid>
 
            </CardContent>
          </Grid>
          </Card>
        

              </Grid>
        </Card>
       
    );
  }

 