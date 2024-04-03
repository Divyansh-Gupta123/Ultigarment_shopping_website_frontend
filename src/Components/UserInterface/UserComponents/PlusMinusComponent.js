import { useEffect,useState } from "react";
import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Button,Avatar } from "@mui/material";

export default function PlusMinusComponent(props){
    const[ Value,setValue]=useState(0)

    const onclick=()=>{
      var v=Value;
      v++
      setValue(v)
      props.onChange(Value)
      
    }
    const handleMinus=()=>{
        var v=Value;
        if(v>=1){
        v--
        setValue(v)
        props.onChange(Value)
        }
       
      }
    
    const handlePlus=()=>{
        var v=Value;
        if(v<=4){
        v++
        setValue(v)
        props.onChange(Value)
        }
       
      }
    return(<div>
    { Value==0? <Button  onClick={onclick}  style={{backgroundColor:'#12CBC4',fontWeight:'bold',fontSize:20}} variant="contained" fullWidth><ShoppingCart/>ADD To Cart</Button>:<div style={{display:'flex',width:120,alignItems:'center',justifyContent:'space-between'}}><Avatar onClick={handlePlus}  sx={{ bgcolor: '#12CBC4'}} variant="circular">
 +
</Avatar><span style={{fontWeight:'bold',fontSize:20}}>{Value}</span><Avatar  onClick={handleMinus}  sx={{ bgcolor:'#12CBC4',fontWeight:'bold',fontSize:20}} variant='circular'>
 -
</Avatar></div>}
    </div>)
}