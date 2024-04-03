import React from "react";
import { TextField,Grid,Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { BoltRounded } from "@mui/icons-material";
import OtpComponent from "./OtpComponent";
import { hover } from "@testing-library/user-event/dist/hover";

export default function UserComponentpannel(){
  const[open,setopen]=useState();
  const[getopen,setotpopen]=useState();
  const handleOpen=()=>{
    setopen(true)
  }
  const handleClose=()=>{
    setopen(false)
  }


  const hadleopenotpdailog=()=>{
    setotpopen(true)
    
  }
  const handleotpdailogClose=()=>{
    setotpopen(false)
  }
const ShowSignUpDailog=()=>{
    return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
   
          <Grid item xs={12}>
            <img src='first.jpg'  width='100%' height='100%'/>

          </Grid>
          <Grid xs={12} style={{fontSize:20,fontWeight:'bold'}}>
        
           SignUP
      
          </Grid>
          <Grid  item xs={12} >
           <hr></hr>
          <TextField  fullWidth id="standard-basic" label=" your mobile no" variant="standard" type='number' />
          </Grid>

          <Grid item xs={12} style={{marginTop:'5%'}}>
          <Button onClick={hadleopenotpdailog} variant="contained" fullWidth  style={{backgroundColor:'green',color:'white' }}>GET AN OTP</Button>
          </Grid>
          <Grid item xs={12} style={{ fontSize:15,fontWeight:'bold',marginTop:'4%',cursor:'pointer'}}>
           Already have an account..? 
          </Grid>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    )
   
}


const ShowOtpDailog=()=>{

  return(
    <Dialog
        open={getopen}
        onClose={handleotpdailogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
   
          <Grid item xs={12}>
            <img src='second.jpg'  width='100%' height='100%'/>

          </Grid>
          <Grid item xs={12} style={{fontWeight:'bold',fontSize:22}}>
            Enter 4 Digit OTP -
         
            <OtpComponent/>

          </Grid>
          <Grid item xs={12} style={{marginTop:'5%'}}>
          <Button  variant="contained" fullWidth  style={{backgroundColor:'green',color:'white'}}>varify your code</Button>
          </Grid>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleotpdailogClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    )
      
}

    return(
           <div>
      <CoPresentIcon onClick={handleOpen}  />
            <div>
            {ShowSignUpDailog()}
            {ShowOtpDailog()}
           </div>
           </div>
    )
   
}