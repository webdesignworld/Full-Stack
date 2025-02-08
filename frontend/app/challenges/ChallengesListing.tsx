
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ChallengesListing = ({
  limit,
  title,
}: {
  limit?: number;
  title?: string;
}) => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
   
        const token = localStorage.getItem("token");
  
        const apiUrl = `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/challenges`;

        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
       
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch challenges");
        }

        setChallenges(limit ? data.slice(0, limit) : data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [limit]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const deleteUrl = `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/challenges/${id}`;

      const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast({
        title: "Success!",
        description: "Challenge deleted successfully.",
      });

   
      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== id)
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title || "Challenges"}</h3>
      <Link href="/challenge-form">
        <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2  px-4 text-xs rounded-md mb-10">
          New Challenge
        </button>
      </Link>

      {loading && <p>Loading challenges...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-purple-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Difficulty</th>
              <th className="border p-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge) => (
              <tr key={challenge.id} className="border-b">
                <td className="border p-2">{challenge.title}</td>
                <td className="border p-2">{challenge.category}</td>
                <td className="border p-2">{challenge.difficulty_level}</td>
                <td className="border p-2 flex items-center gap-2 justify-end">
                  <Link href={`/challenges/${challenge._id}/edit`}>
                    <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md">
                      <Edit2 size={16} />
                    </button>
                  </Link>

                  <Link href={`/challenges/${challenge._id}/delete`}>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-xs rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChallengesListing;
