
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
// ----------------------------------------------------------------------
const AppConversionRates = (props) => {
  console.log(props.userEating)
  return (
    <Card >
      <CardHeader title={props.title} subheader={props.subheader} sx={{mb:1}}/>

      <Box sx={{ mx: 3 ,mb:2}} dir="ltr">
      {Object.entries(props.userEating).map(([key, value]) => {
    const { eating, commend, max, unit } = value;
    let color;

    if (eating > commend && max && eating > max) {
      color = 'error';
    } else if (eating > commend) {
      color = 'success';
    } else {
      color = 'warning';
    }

    return (
      <Label color={color} key={key} style={{ fontSize: '1em', margin: '0.08em' }}>
        {`${key}:${eating}${unit}`}
      </Label>
    );
  })
}

      </Box>
    </Card>
  );
}


export default AppConversionRates