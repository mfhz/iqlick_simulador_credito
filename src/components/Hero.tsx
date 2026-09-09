import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

export const Hero = () => {
  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm">Tecnología al alcance de todos</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Compra tu próximo
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                equipo con iQlick.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Celulares y tecnología nuevos y usados. Financiación flexible de 1 a 60 cuotas a través de nuestras
              entidades aliadas. Rápido, fácil y digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToSimulator}
                className="text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Simula tu crédito ahora
                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </div>
          </div>

          <div className="relative scale-80">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
            <img
              src={heroImage}
              alt="Productos tecnológicos iQlick - Celulares, tablets, accesorios y más"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};
