const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const db = require('./db.js')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

// Rota para listar registros
app.get('/', (req, res) => {
  const minPrice = parseFloat(req.query.minPrice) || 0

  // Query to get the supplier counts
  const countQuery = `
    SELECT fornecedores.id_fornecedor, fornecedores.nome_fornecedor, 
           COUNT(produtos.id_produto) AS num_produtos
    FROM fornecedores
    LEFT JOIN produtos ON fornecedores.id_fornecedor = produtos.id_fornecedor
    GROUP BY fornecedores.id_fornecedor, fornecedores.nome_fornecedor;
  `;

  // Query to get products with price above the minimum value
  const productsQuery = `
    SELECT fornecedores.nome_fornecedor, produtos.nome_produto, 
           produtos.preco
    FROM produtos
    JOIN fornecedores ON produtos.id_fornecedor = fornecedores.id_fornecedor
    WHERE produtos.preco >= ?
  `;

  db.query(countQuery, (err, supplierCounts) => {
    if (err) {
      console.error('Erro ao buscar contagem de produtos: ', err);
      res.status(500).send('Erro ao buscar fornecedores');
      return;
    }

    db.query(productsQuery, [minPrice], (err, filteredProducts) => {
      if (err) {
        console.error('Erro ao buscar produtos: ', err);
        res.status(500).send('Erro ao buscar produtos');
        return;
      }

      // Render the index.ejs template and pass the results
      res.render('index', { supplierCounts, filteredProducts, minPrice });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})