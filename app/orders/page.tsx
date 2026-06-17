"use client";

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Mis Órdenes</h1>
      
      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <p className="text-gray-600">Inicia sesión para ver tu historial de compras.</p>
        <p className="text-sm text-gray-400 mt-4">(Esta vista requeriría un token real de usuario para cargar los datos desde la API).</p>
      </div>
    </div>
  );
}
