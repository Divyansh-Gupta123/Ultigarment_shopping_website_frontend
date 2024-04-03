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






export default function DisplaySize(props){
  const navigate=useNavigate()
   const classes=useStyles()
   const[getCategoryId,setCategoryID]=useState('')
   const[getSubCategoryId,setSubCategoryID]=useState('')
   const[ProductId,setProductId]=useState('')
   const[getcategoryData,setCategoryData]=useState([])
   const[getSubCategoryData,setSubcategoryData]=useState([])
   const[ProductData,setProductData]=useState([])
   const [SizeName,setSizeName]=useState([])

   const fetchgetCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryData(result.data);
  };
  useEffect(function () {
    fetchgetCategory();
  }, []);

  const CategoryDropDown=() => {
    return getcategoryData.map((item) => {
      return <MenuItem value={item.categoryid}> {item.categoryname}</MenuItem>;
    });
  };
  const fetchSubCategory = async (cid) => {
    var result = await postData("products/display_subcategory_by_category",{categoryid:cid});
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

 

  const SubCategoryDropDown = () => {
    return getSubCategoryData.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
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

   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
       },
     },
   };




   const Size = [
    'S',
    'L',
    'M',
    'XL',
    'XXL',
    
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSizeName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit=async()=>{
var body={categoryid:getCategoryId,subcategoryid:getSubCategoryId,productid:ProductId,size:JSON.stringify(SizeName)}
var response=await postData('size/insertsize',body)
if(response.status)
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





    return(<div className={classes.maincontainer}>
         <div className={classes.box}>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>SIZE INTERFACE</div> 
                     <div style={{justifyContent:'flex-end',display:'flex'}} >
              <Avatar src='report.png'  style={{width:'75'}} variant='square' onClick={()=> navigate('/dashboard/displayallsize')} />
            </div>


                </Grid>
                <Grid item xs={6}>
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




                <Grid item xs={6}>
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




                <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">product name</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={ProductId}
                   label="product name"
                   onChange={(event)=>setProductId(event.target.value)}
                  >
                  {ProductDropDown()}
                    
                 </Select>
               </FormControl>
                </Grid>



                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={SizeName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {Size.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={SizeName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={12}>
   <Button fullWidth color="primary" variant="contained" onClick={handleSubmit} >ADD SIZE</Button>
                </Grid>
            </Grid>

         </div>
    </div>)
}