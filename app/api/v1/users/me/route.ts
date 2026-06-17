import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      code: "AUTH_TOKEN_MISSING_OR_INVALID",
      message: "Credenciales ausentes o firma de token expirada.",
      details: [{ field: "Authorization", rule: "required_bearer_token" }]
    }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // Devuelve datos mockeados dependiendo del token para facilitar pruebas
  if (token === 'admin-token') {
    return NextResponse.json({
      id: "admin-uuid-1111",
      email: "admin@tienda.com",
      role: "ADMIN"
    }, { status: 200 });
  }

  if (token.startsWith('client-token')) {
    return NextResponse.json({
      id: token.replace('client-token-', ''),
      email: "cliente@correo.com",
      role: "CLIENT"
    }, { status: 200 });
  }

  return NextResponse.json({
    code: "AUTH_TOKEN_MISSING_OR_INVALID",
    message: "El token enviado no es válido.",
    details: []
  }, { status: 401 });
}
