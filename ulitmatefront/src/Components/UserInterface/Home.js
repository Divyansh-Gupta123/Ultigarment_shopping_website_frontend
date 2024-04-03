import React, { useEffect, useState } from "react";
import { getData, postData } from "../Services/NodeServices";
import MainBar from "./UserComponents/MainBar";
import SearchBar from "./UserComponents/SearchBar";
import ShowSlider from "./UserComponents/SliderComponent";
import { serverURL } from "../Services/NodeServices";
import { SmallCardComponent } from "./UserComponents/SmallCardComponent";
import ThreeCardComponent from "./UserComponents/ThreeCardComponent";
import OneCardComponent from "./UserComponents/OneCardComponent";
import DownBox from "./UserComponents/DownBox";
import { CenterFocusStrong } from "@material-ui/icons";

var bannersettings={
    dots:false,
    arrow:false,
    infinite:true,
    speed:1500,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:2000,
};


export default function Home(props){
 const[getbanner,setBanner]=useState([])
 const[getProductBySaleStatus,setProductBySaleStatus]=useState([]) 
 const[getProductByPopularSale,setProductByPopularSale]=useState([]) 
 const[getSubcategoryByBanner,setSubcategoryByBanner]=useState([]) 

    const fetchproduct=async(status)=>{
        var body={'salestatus':status}
        var response=await postData('userinterface/display_product_salestatus',body)
         setProductBySaleStatus(response.data)
     
    }

    const fetchPopularproduct=async(status)=>{
        var body={'salestatus':status}
        var response=await postData('userinterface/display_product_salestatus',body)
        setProductByPopularSale(response.data)
    }

    const fetchsubcategoryproduct=async(status)=>{
        var body={bannerpriority:status}
        var response=await postData('userinterface/display_subcategory_banner',body)
         setSubcategoryByBanner(response.data)
     
    }
useEffect(function(){
    fetchproduct('Tranding')
    fetchPopularproduct('Popular')
    fetchsubcategoryproduct(1)
},[])

     const Heading=(props)=>{
        return(
            <div style={{width:'100wh',textAlign:'center',fontSize:30,fontWeight:' bolder',margin:5,letterSpacing:1}}>
              {props.heading}
                  
            </div>

        )
     }

const Fatchbanner=async()=>{
     var result= await getData ('userinterface/display_all_banner')
    
    setBanner(JSON.parse(result.data.bannerpicture))
    } 

useEffect(function(){
    Fatchbanner( )
},[])
console.log(getbanner)

    return(<div>
        <SearchBar/> 
        <MainBar/>
        <ShowSlider images={getbanner} bannersettings={bannersettings}/>
        <Heading  heading="Trending "/>
        <div style={{justifyContent:'center',width:'100%',display:'flex',flexDirection:'column'}}>
        <div style={{ display:'flex',padding:3,margin:2,flexWrap:'wrap',alignItems:'center',justifyContent:'center',paddingLeft:100,paddingRight:100}}>
        <SmallCardComponent data={getProductBySaleStatus}/>
        </div>
        <Heading  heading="Popular"/>
        <div style={{ display:'flex',padding:3,margin:2,flexWrap:'wrap',alignItems:'center',justifyContent:'center',paddingLeft:100,paddingRight:100}}>
        <ThreeCardComponent data={getProductByPopularSale}/>
         </div>
         <div style={{ display:'flex',flexDirection:"column",padding:4,margin:4,flexWrap:'wrap',alignItems:'center',justifyContent:'center',paddingLeft:100,paddingRight:100}}>
        <OneCardComponent data={getSubcategoryByBanner} url={'ProductList'}/>
         </div>
         <div style={{display:"flex",flexDirection:'column',justifyContent:'center', alignItems:'center',marginTop:100}}>
         <DownBox/>
         </div>
        </div>
     
        </div>
       )

} 