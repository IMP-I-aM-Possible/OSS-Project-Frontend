import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppWebsiteVisits({ title, subheader, userEating,countNutrient,dailyEating,...other }) {
  const numchart = []
  for(let i=0; i<countNutrient; i ++){
    numchart.push(i)
    if(i==5){
      break
    }
  }
  console.log(numchart)
  const theme = useTheme();
 
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '50%' } },
    xaxis: { type: 'str' },
    yaxis: {
      show: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y} mg`;
          }
          return y;
        },
      },
    },
    chart: {
      
      
  },
    legend: {
      show:false,
      customLegendItems: ["이동욱","바보"],
      markers: {
        fillColors: [theme.palette.primary.main,theme.palette.error.main],
      },
    },
    xaxis:{
      labels:{
        style:{
          fontSize:'15px'
        }

      }
      
    }
    

    
  });
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const name=shuffleArray(Object.keys(userEating))

  
  function chartdata(name,eating,commend,max){
  let goal=0
  if (max==null){
      max=0;    
    }
  
  if (max==0 || max>eating*2){
    goal=[{
      name: '권장량',
      value:  commend,
      strokeHeight: 5,
      strokeColor: theme.palette.warning.main

    }]}
  else{
    goal=[{
      name: '상한량',
      value: max,
      strokeHeight: 5,
      strokeColor: theme.palette.error.main
    },
    {
      name: '권장량',
      value:  commend,
      strokeHeight: 5,
      strokeColor: theme.palette.warning.main
    }]
  }

  return(
  {
    x:name,
    y:eating,
    goals: 
      goal

  }
  )
}


    function chartdata1(name,eating,commend,max){
    return(
        [{
          name: '섭취량',
          type: 'column',
          fill: 'solid',
          data: [
          chartdata(name,eating,commend,max),
        ]
        }]  
    )
  }


  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
  
      <Box sx={{ p: 3, pb: 3 }} dir="ltr" style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {numchart.map((item) => (
            <ReactApexChart
              type="bar"
              key={name[item] + 'chart'}
              series={chartdata1(name[item], Number(userEating[name[item]].eating), Number(userEating[name[item]].commend), Number(userEating[name[item]].max))}
              options={chartOptions}
              height={364}
              width={100}
            />
          ))}
        </div>
      </Box>
    </Card>
  );
}
