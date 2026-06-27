import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';


import { useUser } from '../components/Hooks/UserContext';


function Signup() {


  const navigate = useNavigate();
  const {signup} = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

        await signup(name, email, password);

      alert("Account created successfully");

      navigate("/");

    } catch (error) {

   console.log(error);

   if (error.response) {
      console.log(error.response.data);
   } else {
      console.log("Server error or network problem");
   }
}
  };

  return (
    <Container className="mt-5" style={{maxWidth:"500px"}}>

      <h2 className="text-center mb-4">Create Account</h2>

      <Form onSubmit={handleSignup}>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" className="w-100" type="submit">
          Signup
        </Button>
        
      </Form>

    </Container>
  );
}

export default Signup;