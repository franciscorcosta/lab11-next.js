'use client'
import { Product } from '../models/interfaces'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  if (!data && !error) return <div>Carregando produtos...</div>;  // Espera carregar os dados ou lidar com erro
  if (error) return <div>Erro ao carregar os produtos.</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              maxWidth: '400px',
            }}
          >
            <h2>{product.title}</h2>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />

            <p>Preço: €{product.price}</p>
            <p>{product.description}</p>
            <p>
              Avaliação: {product.rating.rate} ⭐ ({product.rating.count} avaliações)
            </p>

            <p>{ }</p>
          </div>
        ))
      ) : (
        <div>Nenhum produto encontrado.</div>
      )}
    </div>
  );
}
