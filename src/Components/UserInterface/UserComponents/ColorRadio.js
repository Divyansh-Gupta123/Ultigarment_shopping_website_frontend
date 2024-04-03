import { useEffect, useState } from "react"

export default function ColorComponent(props) {
       const [colorName, setColorName] = useState('')
      
    
    const handleColor = (item) => {
      
        setColorName(item)
        
    }

  
  
 const showColor=() => {
       
   return Object.keys(props.colors).map((item) => {
  
      return (<div onClick={() => handleColor(item, item.color)} style={{width:40, height:40,borderRadius:30,marginRight:5,border:`${item==colorName?'3px solid #51cccc ':'1px solid white'}` ,background: `${props.colors[item]}`,cursor:'pointer'}} ></div>)

      })
         
 }
 

    return (
        <div>

            <div style={{ paddingTop: '1%' }}><span><span style={{ fontWeight: '400px', fontSize: '20px', paddingTop: '40px' }}>Color : </span><span style={{ color: 'grey' }}>{colorName}</span></span></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                
                {props.colors==0?<>Pls select size...</>:showColor()}
             
            </div>
        </div>)


}