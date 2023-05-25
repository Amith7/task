import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form"
import axios from 'axios'
import e, { response } from "express";
function App() {
  const data = { name:"",email:"",Company_name:"",number:""}
  const [inputData,setInputdata]=useState(data)
  const handleData=(e)=>{
    setInputdata({...inputData,[e.target.name]:e.target.value})
  }
  const {register,handleSubmit,watch, formState:{errors}}=useForm({
    defaultValues:{
      name:"",
      email:"",
      Company_name:"",
      number:""
    }
  });
  const [name, setName] = useState("");
  const onSubmit= (data)=>{
  data.preventDefault();
  axios.post("https://dashboard.omnisellcrm.com/api/store",inputData)
  .then((response)=>{
    console.log(response);
  })
  };

console.log(errors);
  return (
    <div className="container">
      <Form  onSubmit={handleSubmit(onSubmit)}>
        <center>
          <h2 className="mb-3 mt-3">Registeration Page</h2>
        </center>
        <Form.Group
          className="mb-3 col-sm-6 offset-sm-3"
          controlId="formGroupName"
        >
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control type="text" name="name" value={inputData.name} placeholder="Enter  Your name" 
          onChange={handleData}
           {...register("name",{required:"This is required"})}/>
          <p>{errors.name?.message}</p>

        </Form.Group>
        <Form.Group
          className="mb-3 col-sm-6 offset-sm-3"
          controlId="formGroupEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
          name="email" value={inputData.email}
          placeholder="Enter email"
          onChange={handleData}

           {...register("email",{required:"This is Required",pattern:
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

          })}  />
        <p>{errors.email?.message}</p>
        </Form.Group>

        <Form.Group
          className="mb-3 col-sm-6 offset-sm-3"
          controlId="formGroupName"
        >
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" 
          name="Company_name" value={inputData.Company_name}
          placeholder="Company name" 
          onChange={handleData}

          {...register("Company_name",{required:"This is required",minLength:{
            value:3,
            message:"Min Length is 3"
          }})} />
                  <p>{errors.Company_name?.message}</p>

        </Form.Group>

        <Form.Group
          className="mb-3 col-sm-6 offset-sm-3"
          controlId="formGroupName"
        >
          <Form.Label>Enter Your Phone Number</Form.Label>
          <Form.Control type="number"
          name="number" value={inputData.number}
          onChange={handleData}

          placeholder="Enter  Your Phone Number" 
          {...register("number",{required:"This is required",minLength:{
                        value:10,
                        message:"Min Length is 10"
            
          }})}/>
          <p>{errors.number?.message}</p>

        </Form.Group>
        <center>
          <Button variant="primary" className="col-sm-6" type="submit" onClick={handleSubmit} >
            Submit
          </Button>

        </center>
      </Form>
    </div>
  );
}

export default App;
