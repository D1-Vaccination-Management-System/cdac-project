

import { Button, Label, TextInput } from "flowbite-react";
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";

export function Register() {

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repeatpassword,setRepeatPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [aadharNo,setAadharNo] = useState('')


  const handleRegister = ()=>
  {

  }
  return (
    <form className="flex max-w-md flex-col gap-4" action="" method="post">
        <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="first name" />
        </div>
        <TextInput id="firstName" type={TextInput} placeholder="Enter first name" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="last name" />
        </div>
        <TextInput id="lastName" type={TextInput} placeholder="Enter last name" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeatpassword" value="Repeat password" />
        </div>
        <TextInput id="repeatpassword" type="password" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="phone number" />
        </div>
        <TextInput id="phone" type="number" required shadow />
      </div>
      
      <Button type="submit" onClick={handleRegister} >Register </Button>
    </form>
  );
}
