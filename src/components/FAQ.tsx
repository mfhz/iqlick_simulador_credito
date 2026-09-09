import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Qué documentos necesito para solicitar financiación?",
    answer:
      "Para iniciar un proceso de financiación, únicamente necesitas tu documento de identidad vigente, un comprobante de ingresos y tus datos de contacto. Ten presente que iQlick no es quien financia; nosotros comercializamos los equipos y las entidades financieras aliadas son quienes realizan el estudio y otorgan o rechazan la financiación.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de aprobación?",
    answer:
      "El proceso de aprobación es muy rápido y normalmente toma entre 2 y 7 minutos. El tiempo puede variar según la plataforma que realiza el estudio crediticio. En el caso de créditos aprobados por Agaval o Credishop, el desembolso debe realizarse de manera presencial en un punto físico de iQlick.",
  },
  {
    question: "¿Los equipos usados tienen garantía?",
    answer:
      "Sí. Los equipos de exhibición y usados cuentan con garantía, la cual puede ser de 8 meses o 3 meses, dependiendo del estado físico del equipo. Cada dispositivo es revisado detalladamente por nuestro laboratorio, donde se evalúa su condición y se le asigna un sello de garantía: ● Garantía Plata: 8 meses de garantía. ● Garantía Bronce: 3 meses de garantía.Estos sellos aseguran que el equipo ha sido verificado y certificado antes de su comercialización.",
  },
  {
    question: "¿Puedo abonar a capital o pagar anticipadamente?",
    answer:
      "Sí. Todas las entidades financieras permiten realizar abonos a capital y pagos anticipados sin ningún inconveniente. Esto te permite reducir el valor de las cuotas o el tiempo total del crédito si así lo deseas..",
  },
  {
    question: "¿Qué marcas y modelos manejan?",
    answer:
      "En iQlick trabajamos con una amplia gama de marcas y modelos, incluyendo los  últimos lanzamientos de tecnología móvil, audio, televisores, computadores y tablets. Por ejemplo, en iQlick puedes encontrar equipos como el iPhone 17 pro max, el iPhone 16 Pro, el Samsung Galaxy A16, Xiaomi, entre otros. Si tienes un modelo específico en mente, puedes consultarnos para verificar su disponibilidad y condiciones de financiación.",
  },
  {
    question: "¿Las tasas simuladas son definitivas?",
    answer:
      "No necesariamente. Las tasas que ves en el simulador son aproximadas y tienen carácter informativo. El monto, la tasa final, los plazos y otras condiciones dependerán del estudio crediticio realizado por la entidad financiera que otorgue el crédito. Una vez aprobado el crédito, se te notificará la tasa final, los plazos definitivos y el monto a desembolsar.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Preguntas <span className="text-primary">frecuentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestro servicio
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <h3 className="text-xl font-bold mb-2">¿Tienes más preguntas?</h3>
            <p className="text-muted-foreground mb-4">Nuestro equipo está listo para ayudarte en todo momento</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:web@iqlick.co" className="text-primary font-semibold hover:underline">
                web@iqlick.co
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a href="tel:+573023195413" className="text-primary font-semibold hover:underline">
                +573023195413
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
