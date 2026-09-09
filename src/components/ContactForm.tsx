import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    productoInteresado: '',
    valorInteresado: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.identificacion || !formData.nombre || !formData.apellido || 
        !formData.correo || !formData.celular || !formData.productoInteresado) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      toast.error('Por favor ingresa un correo válido');
      return;
    }

    // Validar celular
    if (formData.celular.length < 10) {
      toast.error('Por favor ingresa un número de celular válido');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.functions.invoke('create-lead', {
        body: formData
      });

      if (error) throw error;

      toast.success('¡Gracias! Un asesor de iQlick se pondrá en contacto contigo pronto.');
      
      // Limpiar formulario
      setFormData({
        identificacion: '',
        nombre: '',
        apellido: '',
        correo: '',
        celular: '',
        productoInteresado: '',
        valorInteresado: 0
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Tuvimos un problema al guardar tus datos. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Quieres que te <span className="text-primary">contactemos</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Déjanos tus datos y un asesor se comunicará contigo para ofrecerte las mejores alternativas de financiamiento
            </p>
          </div>

          <Card className="p-8 shadow-xl border-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="identificacion">Número de identificación *</Label>
                  <Input
                    id="identificacion"
                    value={formData.identificacion}
                    onChange={(e) => handleChange('identificacion', e.target.value)}
                    placeholder="123456789"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="celular">Celular *</Label>
                  <Input
                    id="celular"
                    type="tel"
                    value={formData.celular}
                    onChange={(e) => handleChange('celular', e.target.value)}
                    placeholder="3001234567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Juan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleChange('apellido', e.target.value)}
                    placeholder="Pérez"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="correo">Correo electrónico *</Label>
                  <Input
                    id="correo"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productoInteresado">Producto de interés *</Label>
                  <Input
                    id="productoInteresado"
                    value={formData.productoInteresado}
                    onChange={(e) => handleChange('productoInteresado', e.target.value)}
                    placeholder="iPhone 14, Samsung Galaxy S23..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorInteresado">Valor aproximado</Label>
                  <Input
                    id="valorInteresado"
                    type="number"
                    value={formData.valorInteresado || ''}
                    onChange={(e) => handleChange('valorInteresado', Number(e.target.value))}
                    placeholder="1000000"
                    min="0"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Solicitar contacto'
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Al enviar este formulario, aceptas que iQlick te contacte para ofrecerte información sobre nuestros productos y opciones de financiamiento.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
