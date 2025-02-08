"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EditChallengePage = () => {
  const { id } = useParams();
  console.log("EditChallengePage id:", id);
  const router = useRouter();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("easy");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
  
        const token = localStorage.getItem("token");
      
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges/${id}`;
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }
        
        setTitle(data.title);
        setCategory(data.category);
        setLevel(data.level);
        setDescription(data.description);
        setCode(data.code);
        setLanguage(data.language);
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, toast]);

  const handleSubmit = async () => {
    console.log("handleSubmit triggered for challenge ID:", id);
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges/${id}`;
      
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          title,
          category,
        level,
          description,
          code,
          language,
        }),
      });

      const result = await response.json();
      setSaving(false);

      if (response.ok) {
        toast({ title: "Success!", description: "Challenge updated successfully." });
        router.push("/challenges");
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    } catch (error: any) {
      setSaving(false);
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex w-full h-screen">
      {/* Left Column: Form fields */}
      <div className="w-1/2 p-8 bg-gray-100">
        <h1 className="text-2xl mb-4 font-semibold mt-4">Edit Challenge</h1>

        <Label>Title*</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-4"
        />

        <Label>Category*</Label>
        <Input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="mb-4"
        />

        <Label>Level*</Label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4"
        >
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>

        <Label>Description*</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
        ></textarea>
      </div>

      {/* Right Column: Code editor and additional settings */}
      <div className="w-1/2 p-8 bg-gray-200">
        <Label>Language*</Label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>

        <Label>Font Size*</Label>
        <input
          type="number"
          min="10"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          className="w-16 px-3 py-2 border rounded-lg mb-4"
        />

        <Label>Code*</Label>
        <CodeMirror
          value={code}
          height="400px"
          extensions={language === "javascript" ? [javascript()] : [python()]}
          onChange={(value) => setCode(value)}
          style={{ fontSize: `${fontSize}px` }}
        />

        <Button onClick={handleSubmit} disabled={saving} className="bg-purple-500 mt-4">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default EditChallengePage;

