var express = require('express');
var router = express.Router();

// DADOS
let listaProfessores = [
  { id: 1, nome: "Jurandy Martins", disciplina: "Arquitetura de Redes de Computadores", foto: "juju.png" },
  { id: 2, nome: "Janduir Egito", disciplina: "Química", foto: "janduiir.png" },
  { id: 3, nome: "Alisson Medeiros", disciplina: "Língua Portuguesa", foto: "alisson.png" },
  { id: 4, nome: "Renan Alves", disciplina: "Banco de Dados", foto: "renan.png" },
  { id: 5, nome: "Aline Gomes", disciplina: "Física", foto: "aline.png" },
  { id: 6, nome: "Antônio Douglas", disciplina: "Filosofia", foto: "douuglas.png" },
  { id: 7, nome: "Lúcia Vieira", disciplina: "Sociologia", foto: "tialucy.png" },
  { id: 8, nome: "Romero Tertulino", disciplina: "Geografia", foto: "romero.png" },
  { id: 9, nome: "Daniel Aguiar", disciplina: "Autoria WEB", foto: "daniel.jpeg" },
  { id: 10, nome: "José Rauryson", disciplina: "Matemática", foto: "raurau.png" },
  { id: 11, nome: "Ricardo Vilar", disciplina: "História", foto: "ricardo.png" },
  { id: 12, nome: "Andrea Pereira", disciplina: "Biologia", foto: "andrea.png" },
  { id: 13, nome: "Antônio Henrique", disciplina: "Língua Inglesa", foto: "enriquei.jpg" },
  { id: 14, nome: "Alison Batista", disciplina: "Educação Física", foto: "lalalisson.png" },
  { id: 15, nome: "Rebeka Carozza", disciplina: "Artes", foto: "rebeka.png" },
  { id: 16, nome: "Zulmar Jofli", disciplina: "Organização e Manutenção de Computadores", foto: "affqsaco.png" }
];

let proximoId = 17;

// LISTAR
router.get('/', function(req, res) {
  res.render('professores/index', { professores: listaProfessores });
});

// CRIAR
router.get('/criar', function(req, res) {
  res.render('professores/form', { title: 'Novo Professor', professor: null });
});

// SALVAR
router.post('/criar', function(req, res) {
  listaProfessores.push({
    id: proximoId++,
    nome: req.body.nome,
    disciplina: req.body.disciplina,
    foto: req.body.foto || "placeholder_prof.png"
  });
  res.redirect('/professores');
});

// EDITAR
router.get('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const professor = listaProfessores.find(p => p.id === id);
  if (professor) res.render('professores/form', { title: 'Editar Professor', professor: professor });
  else res.redirect('/professores');
});

// ATUALIZAR
router.post('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = listaProfessores.findIndex(p => p.id === id);
  if (index !== -1) {
    let fotoNova = req.body.foto;
    if(!fotoNova) fotoNova = listaProfessores[index].foto;

    listaProfessores[index] = { 
        id, 
        nome: req.body.nome,
        disciplina: req.body.disciplina,
        foto: fotoNova
    };
  }
  res.redirect('/professores');
});

// DELETAR
router.get('/deletar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  listaProfessores = listaProfessores.filter(p => p.id !== id);
  res.redirect('/professores');
});

module.exports = router;