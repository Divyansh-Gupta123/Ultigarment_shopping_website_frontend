import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../Services/NodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createRef } from "react";




export default function ShowSlider(props){
    var mySlider=createRef()
 
  
   


  const setImageBanner=()=>{
    return props.images.map((item)=>{
      return(<div>
       <img src={`${serverURL}/images/${item}`} width="100%"/>
      </div>)
    }) 
   }

   const handleBackBanner=()=>{

         mySlider.current.slickNext()

    }
    const handleforwardBanner=()=>{
        mySlider.current.slickPrev()
    }

    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


    return(
        <div>
          {matches?<></>:
        <div style={{display:"flex",alignItems:'center', position:'absolute',zIndex:1,top:'40%',backgroundColor:'black', borderRadius:360,left:20,height:40,width:40,justifyContent:"space-around"}}>
        
        <ArrowBackIosNewIcon  style={{color:'white'}} onClick={()=>handleBackBanner()}/></div>}
        <Slider {...props.bannersettings}  ref={mySlider} >
         {setImageBanner()}
        </Slider>
        {matches?<></>:
        <div  style={{display:"flex",alignItems:'center', position:'absolute',zIndex:1,top:'40%',backgroundColor:'black', borderRadius:360,left:'95%',height:40,width:40,justifyContent:"space-around"}}>
        <ArrowForwardIosIcon  style={{color:'white'}} onClick={()=>handleforwardBanner()}/>
        </div>}
   </div>
   )
  }