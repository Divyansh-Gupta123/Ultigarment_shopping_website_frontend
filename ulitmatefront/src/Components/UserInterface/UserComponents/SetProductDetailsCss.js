import { createStyles, makeStyles } from '@mui/styles';
import { color } from '@mui/system';

export const useStyles = makeStyles({

    container:{
      width: '50%',
      height:'auto',
      background: '#fff', 
      display:'flex',
      justifyContent:'center',
      alignItem:'center'
    },
    box:{
      
    },
  
      heading1:{
          marginTop: '8%',
          fontWeight:700 ,
          fontSize:20 ,    
      },
     
     
      center: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      },
  
      favIcon:{
          position:'relative',
           top:2,
          cursor:'pointer',
          marginTop: '8%',
          
      },
  
      price:{
          fontWeight:700 ,
          fontSize:18 ,
      },
  
      size:{
          fontWeight:450 ,
          fontSize:18 ,  
      },
  
      sizeChart:{
          fontWeight:600 ,
          fontSize:18 , 
          color:'#51CCCC' 
      },
  
      selectionSize:{
      display:'inline-block',
      height: '47px',
      width: '47px',
      textAlign: 'center',
      fontSize: '13px',
      lineHeight: '45px',
      marginRight: '5px',
      cursor: 'pointer',
      border: '1px solid #ddd',
      borderRadius: '50px',
      },
  
      qty:{
          display:'inline-block',
          fontWeight:450 ,
          fontSize:18 , 
          position:'relative',
          top:12 ,
      
      },
  
      btncard:{
          display:'flex',
          background:'#51cccc',
          textAlign:'center',
          justifyContent:'center',
          padding:10,
          borderRadius:5,
          cursor:'pointer'
      },
  
      btnBuy:{
          display:'flex',
          background:'#ffb8b8',
          textAlign:'center',
          justifyContent:'center',
          padding:10,
          borderRadius:5,
          cursor:'pointer'
      },
  
      payment:{
          display:'flex',
          textAlign:'center',
          marginTop:10,
          fontWeight:500,
          fontSize:14
      }
  
  
  })  