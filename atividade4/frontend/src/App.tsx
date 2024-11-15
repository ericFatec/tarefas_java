// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CriarProdutoPage from './components/CriarProdutoPage';
import CriarFornecedorPage from './components/CriarFornecedorPage';
import ComprarProdutoPage from './components/ComprarProdutoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criar-produto" element={<CriarProdutoPage />} />
        <Route path="/criar-fornecedor" element={<CriarFornecedorPage />} />
        <Route path="/comprar-produto" element={<ComprarProdutoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
