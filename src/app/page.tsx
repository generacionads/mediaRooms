import Hero from "@/components/Hero";
import Strategy from "@/components/Strategy";
import Services from "@/components/Services";
import Metricas from "@/components/Metricas";
import Exito from "@/components/Exito";
import SobreNosotros from "@/components/SobreNosotros";
import CtaPreFooter from "@/components/CtaPreFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Strategy />
      <Services />
      <Metricas />
      <Exito />
      <SobreNosotros />
      <CtaPreFooter />
      <Footer />
    </main>
  );
}
