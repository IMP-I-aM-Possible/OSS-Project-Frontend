import React, { useEffect } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
const Chart = (props) => {
  const viewportWidth = window.innerWidth;
  const theme = useTheme();
  const convertUnit = (value, fromUnit, toUnit) => {
    
    const unitConversion = {
      μg: { μg: 1, mg: 1000, g: 1000000, mcg: 1 },
      mg: { μg: 0.001, mg: 1, g: 1000, mcg: 0.001 },
      g: { μg: 1e-6, mg: 0.001, g: 1, mcg: 1e-6 },
      mcg: { μg: 1, mg: 1000, g: 1000000, mcg: 1 },
    };
  
    if (fromUnit === toUnit) return value;
  
    const conversionRate = unitConversion[toUnit][fromUnit];

    console.log(value * conversionRate)
    return value * conversionRate;
  };
  
  function barColor(value1, value2) {
    if (value1 > value2) {
      return 'red';
    } else if (value1 < value2/2) {
      return theme.palette.warning.main;  
    }else if (value1 >= value2/2 && value1 < value2) {
      return 'blue';
    }
    else {
      return theme.palette.primary.main;
    }
  }
  console.log(props.commend,props.unit)
  function formatDataWithUnit(data) {
    const units = ['mcg', 'mg', 'g']; // 단위 배열 (빈 문자열부터 T까지)
  
    let unitIndex = 0;
    while (data > 1000 && unitIndex < units.length - 1) {
      // 데이터가 1000 이상일 때와 단위 배열의 범위 내에 있는 동안 반복
      data /= 1000;
      unitIndex++;
    }
  
    return {
      value: data, // 소수점 두 자리까지 표시 (필요에 따라 조정 가능)
      unit: units[unitIndex],
    };
  }
  const { value, unit } = formatDataWithUnit(props.filledSize);
  const convertedValue = convertUnit(Number(value), unit, props.unit);
  const relativeValue = convertedValue / props.commend;
  const widthPercentage = relativeValue > 1 ? 1 : relativeValue;
  const barWidth = (60 * viewportWidth) / 100 < 600? `${60 * widthPercentage}vw`:`${600 * widthPercentage}px`;

  return (
    
    <div style={{ width:'100%',marginBottom:20,marginTop:20,marginRight:20,marginLeft:20  }}>
      <span style={{ marginRight: 2,marginLeft:10}}>{props.nname}</span>
      <div 
        style={{
          width: (60*viewportWidth)/100<600?"60vw":"600px",
          
          height: (4*viewportWidth)/100<30?"4vw":"30px",
          border: "1px solid black",
          borderRadius: "9px",
          position: "relative"
        }}
      >
        <div 
          style={{
            position: "absolute",
            width: barWidth,
            height: (4*viewportWidth)/100<30?"4vw":"30px",
            backgroundColor: barColor(props.filledSize, props.standard),
            borderRadius: "9px"
          }}
        />
        <div 
          style={{
            
            position: "absolute",
            top: 0,
            left: (20*viewportWidth)/100<200?"20vw":"200px",
            width: "1px",
            height: (4*viewportWidth)/100<30?"4vw":"30px",
            backgroundColor: "#f5f5f5"
          }}
        />
        <div 
          style={{
            
            position: "absolute",
            top: 0,
            left: (40*viewportWidth)/100<400?"40vw":"400px",
            width: "1px",
            height: (4*viewportWidth)/100<30?"4vw":"30px",
            backgroundColor: "#f5f5f5"
          }}
        />
        <span
          style={{display:"flex", position: 'absolute', left: (62*viewportWidth)/100<600?"62vw":"620px" }}
        >
          
          {value}
          {unit}
          
        </span>
      </div> 
    </div>
  );
};


export default Chart;
/*
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
  { name: 'Page A', ub: 300 },
  { name: 'Page B', ub: 400 },
  { name: 'Page C', ub: 500 },
  { name: 'Page D', ub: 600 },
  { name: 'Page E', ub: 700 },
  { name: 'Page F', ub: 800 }
];

function barColor(value) {
  if (value > 500) {
    return 'blue';
  } else if (value < 500) {
    return 'red';
  } else {
    return 'green';
  }
}

export default function Chart() {
  return (
    <BarChart width={1000} height={500} data={data} layout="vertical">
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      {Object.keys(data[0])
        .filter((key) => key.startsWith('ub'))
        .map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={ barColor('ub')}
            barSize={30}
          />
        ))}
    </BarChart>
  );
}
*/