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
import { fetchSignuser,fetchcheckId,fetchcheckUsername,fetchcheckEmail} from "./servies";
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
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setid(params.get("id"));

        console.log("params.get('id') >>> ", id);
    }, [])

  const [height,setheight] = useState('');
  const [height_error,setheight_error] = useState(false);
  const [height_message,setheight_message] = useState('');
  const [height_check,setheight_check] = useState('');


  const [weight,setweight] = useState('');
  const [weight_error,setweight_error] = useState(false);
  const [weight_message,setweight_message] = useState('');
  const [weight_check,setweight_check] = useState('');

  const [gender,setgender] = useState('');
  const [gender_error,setgender_error] = useState(false);
  const [gender_message,setgender_message] = useState('');

  const [age,setage] = useState('');
  const [age_error,setage_error] = useState(false);
  const [age_message,setage_message] = useState('');


  const height_onChange = (e)=> {
    setheight(e.target.value)
  }
  useEffect(() => {
  	if(height.length>0) {
    	height_validation();
    } 
  }, [height])
  async function height_onBlur(e){

    console.log(height)

  }

  const height_validation =()=>{
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    console.log(height)
    if(check.test(height)){
      setheight_error(true)
      setheight_message("특수기호는 입력 하실 수 없습니다.")
      setheight_check('fail')
    }
    else if(height.length<1 || height.length>10){
      setheight_error(true)
      setheight_message("5글자 이상 25글자 이하로 입력하십시오")
      setheight_check('fail')
    }
    else{
      setheight_error(false)
      setheight_message('')
      setheight_check('suceess')
    }
  }

  function heightcheckicon() {
    if(height_check=='success'){
      return (<CheckIcon fontSize="small"/> )
    }
    else if (height_check=='fail'){
      return (<HighlightOffIcon fontSize="small"/>)
    }
    else{
      return('')
    }
  }


  const weight_onChange = (e)=> {
    setweight(e.target.value)
  }
  useEffect(() => {
  	if(weight.length>0) {
    	weight_validation();
    } 
  }, [weight])
  async function weight_onBlur(e){
    
    console.log(weight)
  }

  const weight_validation =()=>{
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/;
    console.log(weight)
    if(check.test(weight)){
        setweight_error(true)
        setweight_message("특수기호나 한글은 입력 하실 수 없습니다.")
    }
    else if(weight.length<1 || weight.length>25){
        setweight_error(true)
        setweight_message("5글자 이상 25글자 이하로 입력하십시오")
    }
    else{
        setweight_error(false)
        setweight_message('')
    }
  }

  function weightcheckicon() {
    if(weight_check=='success'){
      return (<CheckIcon fontSize="small"/> )
    }
    else if (weight_check=='fail'){
      return (<HighlightOffIcon fontSize="small"/>)
    }
    else{
      return('')
    }
  }

  const gender_onChange = (e)=> {
    setgender(e.target.value)
    
  }
  useEffect(() => {
  	if(gender.length>0) {
    	gender_validation();
    } 
  }, [gender])
  const gender_onBlur = (e)=> {
    console.log(gender)
  }

  const gender_validation =()=>{
    let gender_check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/;
    console.log(gender)
    if(!gender_check.test(gender)){
      setgender_error(true)
      setgender_message("이메일의 형식이 올바르지 않습니다.")
    }

    else{
      setgender_error(false)
      setgender_message('사용가능한 이메일입니다.')
    }
  } 

  const age_onChange = (e)=> {
    setage(e.target.value)
    
  }
  useEffect(() => {
  	if(age.length>0) {
    	age_validation();
    } 
  }, [age])
  const age_onBlur = (e)=> {
    console.log(age)
  }

  const age_validation =()=>{
    let age_check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/;
    console.log(age)
    if(!age_check.test(age)){
      setage_error(true)
      setage_message("이메일의 형식이 올바르지 않습니다.")
    }

    else{
      setage_error(false)
      setage_message('사용가능한 이메일입니다.')
    }
  } 
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const height = data.get('height')
      const weight=data.get('weight');
      const gender=data.get('gender');
      const age=data.get('age');
  
    const req = {
        id,
        height,
        weight,
        gender,
        age,
      };
    fetchSignuser(req);
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
                  name="height"
                  required
                  id="height"
                  label="키"
                  autoFocus   
                  fullWidth
                  value={height} 
                  onBlur={height_onBlur}
                  onChange={height_onChange}
                  error={height_error}
                  helperText={height_message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          {heightcheckicon()}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="weight"
                  required
                  id="weight"
                  label="몸무게"
                  autoFocus   
                  fullWidth
                  value={weight} 
                  onBlur={weight_onBlur}
                  onChange={weight_onChange}
                  error={weight_error}
                  helperText={weight_message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          {weightcheckicon()}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
                       
    
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="성별"
                  name="gender"
                  value={gender} 
                  onBlur={gender_onBlur}
                  onChange={gender_onChange}
                  error={gender_error}
                  helperText={gender_message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required 
                  fullWidth
                  name="age"
                  label="나이"
                  type="age"
                  id="age"
                  value={age} 
                  onBlur={age_onBlur}
                  onChange={age_onChange}
                  error={age_error}
                  helperText={age_message}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              다입력했어요
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  건너뛰기
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