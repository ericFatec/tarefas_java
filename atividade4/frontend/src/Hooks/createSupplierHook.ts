// src/hooks/useCreateSupplier.ts
import { useState } from 'react';
import axios from 'axios';

const useCreateSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSupplier = async (fornecedorName: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post('http://localhost:3001/fornecedores', { nome_fornecedor: fornecedorName });
    } catch (err) {
      setError('Failed to create supplier');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createSupplier,
    loading,
    error,
  };
};

export default useCreateSupplier;