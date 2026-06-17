"use client";

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Mis Órdenes</h1>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold">Orden #ORD-8829</h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">SHIPPED</span>
          </div>
          <p className="text-gray-700">Fecha: 15 de Junio, 2026</p>
          <p className="text-gray-700">Total: $4,050.50</p>
        </div>

        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold">Orden #ORD-9910</h2>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">PENDING</span>
          </div>
          <p className="text-gray-700">Fecha: 16 de Junio, 2026</p>
          <p className="text-gray-700">Total: $1,450.00</p>
        </div>
      </div>
    </div>
  );
}
