// src/hooks/useGetSuppliers.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetSuppliers = () => {
  const [fornecedores, setFornecedores] = useState<{ id_fornecedor: number, nome_fornecedor: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fornecedores');
        setFornecedores(response.data.fornecedores); // Extract suppliers array
      } catch (err) {
        setError('Failed to fetch suppliers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  return {
    fornecedores,
    loading,
    error,
  };
};

export default useGetSuppliers;
