import{Grid, TextField} from '@mui/material';
import React,{useState} from 'react'; 

export default function OtpComponent(props){
   
  const handleTextOne=(event)=>{
     if(event.target.value.length==1)
   {   
        document.getElementById('textTwo').focus()}
    }

    const handleTextTwo=(event)=>{
        if(event.target.value.length==1)
        {  
           
            document.getElementById('textThree').focus()}
         }

    const handleTextThree=(event)=>{
        if(event.target.value.length==1)
        {  
            document.getElementById('textFour').focus()}
         }
       
    return(
        <div style={{width:300,padding:20}}>
        <Grid container spacing={2} >
            <Grid item xs={3}>
                <TextField id='textOne' style={{fontSize:30,fontWeight:'bold'}} onChange={handleTextOne} variant='outlined' />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textTwo' variant='outlined'  onChange={handleTextTwo} />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textThree' variant='outlined' onChange={handleTextThree}  />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textFour' variant='outlined' />
            </Grid>
        </Grid>
        </div>
    )
}