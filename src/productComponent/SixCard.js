import { Card, Grid, Typography } from '@mui/material';
import Chart from './Graph';
import React from 'react';

export default function SixCard(props) {
  return (
    <Card sx={{ mb: 5, backgroundColor: '#f5f5f5' }}>
      <Grid container alignItems="center" justifyContent="center" mt={2} sx={{ overflow: 'auto' }}>
        <Grid item xs={12} sx={{ pr: 1 }}>
          <Card display="flex" sx={{ mt: 0, mb: 2, width: '100%', minWidth: 300 }}>
            <Grid container spacing={2}>
            {props.vitamins.map((vitamin, idx) => {
              const vitaminCommend = props.nutrientcommend[vitamin.nname];

        return (
          <Grid item key={idx} xs={12}>
            <Chart
              filledSize={vitamin.filledSize}
              nname={vitamin.nname}
              setFilledSize={vitamin.setFilledSize}
              commend={vitaminCommend?.commend}
              unit={vitaminCommend?.unit}
            />
          </Grid>
        );
      })} 
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ pl: 1 }}>
          <Card display="flex" sx={{ mt: 0, mb: 2, width: '100%', minWidth: 300 }}>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" gutterBottom sx={{ ml: 2 ,mt:1}}>
                  보조 영양소 성분
                </Typography>
              </Grid>
              {props.sub_Vitamins.map((sub_vitamin, idx) => (
                <Grid item key={idx} xs={12} sx={{ mb:1}}>
                  <Typography variant="body2" component="div" sx={{ ml: 2, lineHeight: '1.2' }}>
                    {sub_vitamin.nname}: {sub_vitamin.size}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}
