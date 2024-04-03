import { TextField,Button,Grid,Avatar } from "@material-ui/core"
import { useState,useEffect } from "react"
import { postData,GetData, getData } from "../Services/NodeServices"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useStyles } from "./SizeCss"
import { FaceRetouchingNatural } from "@mui/icons-material";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import ColorPicker from 'material-ui-color-picker'
import { color } from "@mui/system";






export default function DisplayColor(props){
  const navigate=useNavigate()
   const classes=useStyles()
   const[getCategoryId,setCategoryID]=useState('')
   const[getSubCategoryId,setSubCategoryID]=useState('')
   const[ProductId,setProductId]=useState('')
   const[getcategoryData,setCategoryData]=useState([])
   const[getSubCategoryData,setSubcategoryData]=useState([])
   const[ProductData,setProductData]=useState([])
   const[sizeData,setSizeData]=useState([])
   const [SizeName,setSizeName]=useState('')
   const[getcolor,setcolor]=useState()
  const [colorCode,setColorcode]=useState('')
  const[sizeid,setSizeId]=useState('')
  const[colorList,setColorList]=useState([])

   const fetchgetCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryData(result.data);
  };
  useEffect(function () {
    fetchgetCategory();
  }, []);

  const CategoryDropDown=() => {
    return getcategoryData.map((item) => {
      return( 
      <MenuItem value={item.categoryid}> {item.categoryname}</MenuItem>
      )
    });
  };
  const fetchSubCategory = async (cid) => {
    var result = await postData("subcategory/display_subcategory_by_categoryid",{categoryid:cid});
    setSubcategoryData(result.data);
  };
  const FetchProductData=async(sid)=>{
   var result=await postData('products/displayproduct_bysubcategoryid',{subcategoryid:sid})
  setProductData(result.data)
  }
 
 
  const handlecategory=(event)=>{
       setCategoryID(event.target.value)
       fetchSubCategory(event.target.value)
  }

 

  const SubCategoryDropDown =() => {
    return getSubCategoryData.map((item) =>{
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    });
  };
  const ProductDropDown=()=>{
    return ProductData.map((item)=>{
    return(
          <MenuItem value={item.productid}>{item.productname}</MenuItem>
         )
    })
  }

   const handlesubcategory=(event)=>{
    setSubCategoryID(event.target.value)
   FetchProductData(event.target.value)
   }

   
  const handleSubmit=async()=>{
 var body={categoryid:getCategoryId,subcategoryid:getSubCategoryId,productid:ProductId,sizeid:SizeName,colorcode:JSON.stringify(colorList)}
var response=await postData('color/add_color_data',body)
if(response.result)
{
  Swal.fire({
    icon: 'success',
    title: 'submit record successfully',
    
  })
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
   
  })
}

  }
  

  const Fetchsize=async(pid)=>{
     var body={productid:pid}
     var response=await postData('size/display_size_byproductid',body)
      setSizeData(response.data)
  }
   
  const SizeDropDown=()=>{ 
      return sizeData.map((item)=>{
        return(
       <MenuItem value={item}>{item}</MenuItem>
        )
    })
  }

  const handleSize=(event)=>{
    setProductId(event.target.value)
    Fetchsize(event.target.value)
  }

  const handlecolor=(event)=>{
    setColorcode(event)
  }
  const handleaddcolor=()=>{
   var temp=colorList
   setColorList({...temp,[getcolor]:colorCode})  
  }
  
  return(<div className={classes.maincontainer}>
         <div className={classes.box}>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>Color INTERFACE</div> 
                     <div style={{justifyContent:'flex-end',display:'flex'}} >
              <Avatar src='report.png'  style={{width:'75'}} variant='square' onClick={()=> navigate('/displayallsize')} />
            </div>


                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">category name</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={getCategoryId}
                   label="category-ID"
                   onChange={handlecategory}
                  >
                    <MenuItem>choose categor</MenuItem>
                    {CategoryDropDown()}
                    
                 </Select>
               </FormControl>
                </Grid>




                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">subcategory name</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={getSubCategoryId}
                   label="category-ID"
                   onChange={handlesubcategory}
                  >
                    
                   <MenuItem >choose subcategory</MenuItem>
                   {SubCategoryDropDown()}
                    
                 </Select>
               </FormControl>
                </Grid>




                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">product name</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={ProductId}
                   label="product name"
                   onChange={handleSize}
                  >
                  {ProductDropDown()}
                    
                 </Select>
               </FormControl>
                </Grid>



                <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                 value={SizeName}
                   label="Size"
                   onChange={(event)=>setSizeName(event.target.value)}
                  >
                   {SizeDropDown()}   
                 </Select>
               </FormControl>
                </Grid>




                <Grid item xs={3}>
                  <TextField  onChange={(event) =>setcolor(event.target.value)} fullWidth  label="color Name" variant="outlined">color</TextField>
                </Grid>
                <Grid item xs={3}>
                <ColorPicker
                   name='color'
                  defaultValue='#000'
                  variant="outlined"
                 value={colorCode} 
                onChange={handlecolor}
 
                  />
                </Grid>
                <Grid item xs={3}>
               <Button fullWidth color="primary" variant="contained" onClick={handleaddcolor}>set</Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField value={JSON.stringify(colorList)}  onChange={(event) =>setColorList(event.target.value)} fullWidth  label="color Details" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
               <Button fullWidth color="primary" variant="contained" onClick={handleSubmit} >submit</Button>
                </Grid>
            </Grid>

         </div>
    </div>)
}