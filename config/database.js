const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../academia.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        inicializarBanco();
    }
});

function inicializarBanco() {
    db.serialize(() => {
        // Habilita chaves estrangeiras
        db.run("PRAGMA foreign_keys = ON");

        // 1. Tabela Treino
        db.run(`CREATE TABLE IF NOT EXISTS treino (
            id_treino INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(50),
            aquecimento TEXT,
            exercicios TEXT,
            descanso VARCHAR(100)
        )`);

        // 2. Tabela Aluno
        db.run(`CREATE TABLE IF NOT EXISTS aluno (
            id_matricula INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_aluno VARCHAR(100),
            idade INT,
            email VARCHAR(100),
            data_nascimento VARCHAR(20),
            gosta TEXT,
            sonho TEXT,
            id_treino INT,
            FOREIGN KEY (id_treino) REFERENCES treino(id_treino)
        )`);

        // --- SEEDS (Dados Iniciais com Verificação) ---

        // Verifica se existem treinos. Se qtd for 0, insere.
        db.get("SELECT count(*) as qtd FROM treino", (err, row) => {
            if (err) return console.error(err.message);
            
            if (row.qtd === 0) {
                console.log("Tabela Treino vazia. Inserindo dados iniciais...");
                
                // Seed Treino A
                db.run(`INSERT INTO treino (id_treino, nome, aquecimento, exercicios, descanso) 
                VALUES (1, 'Treino A', 'Caminhada ou bicicleta\nMobilidade de ombros, quadril e joelhos', 
                'Agachamento livre – 3x12\nSupino (máquina ou halter) – 3x10\nPuxada na frente (pulldown) – 3x10\nDesenvolvimento de ombros – 3x10\nRosca bíceps – 2x12\nTríceps na polia ou banco – 2x12\nPrancha abdominal – 3x20–30s', 
                '60–90s entre séries')`);

                // Seed Treino B
                db.run(`INSERT INTO treino (id_treino, nome, aquecimento, exercicios, descanso) 
                VALUES (2, 'Treino B', 'Bicicleta ou esteira\nAlongamentos dinâmicos', 
                'Leg press ou agachamento – 3x12\nRemada baixa ou com halter – 3x10\nFlexão de braço (ou joelhos apoiados) – 3x8–10\nElevação lateral de ombros – 3x12\nAbdominal crunch – 3x15\nElevação de quadril (glúteos) – 3x12', 
                '60–90s entre séries')`);
            }
        });

        // Verifica se existem alunos. Se qtd for 0, insere.
        db.get("SELECT count(*) as qtd FROM aluno", (err, row) => {
            if (err) return console.error(err.message);

            if (row.qtd === 0) {
                console.log("Tabela Aluno vazia. Inserindo dados iniciais...");

                db.run(`INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, email) 
                VALUES ('Isadora', 17, '16/05/2008', 'Idiomas, ler, geopolítica', 'Estudar em outro país', 'isadora@aluno.com')`);

                db.run(`INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, email) 
                VALUES ('Antony', 17, '18/12/2007', 'Filmes, séries, biologia e química', 'Passar no vestibular', 'antony@aluno.com')`);

                db.run(`INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, email) 
                VALUES ('Radmila', 18, '02/06/2007', 'Chocolate, greys anatomy e viajar', 'Ser bem sucedida e ter familia', 'radmila@aluno.com')`);

                db.run(`INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, email) 
                VALUES ('Ingrid', 17, '06/08/2007', 'Viajar, estudar, pintar', 'Formar familia e viajar o mundo', 'ingrid@aluno.com')`);

                db.run(`INSERT INTO aluno (nome_aluno, idade, data_nascimento, gosta, sonho, email) 
                VALUES ('Marina', 17, '05/11/2007', 'Dormir, filmes e editar', 'Viajar para fora do Brasil', 'marina@aluno.com')`);
            }
        });
    });
}

module.exports = db;