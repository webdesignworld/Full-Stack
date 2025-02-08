"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ChallengesListing from "../../ChallengesListing"; 

const DeleteChallengePage = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const deleteChallenge = async () => {
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
          throw new Error(result.message || "Failed to delete challenge");
        }

   
        toast({ title: "Success!", description: "Challenge deleted successfully." });
        setDeleted(true);
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      deleteChallenge();
    }
  }, [id, toast]);

  if (loading) {
    return <p>Deleting challenge...</p>;
  }


  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4 font-semibold">Updated Challenges List</h2>

      <ChallengesListing />
    </div>
  );
};

export default DeleteChallengePage;
