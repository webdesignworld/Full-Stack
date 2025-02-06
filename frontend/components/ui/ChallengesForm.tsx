"use client";

import React, { useState, useCallback, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { useToast } from "@/hooks/use-toast";

const ChallengesForm = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("easy");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDescriptionChange = useCallback((value) => {
    setDescription(value);
  }, []);

  const extensions = useMemo(() => {
    return language === "javascript" ? [javascript()] : [python()];
  }, [language]);

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: Date.now(),
        type: "number",
        name: "",
        value: "",
        output: "",
        weight: 0.5,
      },
    ]);
  };

  const handleDeleteTestCase = (id) => {
    setTestCases(testCases.filter((testCase) => testCase.id !== id));
  };

  const handleTestCaseChange = (id, field, value) => {
    setTestCases(
      testCases.map((testCase) =>
        testCase.id === id ? { ...testCase, [field]: value } : testCase
      )
    );
  };

  const handleSubmit = async () => {
    if (!title || !category || !level || !description || !code) {
      toast({ title: "Error", description: "All fields marked with * are required.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/challenges/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          level,
          description,
          code,
          language,
          testCases,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        toast({ title: "Success!", description: "Challenge created successfully." });
        // Clear form after success
        setTitle("");
        setCategory("");
        setLevel("easy");
        setDescription("");
        setCode("");
        setTestCases([]);
      } else {
        toast({ title: "Error", description: result.message || "Failed to create challenge.", variant: "destructive" });
      }
    } catch (error) {
      setLoading(false);
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-1/2 p-8 bg-gray-100">
          <h1 className="text-2xl mb-4 font-semibold mt-4">Create New Challenge</h1>

          <Label>Title*</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-4" />

          <Label>Category*</Label>
          <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="mb-4" />

          <Label>Level*</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Label className="mt-4 mb-4">Description*</Label>
          <SimpleMDE value={description} onChange={onDescriptionChange} />
          <BackButton text="Go Back" link="/" />
        </div>

        {/* Right side with code editor and test cases */}
        <div className="w-1/2 p-8 bg-gray-200">
          <Label>Code*</Label>
          <CodeMirror
            value={code}
            height="100px"
            width="800px"
            extensions={extensions}
            onChange={(value) => setCode(value)}
            className="mt-1"
          />

          <div className="flex items-center gap-4 mt-4">
            <Label>Tests*</Label>
            <Button onClick={handleAddTestCase} className="bg-purple-500 text-white text-2xl">
              <Plus />
            </Button>
          </div>

          <div className="space-y-2 mt-4">
            {testCases.map((testCase) => (
              <div key={testCase.id} className="border p-2 rounded flex items-center space-x-4">
                <Button onClick={() => handleDeleteTestCase(testCase.id)} className="bg-red-500 text-white">
                  <Trash2 />
                </Button>

                <div className="flex flex-col flex-1 space-y-2">
                  <Label>Type</Label>
                  <Select value={testCase.type} onValueChange={(value) => handleTestCaseChange(testCase.id, "type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={testCase.type} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label>Name</Label>
                  <Input type="text" value={testCase.name} onChange={(e) => handleTestCaseChange(testCase.id, "name", e.target.value)} />

                  <Label>Output</Label>
                  <Input type="number" value={testCase.output} onChange={(e) => handleTestCaseChange(testCase.id, "output", e.target.value)} />

                  <Label>Weight</Label>
                  <Input type="number" value={testCase.weight} onChange={(e) => handleTestCaseChange(testCase.id, "weight", parseFloat(e.target.value))} />
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="bg-purple-500 mt-4">
            {loading ? "Creating..." : "Create Challenge"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChallengesForm;
