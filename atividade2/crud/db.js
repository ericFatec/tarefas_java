const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
})

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err)
    return
  }
  console.log('Conectado ao MySQL')
})

db.query('CREATE DATABASE IF NOT EXISTS crud', (err, result) => {
  if (err) {
    console.error('Erro ao criar banco de dados:', err)
    return
  }
  console.log('Banco de dados "crud" garantido ou já existente.')
  
  // Now switch to using the database
  db.query('USE crud', (err) => {
    if (err) {
      console.error('Erro ao selecionar o banco de dados:', err)
      return
    }
    var sql = `CREATE TABLE IF NOT EXISTS fornecedores (
      id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
      nome_fornecedor VARCHAR(100)
     )`

    db.query(sql, (err, result) => {
    if (err) {
    console.error('Erro ao criar a tabela: ',err)
    return
    }
    console.log('Tabela "fornecedores" garantida ou já existente.')
    })

    var sqlCheckFornecedores = `SELECT COUNT(*) AS count FROM fornecedores`;

    db.query(sqlCheckFornecedores, (err, result) => {
    if (err) {
    console.error('Erro ao verificar tabela "fornecedores": ', err);
    return;
    }

    if (result[0].count === 0) {
    var sqlInsertFornecedores = `INSERT INTO fornecedores (nome_fornecedor) 
                              VALUES 
                              ('Fornecedor A'), 
                              ('Fornecedor B'), 
                              ('Fornecedor C')`;

    db.query(sqlInsertFornecedores, (err, result) => {
    if (err) {
      console.error('Erro ao inserir fornecedores: ', err);
      return;
    }
    console.log('Fornecedores inseridos com sucesso: ', result);
    });
    } else {
    console.log('A tabela "fornecedores" já contém registros.');
    }
    });

    var sql = `CREATE TABLE IF NOT EXISTS produtos (
          id_produto INT AUTO_INCREMENT PRIMARY KEY,
          nome_produto VARCHAR(100),
          preco DECIMAL(7,2),
          id_fornecedor INT,
          FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id_fornecedor)
        )`

    db.query(sql, (err, result) => {
    if (err) {
    console.error('Erro ao criar a tabela: ',err)
    return
    }
    console.log('Tabela "produtos" garantida ou já existente.')
    })
  })
})

module.exports = db