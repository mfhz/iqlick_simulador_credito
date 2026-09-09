import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { CreditSimulator } from "@/components/CreditSimulator";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <Benefits />
      <CreditSimulator />
      <ContactForm />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
