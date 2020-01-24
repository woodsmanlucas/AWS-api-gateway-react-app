import React, {useState} from 'react'

export function Mysql (){
    const [data, setData] = useState("")

    function getData(data){
        setData(data)
    }

    return (<div>
        <h1>MySql Database</h1>
        <Get getData={getData}/> 
        <Scan getData={getData}/>
        <Put getData={getData}/>
        <p>{data}</p>
    </div>)
}

function Put(){
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");


    function SubmitPut(event){
        event.preventDefault();

        let data = {
                    firstname: Fname,
                    lastname: Lname
                }
    
        console.log(JSON.stringify(data))

        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/mysql', {
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

    function fNameChange(e){
        setFname(e.target.value)
    }

    function lNameChange(e){
        setLname(e.target.value)
    }

    return <form onSubmit={SubmitPut}>
        <input type="text" onChange={fNameChange} name="Fname" id="Fname" placeholder="first name"/>
        <input type="text" onChange={lNameChange} name="Lname" id="Lname" placeholder="last name"/>
        <button>Put</button>
        </form>    
}

function Scan(props){
    function scanStudents(e){
        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/mysql/scan')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        props.getData(JSON.stringify(myJson));
      });
    }
    
    return <button onClick={scanStudents}>Scan</button>
}

function Get(props){
    function getStudent(e){
        fetch('https://slbtptu9k6.execute-api.us-east-1.amazonaws.com/Prod/mysql')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        props.getData(JSON.stringify(myJson));
      });
    }

    return (<button onClick={getStudent}>Get</button>)
}