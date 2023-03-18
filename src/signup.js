import * as React from 'react';
import { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Person from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchSignup,fetchcheckId,fetchcheckUsername,fetchcheckEmail} from "./servies";
import CheckIcon from '@mui/icons-material/Check';
import InputAdornment from '@mui/material/InputAdornment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignUp() {

  const [id,setid] = useState('');
  const [id_error,setid_error] = useState(false);
  const [id_message,setid_message] = useState('');
  const [id_check,setid_check] = useState('');


  const [username,setusername] = useState('');
  const [username_error,setusername_error] = useState(false);
  const [username_message,setusername_message] = useState('');
  const [username_check,setusername_check] = useState('');

  const [email,setemail] = useState('');
  const [email_error,setemail_error] = useState(false);
  const [email_message,setemail_message] = useState('');

  const [password,setpassword] = useState('');
  const [password_error,setpassword_error] = useState(false);
  const [password_message,setpassword_message] = useState('');

  const [confirmpassword,setconfirmpassword] = useState('');
  const [confirmpassword_error,setconfirmpassword_error] = useState(false);
  const [confirmpassword_message,setconfirmpassword_message] = useState('');

  const id_onChange = (e)=> {
    setid(e.target.value)
  }
  useEffect(() => {
  	if(id.length>0) {
    	id_validation();
    } 
  }, [id])
  async function id_onBlur(e){
    const req = {
      id
    };
    const checkreq = await fetchcheckId(req)
    console.log(checkreq)
    setid_check(checkreq)
    if (checkreq=='fail'){
      setid_error(true)
      setid_message('중복된아이디입니다.')
    } 

  }

  const id_validation =()=>{
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    console.log(id)
    if(check.test(id)){
      setid_error(true)
      setid_message("특수기호는 입력 하실 수 없습니다.")
      setid_check('fail')
    }
    else if(id.length<3 || id.length>25){
      setid_error(true)
      setid_message("5글자 이상 25글자 이하로 입력하십시오")
      setid_check('fail')
    }
    else{
      setid_error(false)
      setid_message('')
      setid_check('suceess')
    }
  }

  function idcheckicon() {
    if(id_check=='success'){
      return (<CheckIcon fontSize="small"/> )
    }
    else if (id_check=='fail'){
      return (<HighlightOffIcon fontSize="small"/>)
    }
    else{
      return('')
    }
  }


  const username_onChange = (e)=> {
    setusername(e.target.value)
  }
  useEffect(() => {
  	if(username.length>0) {
    	username_validation();
    } 
  }, [username])
  async function username_onBlur(e){
    const req = {
      username
    };
    const checkreq = await fetchcheckUsername(req)
    console.log(checkreq)
    setusername_check(checkreq)
    if (checkreq=='fail'){
      setusername_error(true)
      setusername_message('중복된아이디입니다.')
    } 

  }

  const username_validation =()=>{
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/;
    console.log(username)
    if(check.test(username)){
      setusername_error(true)
      setusername_message("특수기호나 한글은 입력 하실 수 없습니다.")
    }
    else if(username.length<3 || username.length>25){
      setusername_error(true)
      setusername_message("5글자 이상 25글자 이하로 입력하십시오")
    }
    else{
      setusername_error(false)
      setusername_message('')
    }
  }

  function usernamecheckicon() {
    if(username_check=='success'){
      return (<CheckIcon fontSize="small"/> )
    }
    else if (username_check=='fail'){
      return (<HighlightOffIcon fontSize="small"/>)
    }
    else{
      return('')
    }
  }

  const email_onChange = (e)=> {
    setemail(e.target.value)
    
  }
  useEffect(() => {
  	if(email.length>0) {
    	email_validation();
    } 
  }, [email])
  const email_onBlur = (e)=> {
    const req = {
      email
    };
    fetchcheckEmail(req)
  }

  const email_validation =()=>{
    let email_check = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    console.log(email)
    if(!email_check.test(email)){
      setemail_error(true)
      setemail_message("이메일의 형식이 올바르지 않습니다.")
    }

    else{
      setemail_error(false)
      setemail_message('사용가능한 이메일입니다.')
    }
  } 

  const password_onChange = (e)=> {
    setpassword(e.target.value)
    
  }
  useEffect(() => {
  	if(password.length>0) {
    	password_validation();
    } 
  }, [password])
  const password_onBlur = (e)=> {
    const req = {
      password
    };

  }

const password_validation =()=>{

  if(!/^[a-zA-Z0-9]{8,16}$/.test(password)){
  
    setpassword_message('숫자와 영문자 조합으로 8자리이상 사용해야 합니다.');
    setpassword_error(true)
 
  
  }
  
  
  
  var checkNumber = password.search(/[0-9]/g);
  
  var checkEnglish = password.search(/[a-z]/ig);
  
  if(checkNumber <0 || checkEnglish <0){
  
  setpassword_message("숫자와 영문자를 혼용하여야 합니다.");
  setpassword_error(true)

  }
  
  else if(/(\w)\1\1\1/.test(password)){
  
  setpassword_message('444같은 문자를 4번 이상 사용하실 수 없습니다.');
  setpassword_error(true)

  }
  
  else if(username.length>0 && password.search(username) > -1){
  
    setpassword_message("비밀번호에 아이디가 포함되었습니다.");
    setpassword_error(true)

  
  }
  else{
    setpassword_message("");
    setpassword_error(false)
  }
  }
  const confirmpassword_onChange = (e)=> {
    setconfirmpassword(e.target.value)
    
  }
  // useEffect(() => {
  // 	if(confirmpassword.length>0) {
  //   	confirmpassword_validation();
  //   } 
  // }, [confirmpassword])
  
  const confirmpassword_onBlur = (e)=> {
    confirmpassword_validation();
  }

  const confirmpassword_validation =()=>{
    if(!(confirmpassword==password)){
      setconfirmpassword_error(true)
      setconfirmpassword_message("비밀번호가 다릅니다.")
    }

    else{
      setconfirmpassword_error(false)
      setconfirmpassword_message('')
    }
  } 
  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const id = data.get('id')
      const username=data.get('username');
      const email=data.get('email');
      const pw=data.get('password');
  
    const req = {
        id,
        email,
        pw,
        username,
      };
    const signres = await fetchSignup(req);
    console.log(signres)
    if (signres=='success'){
      window.location.replace("/signuser?id="+id);  
    }
    console.log(req)
  };




  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
                <TextField
                  autoComplete="given-id"
                  name="id"
                  required
                  id="id"
                  label="아이디"
                  autoFocus   
                  fullWidth
                  value={id} 
                  onBlur={id_onBlur}
                  onChange={id_onChange}
                  error={id_error}
                  helperText={id_message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          {idcheckicon()}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  id="username"
                  label="닉네임"
                  autoFocus   
                  fullWidth
                  value={username} 
                  onBlur={username_onBlur}
                  onChange={username_onChange}
                  error={username_error}
                  helperText={username_message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          {usernamecheckicon()}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
                       
    
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email} 
                  onBlur={email_onBlur}
                  onChange={email_onChange}
                  error={email_error}
                  helperText={email_message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required 
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} 
                  onBlur={password_onBlur}
                  onChange={password_onChange}
                  error={password_error}
                  helperText={password_message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="비밀번호 재확인"
                  type="password"
                  id="confirmpassword"
                  value={confirmpassword} 
                  onBlur={confirmpassword_onBlur}
                  onChange={confirmpassword_onChange}
                  error={confirmpassword_error}
                  helperText={confirmpassword_message}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

///중복검사 전에 회원가입 규칙 작성
