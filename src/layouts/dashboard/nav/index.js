import PropTypes from 'prop-types';
import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack ,List, ListItem, ListItemText, Card} from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import LottieData from '../../../_mock/rotie/chatbot.json';
import LottielodingData from '../../../_mock/rotie/chatbotloading.json';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import server from '../../../_mock/server'
// ----------------------------------------------------------------------

const NAV_WIDTH = 320;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LottieData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const defaultloadingOptions = {
  loop: true,
  autoplay: true,
  animationData: LottielodingData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');
  const [chatbotopen, setchatbotopen] = useState(false);
  const[chatbotres,setChatbotres]=useState([{}])
  const [loading,setLoading] = useState(false)
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const fetchData = async () => {
    setLoading(true);
    setChatbotres([{}]);
    const response = await axios.get(
      server.ip+"ask/chatbot/"+inputText
    );
    console.log(JSON.parse(response.data))
    setChatbotres(JSON.parse(response.data));
    setLoading(false);
  };

  console.log(useSelector((state) => state.id.id))
  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages(inputText);
      fetchData();
      setInputText('');
    }
    
  }
  const onClick = () =>{
    chatbotopen==true?setchatbotopen(false):setchatbotopen(true)
  }
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
          <Avatar icon={'bx:user'} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {sessionStorage.getItem("uid")}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
      
      <Card sx={{position:'fixed',bottom: 10,width:315,overflow:'auto'}} variant="outlined">
      <div onClick = {onClick}>
      <Lottie
        options={defaultOptions}
        height={60}
        width={30}
        isClickToPauseDisabled={true}
      />
      </div>
      {chatbotopen&&(
        <Stack alignItems="center" spacing={1} sx={{borderRadius: 2, position: 'relative' }}>
     
          <Box sx={{ p:1}}>
          <Typography variant="subtitle2" >
            {messages}
          </Typography>
          </Box>
          <Card sx={{height:200, width:290, overflow:'auto'}} variant="outlined">
          {loading&&(
          <Lottie
          options={defaultloadingOptions}
          height={100}
          width={100}
          isClickToPauseDisabled={true}
        />
          )}
         {chatbotres != '' && (
          <Typography sx={{ ml: 1, mt: 0.5, mr: 1 }} variant="subtitle2">
          {chatbotres[0].gpt_answer}
          </Typography>
)}

{chatbotres.map((item, index) => (
  <Link key={index} variant="subtitle2" sx={{ display: 'block' }} onClick={()=>{window.location.href="/dashboard/productsdetail/"+item.id}}>
    {item.name}
  </Link>
))}


          </Card>
          <Box>
          <TextField
          label="chat bot에 질문하세요"
          value={inputText}
          onChange={handleInputChange}
          multiline
          maxRows={3}
          sx={{flex:9}}
        />
          <Button sx={{height:'100%',bottom: -18,flex:1}} onClick={handleSendMessage} variant="contained" >
          전송
        </Button>
        </Box>
        </Stack>
        )}
      </Card>

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
