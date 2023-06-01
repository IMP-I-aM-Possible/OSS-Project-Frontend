import Lottie from 'react-lottie';
import LottieData from './_mock/rotie/loading.json';
import Box from '@mui/material/Box';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
const Loading= () => {
    return(
    <Box  display="flex" justifyContent="center"
    alignItems="center" sx={{height:"100%"}}>
        
        <Lottie
        options={defaultOptions}
        height={"10vw"}
        width={"30vw"}
        isClickToPauseDisabled={true}
      />
    </Box>
    )

}


export default Loading