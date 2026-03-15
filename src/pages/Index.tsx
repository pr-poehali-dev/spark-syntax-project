import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import History from "@/components/History";
import Festivals from "@/components/Festivals";
import Cuisine from "@/components/Cuisine";
import Harmony from "@/components/Harmony";
import Quiz from "@/components/Quiz";
import Stories from "@/components/Stories";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <History />
      <Festivals />
      <Cuisine />
      <Harmony />
      <Quiz />
      <Stories />
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;