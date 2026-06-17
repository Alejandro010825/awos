"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/v1/categories');
        if (!response.ok) throw new Error("Error al obtener las categorías");
        
        const json = await response.json();
        setCategories(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Categorías</h1>
      
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-gray-500 mt-2 text-sm">Ver productos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
