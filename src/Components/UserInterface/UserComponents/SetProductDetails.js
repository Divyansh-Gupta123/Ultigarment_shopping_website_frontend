import React, { useEffect, useState } from "react";
import { Grid, TextField ,Button} from "@mui/material";
import { color, fontWeight } from "@mui/system";
import SearchBar from "./SearchBar";
import MainBar from "./MainBar";
import DownBox from "./DownBox"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageSlider from "./ImageSlider";
import { useLocation } from "react-router";
import SizeChart from "./SizeChart";
import { useStyles } from "./SetProductDetailsCss";
import { getData , postData} from "../../Services/NodeServices";
import { serverURL } from "../../Services/NodeServices";
import PlusMinusComponent from "./PlusMinusComponent";
import ColorRadio from "./ColorRadio";
import { useDispatch } from "react-redux";

export default function SetProductDetails(props)
{ const classes=useStyles()  
 

    var location=useLocation()
    var product= location.state.product 
    console.log('proooooooops:',product) 
   
const[size,setsize]=useState([])
const[color,setColor]=useState([])

















const handleSize=(index)=>{


  var temp=size.map((item)=>{
    return {'size':item.size,'status':false}
  })
  
  
  temp[index].status=true
   
  setsize([...temp])
  FetchAllColor(temp[index].size)
  }



  const setSizeStatus=(sizes)=>{
    var sizesJson=[]
    sizes.map((item)=>{
     sizesJson.push({'size':item,'status':false})
     
  
    })
    return sizesJson
  
  }


const FetchAllColor=async(sizeIndex)=>{
    
    var result=await postData('userinterface/getcolor_by_size',{size:sizeIndex})
    var colorcode=JSON.parse(result.data[0].colorcode)

    setColor(colorcode)

} 

const fetchallsize=async()=>{
  var result=await postData('userinterface/getcolors_bysize_byproductid',{productid:product.productid})
   
  var sizes=result.data.map((item)=>{
          
    return {'size':item.sizeid,'status':true}  

    })
    setsize(sizes)
     

 }
useEffect(function(){
  fetchallsize()
},[])

const showSize=()=>{

  return size.map((item,i)=>{

    return(
       <div onClick={()=>handleSize(i)}    style={{border:item.status?'3px solid #51cccc':'1px solid #51cccc',width:40,height:40,borderRadius:30,textAlign:'center',margin:5}}><div style={{marginTop:5,cursor:'pointer',}}>{item.size}</div></div>
     )

  })

  }

  const handleqtyvalue=(value)=>{

   

  }

const showDetails=()=>{
    return(
           <Grid container>
            <Grid  item xs={6}  style={{marginTop:'1%',justifyContent:'center',alignItems:'center'}}>
                <ImageSlider/>
            </Grid>
            <Grid item xs={6} >
              <Grid style={{fontSize:28,fontWeight:'bold',marginTop:7}}>
                {product.productname}
              </Grid>
              <Grid >
              <div style={{fontSize:16,fontWeight:600,letterSpacing:1,marginTop:3}}>
                {product.offerprice>0 ? <> <span >&#8377; {product.offerprice}</span><span style={{textDecoration:'line-through',color:'red',marginLeft:7}}>&#8377; {product.price}</span><span style={{color:'green',marginLeft:4}}>save &#8377; {product.price-product.offerprice}</span></>:<>{product.price}</>}
            </div> 

              </Grid>
              <Grid>
                inclusive of all Taxes + Free Shipping
              </Grid>
              <Grid container style={{marginTop:'3%'}}>
         
              <Grid item xs={5}  style={{fontSize:23,color:'green'}}>
             SIZE CHART
              </Grid>
              <Grid item xs={10}  style={{display:'flex',flexDirection:'row'}} >
                
                {showSize()}
      
                </Grid>
              </Grid>
              <Grid item xs={10}  style={{fontSize:23,color:'green'}}>
                   <ColorRadio colors={color} /> 
              </Grid>

              <Grid style={{marginTop:'2%'}}>
                Qty :
               
              </Grid>
              
              <Grid container style={{marginTop:'2%'}} >
                <Grid item xs={5} >
                <PlusMinusComponent   onChange={(value)=>handleqtyvalue(value)}   />
                </Grid>
                <Grid item xs={1}>

                </Grid>
                
                <Grid item xs={5} >
                <Button  style={{backgroundColor:'#ea8685'}} variant="contained" fullWidth>BUY NOW</Button>
                </Grid>
              </Grid>
              <Grid item xs={11}  style={{marginTop:'2%'}}>
                <Button  style={{backgroundColor:'#12CBC4'}} variant="contained" fullWidth>CUSTOMIZE IT</Button>
            </Grid>
            <Grid>
                <h3>DELIVERY OPTIONS</h3>
               <Grid style={{border:'1px solid black',padding:3}}>
                    Enter your Pincode TO check the delivery time and free pick up options
                <div>
                    <input type="text" placeholder="Enter Pincode"/>
                  </div>
                  <div style={{marginTop:"1%", fontWeight:'bolder'}}>
                    Cash On Delivery
                  </div>
                  <div style={{marginTop:"1%", fontWeight:'bolder'}}>
                    Express Shipping
                  </div>
               </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
}



   const showproductDetail=()=>{
    return(<div>
            <div style={{marginTop:'5%', justifyContent:'center',textAlign:'center'}}>
        <div style={{fontSize:30,fontWeight:700,marginBottom:40,display:'flex',textAlign:'center',justifyContent:'center'}}>                                    Product Details</div>
        </div>
        <Grid style={{display:'flex',alignItem:'center',justifyContent:'center'}} container spacing={2}>
        <div style={{padding:25,}}>
            
        <Grid item xs={3}>
            <div style={{background: '#f5f5f5',width:300,height:300,padding:25,}}>
            <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center',marginBottom:20}}>Product Highlights</div>
            <div>
            <table>
                <tr>
                    <th>Fabric:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;NS Crush Lycra</td>
                </tr>
                <tr>
                    <th>Collar Type:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Mock Collar</td>
                </tr>
                <tr>
                    <th>Pattern:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Solid</td>
                </tr>
                <tr>
                    <th>Fit:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Regular-fit</td>
                </tr>
                <tr>
                    <th>Pocket:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;2 Side Pockets</td>
                </tr>
                <tr>
                    <th>Purpose: </th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Moderate Winter</td>
                </tr>
            </table>
            </div>
            </div>
            
        </Grid>
        </div>
        <div style={{padding:25,}}>
        <Grid item xs={3}>
        <div style={{background: '#f5f5f5',padding:25,width:300,height:300}}>
        <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center'}}>Product Description</div>
         <ul type="disc">
            <li>95% Nylon, 5% Lycra - durable fabric & resists you from the extreme cold winds</li>
            <li>Side Pockets - you can actually use to warm your hands & keeping the essentials</li>
            <li>Interior Hem Drawcord - fully adjustable lower hem to prevent from cold</li>
            <li>Elasticated Cuffs - can be pulled-up to assist in keeping heat from escaping</li>  
        </ul>
        </div>
        </Grid>
        </div>
        <div style={{padding:25,}}>
        <Grid item xs={3}>  
        <div style={{background: '#f5f5f5',padding:25,width:300,height:300}}>
        <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center'}}>Delivery & Return Policy</div>  
        We provide free shipping on all orders. Pay online to avoid charges of ₹50/product applicable
         on COD orders. The return or exchange can be done within 15 days after delivery. Every delivery
          from Beyoung is processed under excellent condition and in the fastest time possible. For our 
          beloved customer’s care, we give contactless delivery. Refer to FAQ for more information.
          </div>
        </Grid>
        </div>

        
        </Grid>
   </div>
   
   );
   }
     return(<div>
        <SearchBar/>
        <div>
        <MainBar/>
        </div>
        <div>
        {showDetails()}
        </div>
        <div style={{marginTop:'5%'}}>
        {showproductDetail()}
        </div>
        
        <DownBox/>

    
    </div>)
}