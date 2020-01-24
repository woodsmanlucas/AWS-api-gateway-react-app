import React, {useState} from 'react'

export function Dynamo (){
    return (<div>
        <h1>Dynamo Database</h1>
        <Get />
        <BatchGet />
        <Put />
        <Scan />
    </div>)
}

function BatchGet(){
    function getBatch(e){
        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/dynamodb/batch')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson.Responses.students);
        });
    }

    return <button onClick={getBatch}>Batch Get</button>
}

function Put(){
    const [studentID, setStudentID] = useState("");
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");


    function SubmitPut(event){
        event.preventDefault();

        let data = {studentID: studentID,
                    Fname: Fname,
                    Lname: Lname
                }
    
        console.log(JSON.stringify(data))

        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/dynamodb', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }

    function studentIDChange(e){
        setStudentID(e.target.value)
    }

    function fNameChange(e){
        setFname(e.target.value)
    }

    function lNameChange(e){
        setLname(e.target.value)
    }

    return <form onSubmit={SubmitPut}>
        <input type="text" onChange={studentIDChange} name="studentID" id="studentID" placeholder="Student Id"/>
        <input type="text" onChange={fNameChange} name="Fname" id="Fname" placeholder="first name"/>
        <input type="text" onChange={lNameChange} name="Lname" id="Lname" placeholder="last name"/>
        <button>Put</button>
        </form>    
}

function Scan(){
    function scanStudents(e){
        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/dynamodb/scan')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson.Items);
      });
    }
    
    return <button onClick={scanStudents}>Scan</button>
}

function Get(){
    function getStudent(e){
        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/dynamodb')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson.Item);
      });
    }

    return (<button onClick={getStudent}>Get</button>)
}