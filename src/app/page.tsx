import Hero from "@/components/Hero";
import Strategy from "@/components/Strategy";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Strategy />
      <Services />
    </main>
  );
}
