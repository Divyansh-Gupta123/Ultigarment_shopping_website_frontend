import axios from "axios";
 export const serverURL='http://localhost:4000';

  export const getData=async(url)=>{
    try{
        var response=await fetch(`${serverURL}/${url}`)
        var result= await response.json()
        return(result)
    }
    catch(e){
          return(null)
    }

}

 export const postData=async(url,body,isFile=false)=>{

    

try{ 
    
        const headers={
        headers:{
            "const-type" : isFile ?"mutipath/from-data":"application/json",
         

        }
    } 

    
    
    
var response= await axios.post(`${serverURL}/${url}`,body,headers)
var result=await response.data
return (result)
    }
    catch(error)
    {
        return(false)
    }
}


 

