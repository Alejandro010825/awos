"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/v1/products');
        if (!response.ok) throw new Error("Error al obtener los productos");
        
        const json = await response.json();
        setProducts(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Nuestra Tienda
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Explora nuestra selección de artículos disponibles.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No hay productos disponibles por el momento.
          </div>
        )}

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Imagen Placeholder */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <span className="text-gray-400 font-medium">Sin imagen</span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {product.inStock ? 'En stock' : 'Agotado'}
                  </span>
                </div>
                
                <div className="mt-4 flex items-end justify-between flex-grow">
                  <p className="text-2xl font-bold text-indigo-600">
                    ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </p>
                  <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
