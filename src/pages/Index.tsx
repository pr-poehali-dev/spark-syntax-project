import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Festivals from "@/components/Festivals";
import Cuisine from "@/components/Cuisine";
import History from "@/components/History";
import Harmony from "@/components/Harmony";
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
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;