// src/hooks/useCreateHistorico.ts
import { useState } from 'react';
import axios from 'axios';

const useCreateHistorico = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHistorico = async (idProduto: number, idFornecedor: number) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post('http://localhost:3001/historico', { id_produto: idProduto, id_fornecedor: idFornecedor });
    } catch (err) {
      setError('Failed to create purchase history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createHistorico,
    loading,
    error,
  };
};

export default useCreateHistorico;
