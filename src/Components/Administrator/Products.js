import { TextField, Button, Grid, Avatar } from "@material-ui/core";
import { useStyles } from "./ProductCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { getData, postData, serverURL } from "../Services/NodeServices";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";



export default function DisplayProduct(props) {
  const classes = useStyles();
  const nevigate=useNavigate()
  
  const [getCategoryData, setCategoryData] = useState([]);
  const [getSubCategoryData, setSubCategoryData] = useState([]);
  const [getCategoryid, setCategoryid] = useState("");
  const [getSubcategoryid, setSubcategoryid] = useState("");
  const [getProductname, setProductname] = useState("");
  const [getprice, setPrice] = useState("");
  const [getOfferprice, setOfferprice] = useState("");
  const [getStock, setStock] = useState("");
  const [getDescription, setDescrition] = useState("");
  const [getRating, setRating] = useState("");
  const [getStatus, setstatus] = useState("");
  const [getSalestatus, setSaleStatus] = useState("");
  const [getIcon, setIcon] = useState({ url: "./girl.png", bytes: " " });
  

  const handleIcon = (event) => {
    setIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async () => {
    var formdata = new FormData();
    formdata.append("categoryid", getCategoryid);
    formdata.append("subcategoryid", getSubcategoryid);
    formdata.append("productname", getProductname);
    formdata.append("price", getprice);
    formdata.append("offerprice", getOfferprice);
    formdata.append("stock", getStock);
    formdata.append("description", getDescription);
    formdata.append("rating", getRating);
    formdata.append("status", getStatus);
    formdata.append("salestatus", getSalestatus);
    formdata.append("icon", getIcon.bytes);

    var response = await postData("products/addrecord_data", formdata, true);
    if(response.result)
    { Swal.fire({
      icon: 'success',
      title: 'successfully submitted',
     
    })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      
      })

    }
  };

  const fetchgetCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryData(result.data);
  };
  useEffect(function () {
    fetchgetCategory();
  }, []);

  const CategoryDropDown = () => {
    return getCategoryData.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchsubCategory = async (cid) => {
    var result = await postData("products/display_subcategory_by_category",{categoryid:cid});
    setSubCategoryData(result.data);
 
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

  const handleCategoryId=(event)=>{
    setCategoryid(event.target.value)
    fetchsubCategory(event.target.value)
  }
 
  return (
    <div className={classes.maincontainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <div className={classes.heading} style={{display:'flex'}}>
            Product Interface
            </div>
            <div style={{justifyContent:"flex-end"  ,display:'flex'}}>
             <Avatar src={'report.png'}  style={{width:'75'}}  variant='square' onClick={()=>nevigate('/dashboard/displayallproduct')}  />
            </div>
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
                onChange={handleCategoryId}
              >
                <MenuItem>choose-category</MenuItem>
                {CategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                SubCategory name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
               value={getSubcategoryid} 
                label="Sub-CategoryName"
                onChange={(event)=>setSubcategoryid(event.target.value)}
              ><MenuItem>choose-subcategory</MenuItem>
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
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setPrice(event.target.value)}
              fullWidth
              label="Product price"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setOfferprice(event.target.value)}
              fullWidth
              label="Offert price"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setStock(event.target.value)}
              fullWidth
              label="stock"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              onChange={(event) => setDescrition(event.target.value)}
              fullWidth
              label="Description"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              onChange={(event) => setRating(event.target.value)}
              fullWidth
              label="Rating"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
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
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              onChange={handleIcon}
              fullwidth
              color="primary"
              variant="contained"
              component="label"
            >
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Avatar
              variant="square"
              className={classes.images}
              alt="Remy Sharp"
              src={getIcon.url}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
