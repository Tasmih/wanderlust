"use client";

import { authClient } from "@/lib/auth-client";
import { Divider } from "@heroui/divider";


import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField, 
} from "@heroui/react";

import React from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    console.log(data, error);

    if (data) {
      toast.success("Account open successfully")
      window.location.href = "/";
    }

    if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
const handleGoogleSignin = async ()=>{
   await authClient.signIn.social({
    provider: "google",
  })

}
  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center min-h-screen">
      <Card className="border rounded-none p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500">
            Start your adventure with Wanderlast
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <TextField name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField name="image" type="text">
            <Label>Image URL</Label>
            <Input placeholder="Enter image url" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          <Button
            className="rounded-none w-full bg-cyan-500 text-white"
            type="submit"
          >
            Create Account
          </Button>
        </Form>
        
            
            <div className="flex justify-center items-center gap-3">
              <Separator/>
<div className="whitespace-nowrap">
  Or sign up with
</div>
             <Separator/>   
            </div>

      <Button onClick={handleGoogleSignin} variant="outline"
       
        
        className="w-full flex items-center gap-2 rounded-none"
      >
        <FcGoogle size={22} />
        Sign in with Google
      </Button>
    
      
      </Card>
    </div>
  );
};

export default SignupPage;