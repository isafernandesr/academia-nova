document.getElementById('formPagamento').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const aluno_id = document.getElementById('aluno_id').value;
    const plano_id = document.getElementById('plano_id').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
  
    try {
      const response = await fetch('/pagamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aluno_id, plano_id, valor, data })
      });
  
      if (response.ok) {
        document.getElementById('mensagem').innerText = 'Pagamento registrado com sucesso!';
        document.getElementById('formPagamento').reset();
      } else {
        document.getElementById('mensagem').innerText = 'Erro ao registrar pagamento.';
      }
    } catch (error) {
      document.getElementById('mensagem').innerText = 'Erro de conexão.';
    }
  });
  