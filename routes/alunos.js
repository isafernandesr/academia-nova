document.getElementById('formAluno').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
  
    try {
      const response = await fetch('/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, telefone })
      });
  //exemplo
      if (response.ok) {
        document.getElementById('mensagem').innerText = 'Aluno cadastrado com sucesso!';
        document.getElementById('formAluno').reset();
      } else {
        document.getElementById('mensagem').innerText = 'Erro ao cadastrar aluno.';
      }
    } catch (error) {
      document.getElementById('mensagem').innerText = 'Erro de conexão.';
    }
  });
  