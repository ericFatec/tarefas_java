// src/pages/CriarFornecedorPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateSupplier from '../Hooks/createSupplierHook';

const CriarFornecedorPage = () => {
  const [fornecedorName, setFornecedorName] = useState('');
  const { createSupplier, loading, error } = useCreateSupplier();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fornecedorName) {
      try {
        await createSupplier(fornecedorName);
        navigate('/');
      } catch (error) {
        console.error('Erro ao criar fornecedor.', error);
      }
    } else {
      alert('Nome do fornecedor inválido.');
    }
  };

  return (
    <div>
      <h1>Criar Fornecedor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fornecedorName}
          onChange={(e) => setFornecedorName(e.target.value)}
          placeholder="Nome do Fornecedor"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Criando fornecedor ...' : 'Criar Fornecedor'}
        </button>
      </form>

      {error && <p>Error: {error}</p>}

      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
};

export default CriarFornecedorPage;
