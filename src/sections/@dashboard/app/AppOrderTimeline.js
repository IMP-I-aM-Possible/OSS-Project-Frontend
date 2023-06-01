// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import server from '../../../_mock/server'
import { Box,Link } from '@mui/material';
import Label from '../../../components/label';
// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.nid} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------


function OrderItem({ item, isLast }) {
  const { expired_at, nid,name, updated_at } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (expired_at === null && 'success') ||
            (expired_at === 'order3' && 'error') ||
            'error'
          }
        />
        
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box component="img" src={server.ip + 'image/' + nid + '.jpg'} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography variant="subtitle2" noWrap>
        <Link color="inherit" underline="hover" onClick={() => { window.location.href = '/dashboard/productsdetail/' + nid }}>
          {name}
        </Link>
      </Typography>

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {fDateTime(updated_at)}
      </Typography>
    </Box>

  </Box>
</TimelineContent>
    </TimelineItem>
  );
}
