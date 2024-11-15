import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetHistorico from '../Hooks/getHistoryHook';
import useGetProducts from '../Hooks/getProductHook';
import useGetSuppliers from '../Hooks/getSupplierHook';

const HomePage = () => {
  const [selectedFilterProduto, setSelectedFilterProduto] = useState<number | string>('');
  const [selectedFilterFornecedor, setSelectedFilterFornecedor] = useState<number | string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { historico, loading, error } = useGetHistorico(
    selectedFilterProduto, 
    selectedFilterFornecedor, 
    selectedDate
  );

  const { produtos } = useGetProducts();
  const { fornecedores } = useGetSuppliers();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Histórico de Compras</h1>

      {/* Navigation buttons */}
      <button onClick={() => navigate('/criar-produto')}>Criar Produto</button>
      <button onClick={() => navigate('/criar-fornecedor')}>Criar Fornecedor</button>
      <button onClick={() => navigate('/comprar-produto')}>Comprar Produto</button>

      {/* Filters */}
      <div>
        <select
          value={selectedFilterProduto}
          onChange={(e) => setSelectedFilterProduto(Number(e.target.value))}
        >
          <option value="">Filtrar por Produto</option>
          {produtos.map((produto) => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.nome_produto}
            </option>
          ))}
        </select>

        <select
          value={selectedFilterFornecedor}
          onChange={(e) => setSelectedFilterFornecedor(Number(e.target.value))}
        >
          <option value="">Filtrar por Fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>
              {fornecedor.nome_fornecedor}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Compra ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Produto</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fornecedor</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Data da Compra</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id_compra}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.produto.nome_produto}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.fornecedor.nome_fornecedor}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {item.data_compra}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default HomePage;
