import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetHistorico = (produtoId: number | string, fornecedorId: number | string, date: string) => {
  const [historico, setHistorico] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        setLoading(true);
        setError(null);

        // If either produtoId or fornecedorId is missing, fetch all data
        const params: any = {};
        
        if (produtoId) {
          params.produto = produtoId;
        }
        
        if (fornecedorId) {
          params.fornecedor = fornecedorId;
        }
        
        if (date) {
          params.date = date;
        }

        const response = await axios.get('http://localhost:3001/historico', {
          params: params,
        });

        setHistorico(response.data.historico);  // Update the state with the received data
      } catch (err) {
        setError('Failed to fetch purchase history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [produtoId, fornecedorId, date]);  // Fetch when these values change

  return {
    historico,
    loading,
    error,
  };
};

export default useGetHistorico;