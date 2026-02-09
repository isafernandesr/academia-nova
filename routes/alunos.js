var express = require('express');
var router = express.Router();

var { listaTreinos } = require('./treinos');

// DADOS
let listaAlunos = [
  { id: 1, nome: "Maria Luisa", idade: 18, aniversario: "24/05/2007", gosta: "escutar músicas", plano: "alcançar as alturas, viajar e ser feliz" },
  { id: 2, nome: "Afonso", idade: 18, aniversario: "19/06/2007", gosta: "praticar esportes", plano: "trabalhar com música e viver intensamente" },
  { id: 3, nome: "Davi", idade: 17, aniversario: "08/09/2007", gosta: "amo a instituição em que estudo", plano: "pretendo ter uma vida de conquistas" },
  { id: 4, nome: "Vinícius Costa", idade: 17, aniversario: "11/11/2007", gosta: "jogar e assistir filmes/séries", plano: "emprego e vida bem sucedida" },
  { id: 5, nome: "Lucas", idade: 18, aniversario: "18/02/2007", gosta: "RPG, programar e escrever", plano: "transformar paixões em projetos" },
  { id: 6, nome: "Harlley", idade: 17, aniversario: "01/05/2008", gosta: "jogar qualquer esporte", plano: "ganhar dinheiro para ajudar pessoas" },
  { id: 7, nome: "Julio", idade: 19, aniversario: "30/10/2006", gosta: "Desenhar e ler", plano: "Viajar para outro país" },
  { id: 8, nome: "Guilherme", idade: 17, aniversario: "27/12/2007", gosta: "jogar videogame", plano: "virar um bom professor" },
  { id: 9, nome: "Cauã", idade: 19, aniversario: "28/09/2005", gosta: "programar, jogar, novas ideias", plano: "vida simples fazendo o que gosto" },
  { id: 10, nome: "Bruno", idade: 17, aniversario: "...", gosta: "videogame, xadrez, lives do Alanzoka", plano: "ser minha melhor versão" },
  { id: 11, nome: "Vitória", idade: 18, aniversario: "07/03/2007", gosta: "brawl stars, dançar e cantar", plano: "aproveitar a vida ao máximo" },
  { id: 12, nome: "Breno", idade: 19, aniversario: "30/08/2006", gosta: "programar e escrever", plano: "viver confortavelmente fazendo o que gosto" },
  { id: 13, nome: "Fabiana", idade: 18, aniversario: "15/12/2006", gosta: "Desenhar, ler, cosplay", plano: "Restaurante com Animatronics no Brasil" },
  { id: 14, nome: "Vinícius Alves", idade: 18, aniversario: "19/06/2007", gosta: "cinema", plano: "historiador ou diplomata" },
  { id: 15, nome: "Adriely", idade: 17, aniversario: "28/10/2007", gosta: "Jogar vôlei", plano: "Passar na AFA" },
  { id: 16, nome: "Alicia", idade: 19, aniversario: "06/04/2006", gosta: "?", plano: "?" },
  { id: 17, nome: "Amilton", idade: 18, aniversario: "16/04/2007", gosta: "Correr e jogar tênis de mesa", plano: "Viajar o mundo comendo comidas típicas" },
  { id: 18, nome: "Antony", idade: 17, aniversario: "18/12/2007", gosta: "Filmes, séries, biologia e química", plano: "Passar no vestibular" },
  { id: 19, nome: "Edvan", idade: 17, aniversario: "19/02/2008", gosta: "Músicas, livros, filmes", plano: "Ir ao show da Taylor Swift" },
  { id: 20, nome: "Geovana", idade: 18, aniversario: "19/06/2007", gosta: "cinema", plano: "historiador ou diplomata" },
  { id: 21, nome: "Ingrid", idade: 17, aniversario: "06/08/2007", gosta: "Viajar, estudar, pintar", plano: "Formar familia e viajar o mundo" },
  { id: 22, nome: "Isadora", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 23, nome: "Jade", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 24, nome: "Julia", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 25, nome: "Kael", idade: 18, aniversario: "27/04/2007", gosta: "Artes (música, dança, teatro)", plano: "Ser professora de história no IF" },
  { id: 26, nome: "Ketlyn", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 27, nome: "Maria Gabriella", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 28, nome: "Marina", idade: 17, aniversario: "05/11/2007", gosta: "Dormir, filmes e editar", plano: "Viajar para fora do Brasil" },
  { id: 29, nome: "Matheus", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 30, nome: "Mikelly", idade: 17, aniversario: "16/05/2008", gosta: "Idiomas, ler, geopolítica", plano: "Estudar em outro país" },
  { id: 31, nome: "Radmila", idade: 18, aniversario: "02/06/2007", gosta: "Chocolate, greys anatomy e viajar", plano: "Ser bem sucedida e ter familia" },
  { id: 32, nome: "Ramon", idade: 17, aniversario: "30/10/2007", gosta: "Instrumentos, bíblia e pedalar", plano: "Viajar para muitos lugares" }
];

let proximoId = 33;

// VALIDAÇÃO
function validarDados(body) {
    const erros = [];
    if (!body.nome || body.nome.trim().length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
    if (!body.idade || isNaN(body.idade) || parseInt(body.idade) <= 0) erros.push("A idade deve ser um número válido.");
    
    if (!body.aniversario) erros.push("A data de aniversário é obrigatória.");
    
    return erros;
}

// LISTAR
router.get('/', function(req, res) {
  res.render('alunos/index', { alunos: listaAlunos });
});

// CRIAR
router.get('/criar', function(req, res) {
  res.render('alunos/form', { 
      title: 'Novo Aluno', 
      aluno: null, 
      erros: [],
      treinos: listaTreinos
  });
});

// SALVAR
router.post('/criar', function(req, res) {
  const erros = validarDados(req.body);

  // Se der erro na validação:
  if (erros.length > 0) {
    return res.render('alunos/form', { 
        title: 'Novo Aluno', 
        aluno: req.body,
        erros: erros,
        treinos: listaTreinos
    });
  }

  listaAlunos.push({
    id: proximoId++,
    nome: req.body.nome,
    idade: req.body.idade,
    aniversario: req.body.aniversario,
    gosta: req.body.gosta,
    sonho: req.body.sonho,
    treino_id: parseInt(req.body.treino_id) || null
  });
  
  res.redirect('/alunos');
});

// EDITAR 
router.get('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const aluno = listaAlunos.find(a => a.id === id);
  
  if (aluno) {
      res.render('alunos/form', { 
          title: 'Editar Aluno', 
          aluno: aluno, 
          erros: [], 
          treinos: listaTreinos
      });
  } else {
      res.redirect('/alunos');
  }
});

// ATUALIZAR
router.post('/editar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = listaAlunos.findIndex(a => a.id === id);
  const erros = validarDados(req.body);

  if (erros.length > 0) {
      const dadosComId = { id: id, ...req.body }; 
      return res.render('alunos/form', { 
          title: 'Editar Aluno', 
          aluno: dadosComId, 
          erros: erros,
          treinos: listaTreinos 
      });
  }

  if (index !== -1) {
    listaAlunos[index] = { 
        id, 
        ...req.body,
        treino_id: parseInt(req.body.treino_id) || null
    };
  }
  res.redirect('/alunos');
});

// DELETAR
router.get('/deletar/:id', function(req, res) {
  const id = parseInt(req.params.id);
  listaAlunos = listaAlunos.filter(a => a.id !== id);
  res.redirect('/alunos');
});

module.exports = router;