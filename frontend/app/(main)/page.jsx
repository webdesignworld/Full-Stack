import ChallengesListing from "../challenges/ChallengesListing";

const Dashboard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full p-4">
        <ChallengesListing />
      </div>
    </div>
  );
};

export default Dashboard;


