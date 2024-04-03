import { TextField,Button,Grid,Avatar } from "@material-ui/core";
import { useStyles } from "./DisplayProductCss";
import MaterialTable from "@material-table/core";
import { getData, postData, serverURL } from "../Services/NodeServices";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";




export default function DisplayAllProduct(props){
    const classes=useStyles()
    const navigate=useNavigate()

    const[getProductData,setProductData]=useState([])
    const [getCategoryid, setCategoryid] = useState('');
    const[getProductid,setProductid]=useState('')
    const [getSubcategoryid, setSubcategoryid] = useState("");
    const [getProductname, setProductname] = useState("");
    const [getprice, setPrice] = useState("");
    const [getOfferprice, setOfferprice] = useState("");
    const [getStock, setStock] = useState("");
    const [getDescription, setDescrition] = useState("");
    const [getRating, setRating] = useState("");
    const [getStatus, setstatus] = useState("");
    const [getSalestatus, setSaleStatus] = useState("");
    const [getIcon, setIcon] = useState({ url: "./girl.png", bytes: " " }) 
    const [getCategoryData, setCategoryData] = useState([]);
    const [getSubCategoryData, setSubCategoryData] = useState([]);
    const[open,setOpen]=useState(false)
    const[getbtnStatus,setBtnStatus]=useState(false)
    const[getUploadbtn,setUploadbtn]=useState(true)
    const[getoldicon,setoldicon]=useState('')


    //product part
    const getCategory = async () => {
      var result = await getData("category/display_all_category");
      setCategoryData(result.data);
    };
    useEffect(function () {
      getCategory();
    }, []);
  
    const CategoryDropDown = () => {
      return getCategoryData.map((item) => {
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
      });

    };
  
    const getSubCategory = async () => {
      var result = await getData("subcategory/display_all_subcategory");
      setSubCategoryData(result.data);
    };
    useEffect(function () {
      getSubCategory();
    }, []);
  
    const SubCategoryDropDown = () => {
      return getSubCategoryData.map((item) => {
        return (
          <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        );
      });
    };

    const handleIcon=(event) => {
    
      setIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true)
    }

    //=======================================================================================================
     
    const FetchAllProduct=async()=>{
  var result=await getData('products/display_all_products')
  setProductData(result.data)
        
    }
    useEffect(function(){
       FetchAllProduct()
},[])

const handleOpen=(rowData)=>{
  setProductid(rowData.productid)
  setCategoryid(rowData.categoryid)
  setSubcategoryid(rowData.subcategoryid)
  setProductname(rowData.productname)
  setPrice(rowData.price)
  setOfferprice(rowData.offerprice)
  setStock(rowData.stock)
  setDescrition(rowData.description)
  setRating(rowData.rating)
  setstatus(rowData.status)
  setSaleStatus(rowData.salestatus)
  setoldicon({url:`${serverURL}/images/${rowData.picture}`,bytes:' '})
  setIcon({url:`${serverURL}/images/${rowData.picture}`,bytes:' '})
  setUploadbtn(false)
  setOpen(true)
}
const handleClose=()=>{
  setOpen(false)
  setBtnStatus(false)
  setUploadbtn(false)
}

