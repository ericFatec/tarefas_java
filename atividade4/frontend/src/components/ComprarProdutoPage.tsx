import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetProducts from '../Hooks/getProductHook';
import useGetSuppliers from '../Hooks/getSupplierHook';
import useCreateHistorico from '../Hooks/createHistoryHook';

const ComprarProdutoPage = () => {
  const { produtos } = useGetProducts();
  const { fornecedores } = useGetSuppliers();
  const { createHistorico, loading: creatingHistorico, error: createError } = useCreateHistorico();
  
  const [selectedProduto, setSelectedProduto] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduto && selectedFornecedor) {
      try {
        await createHistorico(Number(selectedProduto), Number(selectedFornecedor));
        navigate('/');
      } catch (error) {
        console.error('Erro ao comprar produto.', error);
      }
    } else {
      alert('Por favor preencha todos os campos.');
    }
  };

  return (
    <div>
      <h1>Comprar Produto</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedProduto}
          onChange={(e) => setSelectedProduto(e.target.value)}
        >
          <option value="">Selecionar Produto</option>
          {produtos && produtos.map((produto) => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.nome_produto}
            </option>
          ))}
        </select>

        <select
          value={selectedFornecedor}
          onChange={(e) => setSelectedFornecedor(e.target.value)}
        >
          <option value="">Selecionar Fornecedor</option>
          {fornecedores && fornecedores.map((fornecedor) => (
            <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>
              {fornecedor.nome_fornecedor}
            </option>
          ))}
        </select>

        <button type="submit" disabled={creatingHistorico}>
          {creatingHistorico ? 'Processando...' : 'Comprar'}
        </button>
      </form>

      {createError && <p>Error: {createError}</p>}

      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
};

export default ComprarProdutoPage;
