
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/app/store/authSlice";
import { setCookie } from "cookies-next";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import coding from "@/app/coding.png";

const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["manager", "coder"], {
    message: "Role must be either 'manager' or 'coder'",
  }),
});


type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "manager", // Default role
    },
  });


  const NEST_BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Submit handler for registration
  const onSubmit = async (data: FormValues) => {
    try {
      console.log("📤 Sending registration request:", data);

      // Post the form data to the backend API
      const response = await axios.post(
        `${NEST_BACKEND_URL}/auth/register`,
        data
      );
      const { access_token, user } = response.data;

      console.log("✅ Registration successful:", user);

      // Dispatch token to Redux store
      dispatch(setAuthToken(access_token));

      // Store token in cookies for authentication
      setCookie("token", access_token, {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
      });

      // Redirect to the home/dashboard page
      router.push("/auth/signin");
    } catch (error: any) {
      console.error(
        "❌ Registration error:",
        error.response?.data || error.message
      );

      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
   
      <div className="relative w-1/2 hidden md:block">
        <Image
          src={coding}
          alt="developer_avatar"
          fill
          className="object-cover"
        />
      </div>

   
      <div className="w-full md:w-1/2 flex justify-center items-center bg-background-color p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="mb-5 text-primary-text-button-color font-bold text-center text-[28px]">
            Create an Account
          </h1>

          {errorMessage && (
            <p className="mb-4 text-center text-red-500">{errorMessage}</p>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
        
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="mb-3 p-3 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

       
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="mb-3 p-3 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

       
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="mb-3 p-3 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

          
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="mb-3 p-3 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

         
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="mb-3 p-3 border rounded">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="coder">Coder</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

       
              <Button
                type="submit"
                className="bg-[#007BFF] text-white py-2 px-4 rounded hover:bg-[#0056b3] transition duration-200"
              >
                Sign Up
              </Button>

              <p className="mt-3 text-center text-[#666666]">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#007BFF]">
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
