import React,{useState} from "react";
import Navbar from '../admin/Navbar'
import { ButtonGroup,Button } from "react-bootstrap";
import User from "./User";




export default function LoanDetails(){
  const [data,setData] = useState([]);
  const [btn,setBtn] = useState("")


  const accept = (e) =>{
    e.preventDefault();
    setBtn("acc")
    fetch(`http://localhost:54754/admin/getByStatus?status=${"Approved"}`)
    .then((res)=>res.json())
    .then((result)=>{
      setData(result);
      console.log(data);
    })
  }
  const reject = (e) =>{
    e.preventDefault();
    setBtn("rej")
    fetch(`http://localhost:54754/admin/getByStatus?status=${"Rejected"}`)
    .then((res)=>res.json())
    .then((result)=>{
      setData(result);
      console.log(data);
    })
    
  }
  return(
    <div>
      <Navbar />
      <div style={{display : "flex",justifyContent : "center",marginTop : "2rem"}}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success" onClick={accept}>Accepted</Button>
          <Button variant="danger" onClick={reject}>Rejected</Button>
        </ButtonGroup>
      </div>
      
    </div>
  )
}