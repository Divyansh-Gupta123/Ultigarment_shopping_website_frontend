import { TextField,Button,Avatar,Grid } from "@material-ui/core"
import { useState,useEffect } from "react"
import { useStyles } from "./DisplayProductCss"
import { postData,getData } from "../Services/NodeServices"
import MaterialTable from "@material-table/core"
import SubCategory from "./SubCategory"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaceRetouchingNatural } from "@mui/icons-material";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { Navigate, useNavigate } from "react-router-dom"


export default function DisplayAllSize(){

    const classes=useStyles()
    const navigate=useNavigate()

    const[getCategoryId,setCategoryID]=useState('')
    const[getSubCategoryId,setSubCategoryID]=useState('')
    const[ProductId,setProductId]=useState('')
    const[getcategoryData,setCategoryData]=useState([])
    const[getSubCategoryData,setSubcategoryData]=useState([])
    const[ProductData,setProductData]=useState([])
   const [SizeName,setSizeName]=useState([])
   const[getsizedata,setsizedata]=useState([])
   const[open,setOpen]=useState(false)
   const[getsizeid,setsizeid]=useState('')


   //==============================================================================================================
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
        <MenuItem value={item.subcategoryid}>{item.sn}</MenuItem>
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

 

   //=================================================================================================================

   const FetchSizeData=async()=>{
    var data=await getData('size/display_size_data')
    alert(JSON.stringify(data.data))
   }
   useEffect(function(){
        FetchSizeData()
   },[])
   
   const handleopen=(rowData)=>{
    setOpen(true)
    setsizeid(rowData.sizeid)
    setCategoryID(rowData.categoryid)
    setSubCategoryID(rowData.subcategoryid)
    setProductId(rowData.productid)
    setsizedata(rowData.size)
    fetchSubCategory(rowData.categoryid)
    FetchProductData(rowData.subcategoryid)
    setSizeName(JSON.parse(rowData.size))
   }
   const handleclose=()=>{
    setOpen(false)
   }
   const handleEdit=async()=>{
  var body={categoryid:getCategoryId,subcategoryid:getSubCategoryId,productid:ProductId,size:JSON.stringify(SizeName),sizeid:getsizeid}
  var response=await postData('size/edit_size_data',body)
if(response.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Edit record succefully',   
  })
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })

}
  FetchSizeData()
  setOpen(false)

   }


   const displayDailog=()=>{
    return(
        <Dialog
        open={open}
        onClose={handleclose}
       
      >
        
        <DialogContent>
        <div className={classes.box}>


<Grid container spacing={2}>
    <Grid item xs={12}>
        <div className={classes.heading}>SIZE INTERFACE</div>
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
<Button fullWidth color="primary" variant="contained" onClick={handleEdit} >Edit</Button>
    </Grid>
</Grid>

</div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclose}>Close</Button>
     
        
        </DialogActions>
      </Dialog>

    )
   }
  
  function DisplayTable() {
    return (
      <MaterialTable
        title="product-size-Details"
        columns={[
          { title: 'Category', field:'cn'},
          { title: 'Subcategory', field:'subcategoryid'},
          { title: 'Product', field:'pn'},
          { title: 'Size', field:'size'},
          
        ]}
        data={getsizedata}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Save User',
            onClick: (event, rowData) => {handleopen(rowData)}
          },
          {
            icon: 'add',
            tooltip: 'Add category',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/size')
          },
        ]}
       
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          }
        }}
      />
    )
  }
    return(<div className={classes.maincontainer}> 
             <div className={classes.box}>
              {DisplayTable()}
             </div>
            {displayDailog()}
          </div>)
}