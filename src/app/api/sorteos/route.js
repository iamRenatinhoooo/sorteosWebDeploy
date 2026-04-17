// src/app/api/sorteos/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase"; // Ajusta la ruta según dónde creaste el archivo

export async function GET() {
  try {
    // Obtenemos todos los sorteos
    const { data: sorteos, error: sorteosError } = await supabaseAdmin
      .from('sorteos')
      .select('*')
      .order('created_at', { ascending: false });

    if (sorteosError) throw sorteosError;

    // También necesitamos saber qué números ya están ocupados (reservados o pagados)
    const { data: boletosOcupados, error: boletosError } = await supabaseAdmin
      .from('boletos')
      .select('sorteo_id, numero');

    if (boletosError) throw boletosError;

    // Mapeamos los datos para devolver algo similar a lo que ya usas en el front
    const responseData = sorteos.map(sorteo => {
      const ocupados = boletosOcupados
        .filter(b => b.sorteo_id === sorteo.id)
        .map(b => b.numero);

      return {
        ...sorteo,
        numerosOcupados: ocupados
      };
    });

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}