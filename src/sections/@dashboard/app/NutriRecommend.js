
import { Box, Card, CardHeader , Typography} from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
// ----------------------------------------------------------------------
const NutriRecommend = (props) => {
  console.log(props.recommendNutrientData)
  return (
    <Card >
      <CardHeader title={props.title} subheader={props.
        subheader} sx={{mb:1}}/>

      <Box sx={{ mx: 3 ,mb:2}} dir="ltr">

        {props.recommendNutrientData.map(([name, amount, unit], index) => (
            <Label color={'info'} key={index} style={{ fontSize: '1.3em', margin: '0.1em' }}>
              {`${name}: ${amount}${unit}`}
            </Label>
          ))}

      </Box>
      <CardHeader title={props.title2} subheader={props.
        subheader2} sx={{mb:1}}/>
    </Card>
  );
}


export default NutriRecommend