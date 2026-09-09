import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  productoInteresado: string;
  valorInteresado: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY');
    
    if (!airtableApiKey) {
      throw new Error('AIRTABLE_API_KEY not configured');
    }

    const leadData: LeadData = await req.json();

    console.log('Creating lead in Airtable...');

    const airtableBody = {
      records: [
        {
          fields: {
            'Número de identificacion': leadData.identificacion,
            'Nombre': leadData.nombre,
            'Apellido': leadData.apellido,
            'Correo Electrónico': leadData.correo,
            'Celular': leadData.celular,
            'Producto Interesado': leadData.productoInteresado,
            'Valor Interesado': leadData.valorInteresado,
          }
        }
      ]
    };

    const response = await fetch(
      'https://api.airtable.com/v0/appaJKtjLq27EjHTN/Clientes%20Interesados',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error:', response.status, errorText);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Lead created successfully:', result);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
