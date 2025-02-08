// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Edit2, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableCaption,
// } from "@/components/ui/table";

// interface ChallengesListingProps {
//   limit?: number;
//   title?: string;
// }

// const ChallengesListing = ({ limit, title }: ChallengesListingProps) => {
//   const { toast } = useToast();
//   const [challenges, setChallenges] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChallenges = async () => {
//       try {
//         const apiUrl = `${process.env.NEST_BACKEND_URL}/challenges`;
//         console.log(" Fetching challenges from:", apiUrl);

//         const headers = {
//           "Content-Type": "application/json",
//         };

//         const res = await fetch(apiUrl, {
//           method: "GET",
//           headers,
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch challenges (${res.status})`);
//         }

//         const data = await res.json();
//         console.log("✅ Challenges fetched:", data);

//         setChallenges(limit ? data.slice(0, limit) : data);
//       } catch (err: any) {
//         console.error("Error fetching challenges:", err);
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChallenges();
//   }, [limit]);

//   const handleDelete = async (id: string) => {
//     const confirmDelete = confirm(
//       "Are you sure you want to delete this challenge?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       const deleteUrl = `${process.env.NEST_BACKEND_URL}/challenges/${id}`;
//       console.log("🗑️ Deleting challenge at:", deleteUrl);

//       const res = await fetch(deleteUrl, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to delete challenge (${res.status})`);
//       }

//       toast({
//         title: "Success!",
//         description: "Challenge deleted successfully.",
//       });

//       setChallenges((prevChallenges) =>
//         prevChallenges.filter((challenge) => challenge.id !== id)
//       );
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const ChallengesTable = ({
//     limit,
//     title,
//   }: {
//     limit?: number;
//     title?: string;
//   }) => {
//     return (
//       <div className="mt-10">
//         <div className="flex items-center justify-between mb-10">
//           <h3 className="text-3xl font-semibold">
//             {title ? title : "Challenges"}
//           </h3>
//           <Link href="/challenge-form">
//             <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md mb-10">
//               New Challenge
//             </button>
//           </Link>
//         </div>

//         {loading && <p>Loading challenges...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && challenges.length === 0 && (
//           <p className="text-gray-500">No challenges available.</p>
//         )}

//         {!loading && !error && challenges.length > 0 && (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Difficulty</TableHead>
//                 <TableHead className="hidden md:table-cell text-right">
//                   Created at
//                 </TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {challenges.map((challenge) => (
//                 <TableRow key={challenge.id}>
//                   <TableCell>{challenge.title}</TableCell>
//                   <TableCell>{challenge.category}</TableCell>
//                   <TableCell>{challenge.level}</TableCell>
//                   <TableCell className="hidden md:table-cell text-right">
//                     {challenge.createdAt}
//                   </TableCell>
//                   <TableCell className="flex items-center gap-2 justify-end">
//                     {/* Edit Button */}
//                     <Link key={id} href={`/challenges/${id}/edit`}>
//                       Edit {challenge.title}
//                       <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md">
//                         <Edit2 size={16} />
//                       </button>
//                     </Link>
//                     <li key={id}>
//                       <Link href={`/challenges/${_id}/edit`}>
//                         <a className="flex items-center bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md">
//                           <Edit2 size={16} className="mr-2" />
//                           Edit {challenge.title}
//                         </a>
//                       </Link>
//                     </li>

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDelete(challenge.id)}
//                       className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-md"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </div>
//     );
//   };

//   // Render the table
//   return <ChallengesTable limit={limit} title={title} />;
// };

// export default ChallengesListing;

