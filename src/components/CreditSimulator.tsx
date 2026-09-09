import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Percent, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FinancingEntitiesModal } from "./FinancingEntitiesModal";

export const CreditSimulator = () => {
  const [purchaseValue, setPurchaseValue] = useState<number | "">(1000000);
  const [displayValue, setDisplayValue] = useState<string>("1.000.000");
  const [installments, setInstallments] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [rateInfo, setRateInfo] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formatNumberWithDots = (num: number | string): string => {
    const numStr = num.toString().replace(/\D/g, "");
    if (numStr === "") return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseFormattedNumber = (formatted: string): number | "" => {
    const cleaned = formatted.replace(/\./g, "");
    if (cleaned === "") return "";
    return Number(cleaned);
  };

  useEffect(() => {
    fetchInterestRate();
  }, []);

  const fetchInterestRate = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("get-interest-rate");

      if (error) throw error;

      setInterestRate(data.interestRate);
      setRateInfo(data);
      toast.success("Tasa de interés cargada correctamente");
    } catch (error: any) {
      console.error("Error fetching interest rate:", error);
      toast.error("Error al cargar la tasa de interés");
      // Usar una tasa de ejemplo si falla
      setInterestRate(28.74);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyPayment = () => {
    if (!interestRate || !installments || typeof purchaseValue !== "number" || purchaseValue <= 0) return null;

    // Convertir tasa anual a mensual
    const monthlyRate = interestRate / 12 / 100;

    // Fórmula de cuota fija: P * (i / (1 - (1 + i)^(-n)))
    const payment = purchaseValue * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -installments)));

    return {
      monthlyPayment: payment,
      totalAmount: payment * installments,
      totalInterest: payment * installments - purchaseValue,
    };
  };

  const results = calculateMonthlyPayment();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="simulator" className="py-20 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simula tu <span className="text-primary">crédito</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calcula cuánto pagarías mensualmente por el equipo que deseas
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Las tasas presentadas son únicamente de referencia. Cada entidad financiera podrá aplicar condiciones y
            tasas distintas según el análisis de tu perfil crediticio. Asimismo, algunas entidades pueden incluir cargos
            adicionales como avales, fianzas u otros costos asociados a la aprobación y desembolso del crédito.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-xl border-2">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <Label htmlFor="purchaseValue" className="text-lg font-semibold">
                  Valor de compra
                </Label>
                <Input
                  id="purchaseValue"
                  type="text"
                  value={displayValue}
                  onChange={(e) => {
                    const input = e.target.value;
                    const formatted = formatNumberWithDots(input);
                    setDisplayValue(formatted);
                    const numValue = parseFormattedNumber(formatted);
                    setPurchaseValue(numValue);
                  }}
                  className="text-lg h-12"
                />
                <p className="text-sm text-muted-foreground">
                  {purchaseValue === "" ? "$0" : formatCurrency(purchaseValue)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="installments" className="text-lg font-semibold">
                  Número de cuotas
                </Label>
                <Select value={installments.toString()} onValueChange={(value) => setInstallments(Number(value))}>
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "cuota" : "cuotas"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Cargando tasa de interés...</p>
              </div>
            ) : (
              <>
                {interestRate && (
                  <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Percent className="h-4 w-4" />
                      <span>Tasa de interés vigente</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{interestRate}% EA</p>
                    {rateInfo && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {rateInfo.name} - {rateInfo.month}/{rateInfo.year}
                      </p>
                    )}
                  </div>
                )}

                {results && (
                  <div className="space-y-4 bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border-2 border-primary/20">
                    <h3 className="text-2xl font-bold mb-4">Resumen de tu crédito</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <DollarSign className="h-4 w-4" />
                          <span>Cuota mensual</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.monthlyPayment)}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>Total a pagar</span>
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(results.totalAmount)}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Percent className="h-4 w-4" />
                          <span>Total intereses</span>
                        </div>
                        <p className="text-2xl font-bold text-accent">{formatCurrency(results.totalInterest)}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Valor de compra:</strong> {purchaseValue === "" ? "$0" : formatCurrency(purchaseValue)}{" "}
                        •<strong> Plazo:</strong> {installments} {installments === 1 ? "cuota" : "cuotas"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" onClick={() => setModalOpen(true)} className="gap-2">
              <Building2 className="h-5 w-5" />
              Ver entidades financieras
            </Button>
          </div>
        </div>
      </div>

      <FinancingEntitiesModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
