import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import Header from "@/components/home/header";
import Sidebar from "@/components/home/sidebar";
import DesignTypes from "@/components/home/design-types";
import RecentDesigns from "@/components/home/recent-designs";
const Home = () => {
  return (
    <div className="flex min-h-screen bg-white ">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 flex-col overflow-y-auto pt-20">
          <Banner />
          <DesignTypes />
          <AiFeatures />
          <RecentDesigns />

        </main>
      </div>
    </div>
  );
};

export default Home;
