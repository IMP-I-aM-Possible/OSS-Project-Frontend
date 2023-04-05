import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import StarRatings from 'react-star-ratings';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  console.log(product)
  const { company, name, rating, id,iherb_price,naver_price} = product;
  const price = Math.min(iherb_price,naver_price)
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={'http://210.119.32.156:3000/image/'+id+'.jpg'} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
      <Link color="inherit" underline="hover">
          <Typography variant="caption" color='gray'noWrap>
            {company}
          </Typography>
        </Link>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" >
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >                    
            </Typography>
            <Typography variant="caption">
            <StarRatings
            rating={rating}
            starRatedColor='#FFD400'
            numberOfStars={5}
            name='rating'
            starDimension="1em"
            starSpacing="0.001em"
            />   
            {' '}
            ({rating}/5)
            </Typography>
            &nbsp;
            {fCurrency(price)}원
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
