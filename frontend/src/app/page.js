"use client";
import Slides from "@/components/landing/Slides";
import Drops from "@/components/landing/Drops";
import Activity from "@/components/landing/Activity";
import Collectors from "@/components/landing/Collectors";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Slides />

      <div className="container mx-auto px-8">
        <Drops />
        <Activity />
        <Collectors />
      </div>
    </div>
  );
};

export default Home;
