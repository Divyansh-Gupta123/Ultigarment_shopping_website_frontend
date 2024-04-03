import React from "react";
import { useEffect,useState } from "react";
import { serverURL } from "../../Services/NodeServices";


export function SmallCardComponent(props){

     return props.data.map((items)=>{

    
   
        return(
            <div style={{margin:3,padding:2,position:'relative', width:270,height:300 }}>
                <img src={`${serverURL}/images/${items.picture}`} style={{width:'100%',height:'100%'}} />
                <div style={{zIndex:1,position:'absolute',color:'white',left:'25%',top:'90%',fontWeight:'bold',fontSize:20}} >{items.productname}</div>
            </div>
            
        )
    })
}