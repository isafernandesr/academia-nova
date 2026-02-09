var express = require('express');
var router = express.Router();
var db = require('../config/database');

// LISTAR
router.get('/', function(req, res) {
  const sql = `SELECT id_treino as id, nome, aquecimento, exercicios, descanso FROM treino`;
  
  db.all(sql, [], (err, rows) => {
      if (err) return console.log(err);
      res.render('treinos/index', { treinos: rows });
  });
});

// CRIAR
router.get('/criar', function(req, res) {
  res.render('treinos/form', { title: 'Novo Treino', treino: null });
});

// SALVAR
router.post('/criar', function(req, res) {
  const sql = `INSERT INTO treino (nome, aquecimento, exercicios, descanso) VALUES (?, ?, ?, ?)`;
  const params = [req.body.nome, req.body.aquecimento, req.body.exercicios, req.body.descanso];

  db.run(sql, params, function(err) {
      if (err) return console.log(err.message);
      res.redirect('/treinos');
  });
});

// EDITAR
router.get('/editar/:id', function(req, res) {
  const id = req.params.id;
  const sql = `SELECT id_treino as id, nome, aquecimento, exercicios, descanso FROM treino WHERE id_treino = ?`;

  db.get(sql, [id], (err, treino) => {
      if (!treino) return res.redirect('/treinos');
      res.render('treinos/form', { title: 'Editar Treino', treino: treino });
  });
});

// ATUALIZAR
router.post('/editar/:id', function(req, res) {
  const id = req.params.id;
  const sql = `UPDATE treino SET nome = ?, aquecimento = ?, exercicios = ?, descanso = ? WHERE id_treino = ?`;
  const params = [req.body.nome, req.body.aquecimento, req.body.exercicios, req.body.descanso, id];

  db.run(sql, params, function(err) {
      if (err) return console.log(err.message);
      res.redirect('/treinos');
  });
});

// DELETAR
router.get('/deletar/:id', function(req, res) {
  const id = req.params.id;

  db.serialize(() => {
      db.run(`UPDATE aluno SET id_treino = NULL WHERE id_treino = ?`, [id], (err) => {
          if (err) console.error("Erro ao desvincular alunos:", err.message);
      });

      db.run(`DELETE FROM treino WHERE id_treino = ?`, [id], (err) => {
          if (err) {
              console.error("Erro ao deletar treino:", err.message);
          }
          res.redirect('/treinos');
      });
  });
});
module.exports = { router };