const handleEditData=async()=>{
  var body={productid:getProductid,categoryid:getCategoryid,subcategoryid:getSubcategoryid,productname:getProductname,
  price:getprice,offerprice:getOfferprice,stock:getStock,description:getDescription,rating:getRating,status:getStatus,salestatus:getSalestatus}
   
  var response=await postData('products/edit_product_data',body)
  if(response.status)
  { 
    Swal.fire({
      icon: 'success',
      title: 'Edit record successfully',
    })
  }
  else{
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
  setOpen(false)
  FetchAllProduct()
}
const handleDeleteData=async()=>{
  Swal.fire({
    title: 'Do you want to Delete the subcategory?',
    showDenyButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
  }).then(async(res) => {
    /* Read more about isConfirmed, isDenied below */
    if (res.isConfirmed) {
      var body={productid:getProductid}
       var result= await postData('products/delete_product_data',body)
      if(result.status)
      {
      Swal.fire('Delete!', '', 'success')
   FetchAllProduct()
      }
      else{
        Swal.fire('Server error', '', 'error')
      }
     FetchAllProduct()
    } 
    else if (res.isDenied) {
      Swal.fire('Changes are not deleted', '', 'info')
    }
  })

 

  FetchAllProduct()
  handleClose()

}



const handleEditIcon=async()=>{
  var formdata=new FormData()
  formdata.append('productid',getProductid)
  formdata.append('picture',getIcon.bytes)
 var response=await postData('products/update_picture',formdata,true)
 alert(response.status)
 handleClose()
 FetchAllProduct()
}

 
const handleCancel=()=>{
  setIcon({url:getoldicon.url,bytes:' '})
  setBtnStatus(false)
  setUploadbtn(false)
}
const SaveAndCancel=()=>{
  return(
    <div>
      {getbtnStatus?<div style={{display:'flex', width:180 ,justifyContent:'space-between'}}><Button onClick={handleEditIcon} color="primary" variant="contained">Save</Button>
          <Button color="secondary" variant="contained" onClick={handleCancel}>cancel</Button></div>:<></>}
    </div>
  )
}

  function showDailog(){
    return(
      <div>
            <Dialog
        open={open}
        onClose={handleClose}
       
    >
        <DialogContent>
      
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <div>
            Product Interface
            </div>
            <div className={classes.heading}></div>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Category name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getCategoryid}
                label="CategoryName"
                //onChange={handleCategory}
              >
               
                {CategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                SubCategory name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={getSubcategoryid}
                label="Sub-CategoryName"
                //onChange={handleCategory}
              >
                {SubCategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setProductname(event.target.value)}
              fullWidth
              label="Product Name"
              variant="outlined"
              value={getProductname}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setPrice(event.target.value)}
              fullWidth
              label="Product price"
              variant="outlined"
              value={getprice}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setOfferprice(event.target.value)}
              fullWidth
              label="Offert price"
              variant="outlined"
              value={getOfferprice}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setStock(event.target.value)}
              fullWidth
              label="stock"
              variant="outlined"
              value={getStock}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              onChange={(event) => setDescrition(event.target.value)}
              fullWidth
              label="Description"
              variant="outlined"
              value={getDescription}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setRating(event.target.value)}
              fullWidth
              label="Rating"
              variant="outlined"
              value={getRating}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={getStatus}
                onChange={(event) => {
                  console.log("this is radio", event.target.value);
                  setstatus(event.target.value);
                  
                }}
              >
                <FormControlLabel
                  value="continue"
                  control={<Radio />}
                  label="continue"
                />
                <FormControlLabel
                  value="discontinue"
                  control={<Radio />}
                  label="discontinue"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              onChange={(event) => setSaleStatus(event.target.value)}
              fullWidth
              label="Status"
              variant="outlined"
              value={getSalestatus}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
             
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEditData}
            >
          Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
             
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleDeleteData}
            >
              Delete
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
            
              fullwidth
              color="primary"
              variant="contained"
              component="label"
              disabled={getUploadbtn}
            >
              Upload
              <input hidden accept="image/*" multiple onChange={handleIcon} type="file" />
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Avatar
              variant="square"
              className={classes.images}
              alt="Remy Sharp"
              src={getIcon.url}
            />
          </Grid>
          <Grid item xs={4} className={classes.center}>
        {SaveAndCancel()}
                </Grid>
         
        </Grid>
    
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }

   
 

    function Displaytable() {
        return (
          
          
          <MaterialTable
         
            title="Product-Information"
           
            columns={[
              { title: 'category-name', render:(rowData)=><div style={{display:'flex' ,flexDirection:'column'}}><div>{rowData.cn}</div><div>{rowData.sn}</div></div>},
              { title: 'productname', field: 'productname'},
              { title: 'Price ', render:(rowData)=><div style={{display:'flex' ,flexDirection:'column'}}><div>{rowData.offerprice>0?<><div style={{color:'red'}}><s>{rowData.price}</s></div><div style={{color:'darkgreen'}}>{rowData.offerprice}</div></>:rowData.price}</div><div style={{color:'blue'}}>Stock:{rowData.stock}</div></div>},
              { title: 'Description', field: 'description'},
              { title: 'Rating', field: 'rating'},
              { title: 'Status', render:(rowData)=><div style={{display:'flex' ,flexDirection:'column'}}><div>{rowData.status}</div><div>{rowData.salestatus}</div></div>},
              { title: 'image',render:(rowData)=><img  src={`${serverURL}/images/${rowData.picture}`}width='70' height='70'/>},  
            ]}
            
            data={getProductData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => {handleOpen(rowData)}
              },
              {
                icon: 'add',
                tooltip: 'Add category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/product')
              },
            ]}
          />
          
        )
      }

    return(<div className={classes.maincontainer}>
        <div className={classes.box}>
           {Displaytable()}
        </div>
        {showDailog()}
    </div>)
}