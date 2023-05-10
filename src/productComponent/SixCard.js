import { Card } from '@mui/material';
import Chart from './Graph';
import Container from '@mui/material/Container';
import {useState} from 'react'
import Typography from '@mui/material/Typography';
export default function SixCard(props) {
  return (
    <Card sx={{mb: 5}}>
      <Container 
        key  = 'asd'
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 10
        }}
      >
        {props.vitamins.map((vitamin) => (
          <Chart 
            key={vitamin.nname}
            filledSize={vitamin.filledSize}
            standard={vitamin.standard}
            unit={vitamin.unit}
            nname={vitamin.nname}
            setFilledSize={vitamin.filledSize}
          />
        ))}
      </Container>
      <Typography sx={{ml:2,mt:2,mb:2,fontSize:20}}  variant="h3">
       보조 영양소 성분
      </Typography>
      {props.sub_Vitamins.map((sub_vitamin) => (
        <Typography sx={{ml:2,mt:2,mb:2,fontSize:15}}  variant="h3">
        {sub_vitamin.nname}: {sub_vitamin.size}
        </Typography>
         ))}
    </Card>
  );
}