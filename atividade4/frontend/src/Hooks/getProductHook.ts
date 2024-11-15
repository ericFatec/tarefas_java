// src/hooks/useGetProducts.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetProducts = () => {
  const [produtos, setProdutos] = useState<{ id_produto: number, nome_produto: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/produtos');
        setProdutos(response.data.produtos); // Extract products array
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return {
    produtos,
    loading,
    error,
  };
};

export default useGetProducts;
