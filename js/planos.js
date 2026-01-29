document.getElementById('formPlano').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
  
    try {
      const response = await fetch('/planos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, valor })
      });
  
      if (response.ok) {
        document.getElementById('mensagem').innerText = 'Plano cadastrado com sucesso!';
        document.getElementById('formPlano').reset();
      } else {
        document.getElementById('mensagem').innerText = 'Erro ao cadastrar plano.';
      }
    } catch (error) {
      document.getElementById('mensagem').innerText = 'Erro de conexão.';
    }
  });
  
