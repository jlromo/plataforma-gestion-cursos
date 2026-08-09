import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protege todo el sitio con usuario/contraseña simples (HTTP Basic Auth).
// Si SITE_USER/SITE_PASSWORD no están configurados (desarrollo local por
// defecto), no se exige autenticación.
export function proxy(request: NextRequest) {
  const usuario = process.env.SITE_USER;
  const contrasena = process.env.SITE_PASSWORD;

  if (!usuario || !contrasena) {
    return NextResponse.next();
  }

  const encabezado = request.headers.get("authorization");
  if (encabezado?.startsWith("Basic ")) {
    const decodificado = Buffer.from(encabezado.slice(6), "base64").toString();
    const separador = decodificado.indexOf(":");
    const usuarioEnviado = decodificado.slice(0, separador);
    const contrasenaEnviada = decodificado.slice(separador + 1);

    if (usuarioEnviado === usuario && contrasenaEnviada === contrasena) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Plataforma de Gestión de Cursos"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
