import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function AlignItemsList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const totalReviews = props.reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = props.reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Card sx={{ bgcolor: '#fafafa', p: 2 }}>
      {currentReviews.map((review) => (
        <Card
          key={review.usname}
          sx={{ ml: 5, mr: 5, mb: 5, mt: 5 }}
          component="div"
        >
          <ListItem component="div" alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={review.usname} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
  primary={review.usname}
  secondary={
    <>
      <Typography component="div">
        <Box
          component="div"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Rating
            component="div"
            name="text-feedback"
            value={review.rscore}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Box component="div" sx={{ ml: 2 }}>
            {labels[review.rscore]}
          </Box>
        </Box>
      </Typography>
      <Typography component="div">{review.text}</Typography>
    </>
  }
/>

          </ListItem>
        </Card>
      ))}
      <Container sx={{ width: "100%", display: 'flex', alignItems: 'center',justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Card>
  );
}