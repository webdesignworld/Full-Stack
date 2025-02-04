

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/app/store/authSlice"; 

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

// Define the schema for sign-in.
const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

// Infer the form values type.
type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler for sign-in.
  const onSubmit = async (data: FormValues) => {
    try {
      // Post the form data to your Next.js API endpoint.
      const response = await axios.post("/api/auth/signin", data);
      const token = response.data.token;
      console.log("Logged in successfully", token);

      // Dispatch the token to Redux.
      dispatch(setAuthToken(token));

      // Redirect to the home page.
      router.push("/");
    } catch (error: any) {
      console.error("Sign in error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.error || "Sign in failed. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: full-page coders image */}
      <div className="relative w-1/2">
        <Image
          src={coding}
          alt="developer_avatar"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side: sign-in form card */}
      <div className="w-1/2 flex justify-center items-center bg-background-color">
        <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden p-8">
          <Form {...form}>
            <form
              id="signinForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <h1 className="mb-5 text-primary-text-button-color font-bold text-center text-[32px]">
                Join Managers Now!
              </h1>

              {errorMessage && (
                <p className="mb-4 text-center text-red-500">{errorMessage}</p>
              )}

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
                Sign In
              </Button>

              <p className="mt-2.5 text-center text-[#666666]">
                New to CodeCLA?{" "}
                <Link href="/signup" className="text-[#007BFF] no-underline">
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
