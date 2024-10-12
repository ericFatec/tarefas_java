var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

var tarefas = [];

app.get('/', function(req, res) {
  var statusFilter = req.query.status;
  var filteredTarefas = tarefas;

  if (statusFilter === 'true') {
      filteredTarefas = tarefas.filter(tarefa => tarefa.ativo === true);
  } else if (statusFilter === 'false') {
      filteredTarefas = tarefas.filter(tarefa => tarefa.ativo === false);
  }

  res.render('index', { tarefas: filteredTarefas });
});

app.get('/tarefa/novo', function(req, res) {
    res.render('form', { errorMessage: null, tarefa: null });
});

app.post('/tarefa', function(req, res) {
  var descricao = req.body.tarefa.descricao;

  var existingTask = tarefas.find(tarefa => tarefa.descricao === descricao);
  if (existingTask) {
      return res.render('form', {
          errorMessage: "Erro: Já existe uma tarefa com esse nome.",
          tarefa: req.body.tarefa
      });
  }

  var tarefa = {
    descricao: descricao,
    ativo: req.body.tarefa.ativo === 'true'
  };
  tarefas.push(tarefa);
  res.redirect('/');
});

app.get('/tarefa/:id/editar', function(req, res) {
  var id = req.params.id;
  res.render('edit', { tarefa: tarefas[id], id: id, errorMessage: null });
});

app.post('/tarefa/:id/editar', function(req, res) {
  var id = req.params.id;
  var descricao = req.body.tarefa.descricao;

  var existingTask = tarefas.find((tarefa, index) => tarefa.descricao === descricao && index !== id);
  if (existingTask) {
      return res.render('edit', {
          errorMessage: "Erro: Já existe uma tarefa com esse nome.",
          tarefa: { descricao, ativo: req.body.tarefa.ativo },
          id: id
      });
  }

  tarefas[id] = {
      descricao: descricao,
      ativo: req.body.tarefa.ativo === 'true'
  };
  res.redirect('/');
});

app.delete('/tarefa/:id', function(req, res) {
    var id = req.params.id;
    tarefas.splice(id, 1);
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("http://127.0.0.1:3000");
});