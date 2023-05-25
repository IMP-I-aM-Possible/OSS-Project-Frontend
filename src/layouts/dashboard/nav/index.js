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
import TextField from '@mui/material/TextField';
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
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages(inputText);
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
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {useSelector((state) => state.id.id)}
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
          <Typography sx={{ml:1,mt:0.5,mr:1}}variant="subtitle2" >
            {"비타민 C와 비타민 D는 둘 다 중요한 영양소이지만, 그들은 서로 다른 기능과 특징을 가지고 있습니다.기능:비타민 C: 비타민 C는 항산화 작용을 통해 자유 라디칼을 중화시키고 세포 손상을 예방하는 역할을 합니다. 또한 콜라겐 생성을 촉진하여 피부, 연조직, 혈관, 뼈 등의 건강을 유지하는데 중요한 역할을 합니다. 비타민 C는 또한 철 흡수를 돕고 면역 체계를 강화하는 데에도 기여합니다.비타민 D: 비타민 D는 칼슘과 인의 흡수와 이용에 필수적입니다. 이는 뼈 건강을 유지하고 성장과 발달에 중요한 역할을 합니다. 비타민 D는 또한 면역 체계의 기능을 조절하고 염증을 감소시키는 데에도 기여합니다."}
          </Typography>
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
