import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Festivals from "@/components/Festivals";
import Cuisine from "@/components/Cuisine";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Festivals />
      <Cuisine />
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;