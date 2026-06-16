import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const idParam = searchParams.get('id'); // Simulación para pruebas por query string


  if (idParam === 'inexistente') {
    return NextResponse.json({
      code: "RESOURCE_NOT_FOUND",
      message: "El identificador único provisto en la ruta no corresponde a ningún elemento del servidor.",
      details: [{ field: "id", rule: "not_found" }]
    }, { status: 404, headers: corsHeaders });
  }

  if (search && search !== 'Teclado') {
    return NextResponse.json({
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 }
    }, { status: 200, headers: corsHeaders });
  }

  return NextResponse.json({
    data: [
      {
        id: "7b2d56a1-c34e-4b6f-821a-9a0b1c2d3e4f",
        name: "Teclado Mecánico Inalámbrico",
        price: 1450.00,
        categoryId: "33a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
        inStock: true
      }
    ],
    meta: { page: 1, limit: 10, total: 1, totalPages: 1 }
  }, { status: 200, headers: corsHeaders });
}


export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      code: "AUTH_TOKEN_MISSING_OR_INVALID",
      message: "Credenciales ausentes o firma de token expirada.",
      details: [{ field: "Authorization", rule: "required_bearer_token" }]
    }, { status: 401, headers: corsHeaders });
  }

  const token = authHeader.split(' ')[1];

  if (token === 'token-corrupto') {
    return NextResponse.json({
      code: "AUTH_TOKEN_MISSING_OR_INVALID",
      message: "Token inválido o expirado.",
      details: [{ field: "Authorization", rule: "invalid_signature" }]
    }, { status: 401, headers: corsHeaders });
  }

  
  if (token === 'client-token') {
    return NextResponse.json({
      code: "INSUFFICIENT_PERMISSIONS",
      message: "El rol vinculado al token de usuario no posee los permisos de escritura del endpoint.",
      details: [{ field: "role", rule: "requires_admin" }]
    }, { status: 403, headers: corsHeaders });
  }

  try {
    const body = await request.json();

  
    if (body.price <= 0 || (body.items && body.items.length === 0)) {
      return NextResponse.json({
        code: "VALIDATION_FAILED",
        message: "Los parámetros del payload no cumplen con las reglas de negocio.",
        details: [{ field: body.price <= 0 ? "price" : "items", rule: "invalid_value" }]
      }, { status: 422, headers: corsHeaders });
    }

    return NextResponse.json({
      id: "e4f3d2c1-b0a9-98f7-65e4-3210fedcba98",
      status: "PENDING",
      ...body,
      createdAt: new Date().toISOString()
    }, { status: 201, headers: corsHeaders });

  } catch {
    return NextResponse.json({ code: "BAD_REQUEST", message: "JSON mal formado." }, { status: 400, headers: corsHeaders });
  }
}


export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.includes('admin-token')) {
    return NextResponse.json({ code: "INSUFFICIENT_PERMISSIONS", message: "Solo el administrador puede mutar estados." }, { status: 403, headers: corsHeaders });
  }

  try {
    const body = await request.json();

    if (body.status === 'SHIPPED') {
      return NextResponse.json({
        code: "INVALID_STATE_TRANSITION",
        message: "La petición rompe el ciclo de vida o los pasos lógicos del negocio.",
        details: [{ field: "status", rule: "cannot_skip_paid_state" }]
      }, { status: 409, headers: corsHeaders });
    }

    return NextResponse.json({
      id: "order-uuid-v4-1111",
      status: body.status,
      message: "Estado modificado con éxito."
    }, { status: 200, headers: corsHeaders });

  } catch {
    return NextResponse.json({ code: "BAD_REQUEST", message: "JSON inválido." }, { status: 400, headers: corsHeaders });
  }
}