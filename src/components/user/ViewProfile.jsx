import React,{useState,useEffect} from "react";
import Navbar from "./Navbar";
import {Container,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewProfile() {
  const[profile,setProfile] = useState({"username":'',"address":'',"mobile":'',"loanid":'',"email":'',"emi":''});
  useEffect(()=>{
    const url = 'http://localhost:52188/user/getProfile?email=fa@gmail';
    const data = async () =>{
      try{
        const response = await fetch(url);
        const json = response.json();
        setProfile(json);
      }catch(error){
        console.log(error);
      }
    }
    data();
    console.warn("profile",profile);
  },[])
    return (
      <div>
      <Navbar />
        <div style={{border : "2px solid black",height : '30rem',width:'90%',margin : 'auto',marginTop : "5rem" }}>
        <Container>
        <h3 style={{textAlign : "center",color : "#0C2F4E"}}>Profile Information</h3>
          <Row style={{marginTop : "6rem"}}>
            <Col><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Name: </strong>{profile.username}</p></Col>
            <Col xs={6}><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Address: </strong> Villa No 14, Greenwoods, Gagillapur</p></Col>
            <Col><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Mobile: </strong> 9391902529</p></Col>
          </Row>
          <Row style={{marginTop : "6rem"}}>
            <Col><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Loan Id: </strong> 1234</p></Col>
            <Col xs={5}><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Email: </strong>mohmmedzikrullah159@gmail.com</p></Col>
            <Col><p style={{fontSize : "1.4rem",border : "1px solid black",textAlign : "center",borderRadius : "2px"}}><strong style={{color : "black"}}>Monthly EMI: </strong> 4321</p></Col>
          </Row>
        </Container>
        </div>
      </div>
    );
  }
