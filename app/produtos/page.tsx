'use client'
import { Product } from '../models/interfaces'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function page() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  if (isLoading) return <div>Carregando produtos...</div>;
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

            <p>Preço: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <div>Nenhum produto encontrado.</div>
      )}
    </div>
  );


}
