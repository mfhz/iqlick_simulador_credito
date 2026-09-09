import { Smartphone, Clock, Shield, Sparkles, CreditCard, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const benefits = [
  {
    icon: CreditCard,
    title: "Financiación Flexible",
    description: "Elige entre 1 y 60 cuotas según tu capacidad de pago"
  },
  {
    icon: Smartphone,
    title: "Equipos Verificados",
    description: "Celulares nuevos y usados con garantía y revisión técnica"
  },
  {
    icon: Clock,
    title: "Proceso Rápido",
    description: "Respuesta en minutos, 100% digital y sin complicaciones"
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Garantía en todos nuestros equipos y asesoría permanente"
  },
  {
    icon: Sparkles,
    title: "Última Tecnología",
    description: "Las mejores marcas y modelos del mercado a tu alcance"
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Un asesor dedicado para resolver todas tus dudas"
  }
];

export const Benefits = () => {
  const isMobile = useIsMobile();

  const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0], index: number }) => {
    const Icon = benefit.icon;
    return (
      <Card 
        key={index}
        className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group h-full"
      >
        <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
        <p className="text-muted-foreground">{benefit.description}</p>
      </Card>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir <span className="text-primary">iQlick</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu mejor opción para adquirir tecnología con opciones de financiación a través de nuestras entidades aliadas
          </p>
        </div>
        
        {isMobile ? (
          <div className="relative px-12">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index}>
                    <BenefitCard benefit={benefit} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
