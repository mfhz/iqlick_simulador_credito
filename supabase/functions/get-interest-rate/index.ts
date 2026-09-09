import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY');
    
    if (!airtableApiKey) {
      throw new Error('AIRTABLE_API_KEY not configured');
    }

    console.log('Fetching interest rate from Airtable...');

    const response = await fetch(
      'https://api.airtable.com/v0/appaJKtjLq27EjHTN/Tasas%20de%20Usura',
      {
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.records || data.records.length === 0) {
      throw new Error('No interest rate records found');
    }

    const firstRecord = data.records[0];
    const interestRate = firstRecord.fields['Tasa Máxima Usura (%)'];

    if (!interestRate) {
      throw new Error('Interest rate field not found in record');
    }

    console.log('Interest rate fetched successfully:', interestRate);

    return new Response(
      JSON.stringify({ 
        interestRate,
        month: firstRecord.fields['Mes'],
        year: firstRecord.fields['Año'],
        name: firstRecord.fields['Name']
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error fetching interest rate:', error);
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
