import React,{ useRef, useState } from 'react'
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import logo from "../img/logo.png";
import Footbar from "./Footbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Reset() {
  const emailRef = useRef()
  const [ Message, setMessage ] = useState("");
  const [ variant, setVariant ] = useState("");
  const { sendPasswordReset } = useUserAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await sendPasswordReset(emailRef.current.value);
      setMessage("Reset link sent to mail, redirecting to login page.")
      setVariant("success");
      setTimeout(()=>{
        navigate("/")
      },5000);
    } catch (err) {
      setMessage(err.message)
      setVariant("danger");
    }
  };
  return (
    <>
    <div className='reset'>
      <img src = { logo } alt = "logo" className='mx-auto img-logo mb-5'/>

      { Message && <Alert className="w-65 mx-auto" variant={ variant } onClose={()=> setMessage("") } dismissible>{Message}</Alert>}
    <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 w-75 mx-auto" controlId="formBasicEmail">
            <Form.Control
              type="email"
              className="input-icon"
               placeholder="&#xf007;  Email"
              ref = { emailRef }
            />
          </Form.Group>

          <div className="d-grid gap-2 w-75 mx-auto">
            <Button variant="primary" type="Submit">
            <FontAwesomeIcon icon={solid("key")} />{" "}
            Send password reset mail
            </Button>
          </div>
        </Form>
        </div>
        <Footbar class="footBar-bottom" />
        </>
  )
}
