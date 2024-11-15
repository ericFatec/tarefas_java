// src/pages/CriarProdutoPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../Hooks/createProductHook';

const CriarProdutoPage = () => {
  const [produtoName, setProdutoName] = useState('');
  const { createProduct, loading, error } = useCreateProduct();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (produtoName) {
      try {
        await createProduct(produtoName);
        navigate('/');
      } catch (error) {
        console.error('Erro ao criar produto.', error);
      }
    } else {
      alert('Nome do produto inválido.');
    }
  };

  return (
    <div>
      <h1>Criar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={produtoName}
          onChange={(e) => setProdutoName(e.target.value)}
          placeholder="Nome do Produto"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Criando Produto ...' : 'Criar Produto'}
        </button>
      </form>

      {error && <p>Error: {error}</p>}

      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
};

export default CriarProdutoPage;
