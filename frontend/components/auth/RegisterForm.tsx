"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import coding from "@/app/coding.png";

// Define the schema for registration.
const formSchema = z.object({
  fname: z.string().nonempty("First name is required"),
  lname: z.string().nonempty("Last name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

// Infer the TypeScript type from the schema.
type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  // const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Post the form data to your Next.js API route.
      const response = await axios.post("/api/auth/register", data);
      console.log("Signup successful", response.data);

      // Redirect to the signin page upon successful signup.
      router.push("/signin");
    } catch (error: any) {
      console.error("Signup error", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.error || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="login-mail flex justify-center items-center h-screen m-0 font-sans bg-background-color">
      <div className="signing-page flex w-[70%] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden">
        {/* Left-side image */}
        <div
          className="w-6/12 bg-main-color relative"
          style={{ minHeight: "100%" }}
        >
          <Image
            src={coding}
            alt="developer_avatar"
            fill
            className="object-cover"
          />
        </div>

        {/* Right-side form */}
        <Form {...form}>
          <form
            id="registerForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-6/12 p-5 flex flex-col justify-center"
          >
            <h1 className="mb-5 text-primary-text-button-color font-bold text-center text-[32px]">
              Join Managers Now!
            </h1>

            {errorMessage && (
              <p className="mb-4 text-center text-red-500">{errorMessage}</p>
            )}

            {/* First Name Field */}
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="mb-[15px] p-2.5 border border-solid bg-main-color text-white placeholder-white rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      className="mb-[15px] p-2.5 border border-solid bg-main-color text-white placeholder-white rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="mb-[15px] p-2.5 border border-solid bg-main-color text-white placeholder-white rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
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
                      className="mb-[15px] p-2.5 border border-solid bg-main-color text-white placeholder-white rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-[#007BFF] text-white no-underline py-2 px-4 rounded hover:bg-[#0056b3] transition duration-200 ease-in-out"
            >
              Sign Up
            </Button>

            <p className="mt-2.5 text-center text-[#666666]">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#007BFF] no-underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
