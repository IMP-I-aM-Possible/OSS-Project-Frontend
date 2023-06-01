import Grid from '@mui/material/Grid';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useState} from 'react'
//import NightlightIcon from '@mui/icons-material/Nightlight';
//import Brightness5Icon from '@mui/icons-material/Brightness5';
import {BasicChips2} from './BasicChips'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
//import Divider from '@mui/material/Divider';

export default function ThirdCard(props) {
    return (
      <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Grid container>  
            <Grid item xs sx={{ml:1}}>
              <Typography  variant="h5" component="div"  gutterBottom>
                {"복용 용량"}
              </Typography>
            </Grid>
            
            <Grid item sx={{ml:3,mt:5,mb:2}}>
              <BasicChips2 times={props.eat} ></BasicChips2>
            </Grid>
            
          </Grid>
         
              <Card> 
          <Grid container>
          <Grid item>
          <Typography sx={{ml:1,mt:0.5}}variant="h5" component="div"  gutterBottom>
                {"주의 사항"}
              </Typography>
              </Grid>
              <Grid item sx={{ml:1,mt:0.7}}><WarningAmberIcon/></Grid>
              </Grid>
            <Typography  sx={{ml:2,mt:1,mr:2}}variant="h7" component="div"  gutterBottom>
                {props.caut}
              </Typography></Card>
        </CardContent>
      </Card>
    );
  }