import { useState } from 'react';
import axios from 'axios';

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (produtoName: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post('http://localhost:3001/produtos', { nome_produto: produtoName });
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error,
  };
};

export default useCreateProduct;