import Navbar from '@/components/Navbar';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <div>
   
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;

