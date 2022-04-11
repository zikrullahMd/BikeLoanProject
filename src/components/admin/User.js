import React,{useEffect} from 'react'
import axios from 'axios'


const User = (props) => {
    const approved = () =>{
            fetch(`http://localhost:54754/admin/updateStatus?loanId=${props.data.loanId}&Status=${"Approved"}`,{
                method : "PUT",
                headers : {
                "Content-Type" : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((result)=>{
            alert(props.data.applicantName +" : "+"Approved");
        })
        .catch((err)=>console.log(err))
    }
    const reject = () =>{
        fetch(`http://localhost:54754/admin/updateStatus?loanId=${props.data.loanId}&Status=${"Rejected"}`,{
                method : "PUT",
                headers : {
                "Content-Type" : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((result)=>{
            alert(props.data.applicantName +" : "+"Rejected");
        })
        .catch((err)=>console.log(err))
    }

    const Delete = () =>{
        fetch(`http://localhost:54754/admin/deleteLoan?loanId=${props.data.loanId}`,{
            method : "DELETE"
        })
        .then((res)=>res.json())
        .then((result)=>{
            alert(result);
        })
        .catch((err)=>console.log(err))
    }

    const download = async(e) =>{
        
        console.log("workin")
        const id = sessionStorage.getItem("loanid")
            const res = await axios.get(
                    `http://localhost:54754/user/downloadDocument?fileId=${id}`
            );
            console.log(res);
    }
    return(
        <div>
            <div className="applicants_list">
                <div className="applicant_deets">
                <p id="applicant_name">
                {props.data.applicantName}
                </p>
                <p>
                    Applicant email: {props.data.applicantEmail}
                </p>
                    <p>
                        Loan amount: {props.data.loanAmount}
                    </p>
                <p>
                    Status: {props.data.status}
                </p>
                <button className="download_files_btn" button={download}>Download files</button> &nbsp;
                <button className="approve_btn" onClick={approved}>Approve</button> &nbsp;
                <button className="reject_btn" onClick={reject}>Reject</button> &nbsp;
                <button  style={{backgroundColor:"yellow"}} onClick={Delete}>Delete</button> &nbsp;
                </div>
                <br />
            </div>
        </div>
    )
}

export default User;