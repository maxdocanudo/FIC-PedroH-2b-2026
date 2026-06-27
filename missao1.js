/* ════════════════════════════════
   MISSÃO 1 — Coleta & Média
   ════════════════════════════════ */

let pessoas = [];

function mostrarErro(msg) {
  const el = document.getElementById('erro');
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function adicionarPessoa() {
  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value);
  
  if (!nome) { mostrarErro('Por favor, informe um nome.'); return; }
  if (isNaN(idade) || idade < 0 || idade > 120) { mostrarErro('Informe uma idade válida (0–120).'); return; }
  
  mostrarErro('');
  pessoas.push({ nome, idade });
  
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('nome').focus();
  
  renderizar();
}

function limparLista() {
  if (pessoas.length === 0) return;
  if (confirm('Deseja apagar toda a lista?')) {
    pessoas = [];
    renderizar();
  }
}

function renderizar() {
  const card = document.getElementById('card-resultado');
  const corpo = document.getElementById('tabela-corpo');
  
  if (pessoas.length === 0) {
    card.style.display = 'none';
    return;
  }
  
  card.style.display = 'block';
  corpo.innerHTML = '';
  
  pessoas.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="text-muted text-mono">${i + 1}</td>
      <td>${p.nome}</td>
      <td class="text-lime text-mono">${p.idade}</td>
    `;
    corpo.appendChild(tr);
  });
  
  const total = pessoas.length;
  const soma = pessoas.reduce((acc, p) => acc + p.idade, 0);
  const media = (soma / total).toFixed(1);
  const menor = pessoas.reduce((a, b) => a.idade < b.idade ? a : b);
  const maior = pessoas.reduce((a, b) => a.idade > b.idade ? a : b);
  
  document.getElementById('total').textContent = total;
  document.getElementById('media').textContent = media + ' anos';
  document.getElementById('menor').textContent = `${menor.nome} (${menor.idade})`;
  document.getElementById('maior').textContent = `${maior.nome} (${maior.idade})`;
}

// Permitir Enter no campo de nome
document.getElementById('nome').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('idade').focus();
});
document.getElementById('idade').addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarPessoa();
});