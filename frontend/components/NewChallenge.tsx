"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewChallengeForm = () => {
  const router = useRouter();
  const [challenge, setChallenge] = useState({
    title: "",
    category: "",
    description: "",
    difficulty_level: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChallenge({ ...challenge, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setChallenge({ ...challenge, difficulty_level: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      console.log(
        "Posting challenge to:",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges`
      );

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges`,
        challenge,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("Response:", res.data);
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create challenge"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Challenge</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-1 block">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={challenge.title}
            onChange={handleChange}
            placeholder="Enter challenge title"
            required
          />
        </div>
        <div>
          <Label htmlFor="category" className="mb-1 block">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            type="text"
            value={challenge.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>
        <div>
          <Label htmlFor="description" className="mb-1 block">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={challenge.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="level" className="mb-1 block">
            Difficulty
          </Label>
          <Select value={challenge.level} onValueChange={handleSelectChange}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Challenge
        </Button>
      </form>
    </div>
  );
};

export default NewChallengeForm;
