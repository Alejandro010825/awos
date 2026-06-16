'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  inStock: boolean;
}

interface MetaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<MetaPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en el servidor: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setProducts(json.data);
        setMeta(json.meta);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError("No se pudo conectar con el servidor backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      {}
      <header style={{ borderBottom: '3px solid #005c53', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#005c53', margin: 0, fontSize: '28px' }}>UNIVERSIDAD POLITÉCNICA DE CHIAPAS</h1>
        <p style={{ margin: '5px 0 0 0', color: '#555', fontSize: '14px' }}>
          <strong>Materia:</strong> Aplicaciones Web Orientadas a Servicios (AWOS) | <strong>Grupo:</strong> 4-A
        </p>
        <p style={{ margin: '3px 0 0 0', color: '#777', fontSize: '13px' }}>
          <strong>Desarrolladores:</strong> César Alejandro Castillo Ramírez (Matrícula: 251219)
          <strong> & </strong> Kian lopez Ruiz (Matrícula: 251245)
          <strong> & </strong> Yasleb Belen Macias Sanchez (Matrícula: 251197 )
        </p>
      </header>

      <main>
        <h2 style={{ color: '#333', fontSize: '20px', marginBottom: '15px' }}>
          Catálogo de Productos — Vista del Cliente Web (Next.js)
        </h2>

        {loading && <p style={{ color: '#666', fontStyle: 'italic' }}>Cargando catálogo desde la API...</p>}
        
        {error && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
            <strong>[Error de Conexión]:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ backgroundColor: '#005c53', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID (UUID v4)</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nombre del Artículo</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd' }}>Precio (MXN)</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd' }}>Estatus de Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontSize: '12px', fontFamily: 'monospace', color: '#666', border: '1px solid #ddd' }}>
                      {product.id}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#222', border: '1px solid #ddd' }}>
                      {product.name}
                    </td>
                    <td style={{ padding: '12px', color: '#005c53', fontWeight: '500', border: '1px solid #ddd' }}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <span style={{
                        backgroundColor: product.inStock ? '#e2f0d9' : '#fce4d6',
                        color: product.inStock ? '#385723' : '#c65911',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: 'bold'
                      }}>
                        {product.inStock ? 'EN EXISTENCIA' : 'AGOTADO'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {meta && (
              <div style={{ marginTop: '15px', color: '#666', fontSize: '13px', textAlign: 'right' }}>
                Mostrando página {meta.page} de {meta.totalPages} | Total de registros: {meta.total}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}