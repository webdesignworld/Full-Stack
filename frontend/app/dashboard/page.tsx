import Navbar from '@/components/Navbar';
import ChallengesListing from "@/components/ChallengesListing"; 

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ChallengesListing/>
      <div className='flex'>
        <div className='hidden md:block h-[100vh] w-[300px]'>
   
        </div>
        <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;