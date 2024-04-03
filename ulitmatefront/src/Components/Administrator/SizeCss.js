import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

 export  const  useStyles = makeStyles({
  
     maincontainer:{
       width:'100wh',
       height:'100vh',
       background:'#f5f6fa',
       justifyContent:'center',
       display:'flex'
    },

    box:{ borderRadius:10,
        width:'50%',
        height:'50%',
        background:'white ',
        padding:'30px',
        marginTop:'4%'

    },
    heading:{
        fontSize:30,
        fontFamily:'inherit',
        fontWeight:'bolder',
     
       
    },
    images:{
         height:30,
         width:40,
         borderRadius:5 ,
         marginLeft:100,
        
        },
   
 
});