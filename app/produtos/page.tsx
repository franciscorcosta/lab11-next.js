'use client'
import { Product } from '../models/interfaces'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  if (!data && !error) return <div className="text-center mt-10">Carregando produtos...</div>;
  if (error) return <div className="text-center mt-10">Erro ao carregar os produtos.</div>;

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h2>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-700 text-sm mb-2">Preço: €{product.price}</p>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-gray-600 text-sm">
                Avaliação: {product.rating.rate} ⭐ ({product.rating.count} avaliações)
              </p>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">Nenhum produto encontrado.</div>
        )}
      </div>
    </main>
  );
}
