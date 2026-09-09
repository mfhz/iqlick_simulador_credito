import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface FinancingEntitiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const entities = [
  {
    name: "Addi",
    logo: `${import.meta.env.BASE_URL}images/addi-logo.png`,
    url: "https://preapproval.addi.com/",
    description: "Solicita tu crédito con Addi de forma rápida y digital",
  },
  {
    name: "Banco de Bogotá",
    logo: "https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0023/7354/Banco_de_Bogot%C3%A1.jpg?1464013869",
    url: "https://slm.bancodebogota.com/mazyrlwh",
    description: "Conoce las opciones de crédito que Banco de Bogotá tiene para ti",
  },
  {
    name: "CrediShop",
    logo: "https://credishop.co/img/credishop.svg",
    url: "https://comercios.credishop.co/pages/register_step_unique?spcs=P0FWT9zlUAXgatb9IPoVS1BvQsSw6fScSzAaYfQCNSI",
    description: "Conoce las opciones de crédito que CrediShop tiene para ti",
  },
  {
    name: "Agaval",
    logo: "https://agavalceibadiag.blob.core.windows.net/templates/logoAgavalB2C.png",
    url: "",
    description:
      "Los créditos con Agaval deben tramitarse de manera presencial en el punto físico de iQlick , ubicado en el Centro Comercial Megacentro en Monterrey en Medellín.",
  },
];

export const FinancingEntitiesModal = ({ open, onOpenChange }: FinancingEntitiesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Entidades Financieras Aliadas</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {entities.map((entity) => (
            <div
              key={entity.name}
              className="flex items-center gap-4 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors bg-white"
            >
              <img src={entity.logo} alt={`Logo ${entity.name}`} className="h-16 w-16 object-contain" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{entity.name}</h3>

                {entity.url && (
                  <Button size="sm" onClick={() => window.open(entity.url, "_blank")} className="gap-2">
                    Ir a {entity.name}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
                <p className="text-xs text-muted-foreground mt-1">{entity.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> iQlick vende los productos. Cada entidad financiera evaluará tu solicitud de crédito
            según su propio análisis y políticas.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
