var express = require('express');
var router = express.Router();

// DADOS
let listaTreinos = [
  { 
    id: 1, 
    nome: "Treino A", 
    aquecimento: "Caminhada ou bicicleta\nMobilidade de ombros, quadril e joelhos",
    exercicios: "Agachamento livre – 3x12\nSupino (máquina ou halter) – 3x10\nPuxada na frente (pulldown) – 3x10\nDesenvolvimento de ombros – 3x10\nRosca bíceps – 2x12\nTríceps na polia ou banco – 2x12\nPrancha abdominal – 3x20–30s",
    descanso: "60–90s entre séries"
  },
  { 
    id: 2, 
    nome: "Treino B", 
    aquecimento: "Bicicleta ou esteira\nAlongamentos dinâmicos",
    exercicios: "Leg press ou agachamento – 3x12\nRemada baixa ou com halter – 3x10\nFlexão de braço (ou joelhos apoiados) – 3x8–10\nElevação lateral de ombros – 3x12\nAbdominal crunch – 3x15\nElevação de quadril (glúteos) – 3x12",
    descanso: "60–90s entre séries"
  }
];

let proximoId = 3;

// LISTAR
router.get('/', function(req, res) {
  res.render('treinos/index', { treinos: listaTreinos });
});

// CRIAR
router.get('/criar', function(req, res) {
  res.render('treinos/form', { title: 'Novo Treino', treino: null });
});

// SALVAR
router.post('/criar', function(req, res) {
  listaTreinos.push({
    id: proximoId++,
    nome: req.body.nome,
    aquecimento: req.body.aquecimento,
    exercicios: req.body.exercicios,
    descanso: req.body.descanso
  });
  res.redirect('/treinos');
});

// EDITAR
router.get('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const treino = listaTreinos.find(t => t.id === id);
  if (treino) res.render('treinos/form', { title: 'Editar Treino', treino: treino });
  else res.redirect('/treinos');
});

// ATUALIZAR
router.post('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = listaTreinos.findIndex(t => t.id === id);
  if (index !== -1) {
    listaTreinos[index].nome = req.body.nome;
    listaTreinos[index].aquecimento = req.body.aquecimento;
    listaTreinos[index].exercicios = req.body.exercicios;
    listaTreinos[index].descanso = req.body.descanso;
  }
  res.redirect('/treinos');
});

// DELETAR
router.get('/deletar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = listaTreinos.findIndex(t => t.id === id);
  
  if (index !== -1) {
    listaTreinos.splice(index, 1);
  }
  
  res.redirect('/treinos');
});

module.exports = {
    router: router,
    listaTreinos: listaTreinos
};