// src/app/api/reservar/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userData, sorteoId, numeros, metodoPago, total } = body;

    // 1. Buscar o Crear el Cliente
    let clienteId;
    const { data: clienteExistente } = await supabaseAdmin
      .from('clientes')
      .select('id')
      .eq('email', userData.email)
      .single();

    if (clienteExistente) {
      clienteId = clienteExistente.id;
    } else {
      const { data: nuevoCliente, error: errorCliente } = await supabaseAdmin
        .from('clientes')
        .insert([{
          email: userData.email,
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          telefono: userData.telefono,
          pais: userData.pais,
          provincia: userData.provincia,
          ciudad: userData.ciudad
        }])
        .select()
        .single();

      if (errorCliente) throw new Error(`Error al crear cliente: ${errorCliente.message}`);
      clienteId = nuevoCliente.id;
    }

    // 2. Crear el Pedido
    const { data: pedido, error: errorPedido } = await supabaseAdmin
      .from('pedidos')
      .insert([{
        cliente_id: clienteId,
        sorteo_id: sorteoId,
        metodo_pago: metodoPago,
        total_pagar: total,
        estado_pago: 'pendiente' // Empieza como pendiente hasta verificar el pago
      }])
      .select()
      .single();

    if (errorPedido) throw new Error(`Error al crear pedido: ${errorPedido.message}`);

    // 3. Insertar los Boletos
    const boletosInsert = numeros.map(num => ({
      pedido_id: pedido.id,
      sorteo_id: sorteoId,
      numero: num,
      estado: 'reservado'
    }));

    const { error: errorBoletos } = await supabaseAdmin
      .from('boletos')
      .insert(boletosInsert);

    // Si ocurre un error aquí (ej. alguien ya compró el número al mismo tiempo),
    // saltará el error gracias al UNIQUE(sorteo_id, numero) de tu base de datos.
    if (errorBoletos) {
      // Opcional: Podrías borrar el pedido creado para no dejar basura en la BD
      await supabaseAdmin.from('pedidos').delete().eq('id', pedido.id);
      throw new Error(`Uno o más números ya fueron tomados. Intenta de nuevo.`);
    }

    return NextResponse.json({ success: true, pedidoId: pedido.id }, { status: 200 });

  } catch (error) {
    console.error("Error en reserva:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}