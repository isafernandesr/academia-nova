var express = require('express');
var router = express.Router();
var db = require('../config/database');

function validarDados(body) {
    const erros = [];
    if (!body.nome || body.nome.trim().length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
    if (!body.idade || isNaN(body.idade) || parseInt(body.idade) <= 0) erros.push("A idade deve ser um número válido.");
    if (!body.aniversario) erros.push("A data de aniversário é obrigatória.");
    return erros;
}

router.get('/', function(req, res) {
    const sql = `SELECT id_matricula as id, nome_aluno as nome, idade, data_nascimento as aniversario, gosta, sonho, id_treino as treino_id FROM aluno`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao buscar alunos");
        }
        res.render('alunos/index', { alunos: rows });
    });
});

router.get('/criar', function(req, res) {
    db.all(`SELECT id_treino as id, nome FROM treino`, [], (err, treinos) => {
        res.render('alunos/form', { 
            title: 'Novo Aluno', 
            aluno: null, 
            erros: [],
            treinos: treinos || [] 
        });
    });
});

router.post('/criar', function(req, res) {
    const erros = validarDados(req.body);

    if (erros.length > 0) {
        return db.all(`SELECT id_treino as id, nome FROM treino`, [], (err, treinos) => {
            res.render('alunos/form', { 
                title: 'Novo Aluno', 
                aluno: req.body,
                erros: erros,
                treinos: treinos || []
            });
        });
    }

    const sql = `INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, id_treino) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
        req.body.nome, 
        req.body.idade, 
        req.body.aniversario, 
        req.body.gosta, 
        req.body.sonho || req.body.plano, 
        req.body.treino_id || null
    ];

    db.run(sql, params, function(err) {
        if (err) return console.log(err.message);
        res.redirect('/alunos');
    });
});

router.get('/editar/:id', function(req, res) {
    const id = req.params.id;
    const sqlAluno = `SELECT id_matricula as id, nome_aluno as nome, idade, data_nascimento as aniversario, gosta, sonho, id_treino as treino_id FROM aluno WHERE id_matricula = ?`;
    
    db.get(sqlAluno, [id], (err, aluno) => {
        if (!aluno) return res.redirect('/alunos');

        db.all(`SELECT id_treino as id, nome FROM treino`, [], (err, treinos) => {
            res.render('alunos/form', { 
                title: 'Editar Aluno', 
                aluno: aluno, 
                erros: [], 
                treinos: treinos || []
            });
        });
    });
});

router.post('/editar/:id', function(req, res) {
    const id = req.params.id;
    const erros = validarDados(req.body);

    if (erros.length > 0) {
        return db.all(`SELECT id_treino as id, nome FROM treino`, [], (err, treinos) => {
            const dadosComId = { id: id, ...req.body };
            res.render('alunos/form', { 
                title: 'Editar Aluno', 
                aluno: dadosComId, 
                erros: erros,
                treinos: treinos || []
            });
        });
    }

    const sql = `UPDATE aluno SET nome_aluno = ?, idade = ?, data_nascimento = ?, gosta = ?, sonho = ?, id_treino = ? WHERE id_matricula = ?`;
    const params = [
        req.body.nome,
        req.body.idade,
        req.body.aniversario,
        req.body.gosta,
        req.body.sonho || req.body.plano,
        req.body.treino_id || null,
        id
    ];

    db.run(sql, params, function(err) {
        if (err) console.error(err.message);
        res.redirect('/alunos');
    });
});

router.get('/deletar/:id', function(req, res) {
    const id = req.params.id;
    db.run(`DELETE FROM aluno WHERE id_matricula = ?`, [id], (err) => {
        if (err) console.error(err.message);
        res.redirect('/alunos');
    });
});

module.exports = router;