// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import server from '../../../_mock/server'
// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            // <Link  key={news.nid} style={{ textDecoration: "none" ,color: 'inherit' }} onClick={()=>{window.location.href="/dashboard/productsdetail/"+news.nid}}>
            <NewsItem key={news.nid} news={news} />
            /* </Link> */
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} onClick={() => {window.location.href="/dashboard/products"}}/>}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    nid: PropTypes.string,
    company: PropTypes.string,
    name: PropTypes.string,
    nutrient_info: PropTypes.object,
  }),
};

function NewsItem({ news }) {
  const { nid, company, name, nutrient_info } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2} key={nid}>
      <Box component="img" alt={name} src={server.ip+"image/"+nid+'.jpg'} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap onClick={()=>{window.location.href="/dashboard/productsdetail/"+news.nid}}>
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {company}
        </Typography>
      </Box>
    </Stack>
  );
}