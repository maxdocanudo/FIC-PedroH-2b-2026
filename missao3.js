/* ════════════════════════════════
   MISSÃO 3 — Dashboard de Pessoas
   ════════════════════════════════ */

let pessoas = [];
let filtro = 'todos';

const demo = [
  { nome: 'Ana Beatriz', idade: 22, nota: 8.5 },
  { nome: 'Carlos Melo', idade: 16, nota: 6.0 },
  { nome: 'Diana Souza', idade: 30, nota: 9.2 },
  { nome: 'Eduardo Lima', idade: 14, nota: 4.0 },
  { nome: 'Fernanda Paz', idade: 19, nota: 7.3 },
  { nome: 'Gabriel Neto', idade: 17, nota: 5.5 },
];

function erro(msg) {
  const el = document.getElementById('msg-erro');
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function adicionar() {
  const nome = document.getElementById('p-nome').value.trim();
  const idade = parseInt(document.getElementById('p-idade').value);
  const nota = parseFloat(document.getElementById('p-nota').value);
  
  if (!nome) { erro('Informe o nome.'); return; }
  if (isNaN(idade) || idade < 0) { erro('Informe uma idade válida.'); return; }
  if (isNaN(nota) || nota < 0 || nota > 10) { erro('Informe uma nota entre 0 e 10.'); return; }
  
  erro('');
  pessoas.push({ nome, idade, nota });
  document.getElementById('p-nome').value = '';
  document.getElementById('p-idade').value = '';
  document.getElementById('p-nota').value = '';
  document.getElementById('p-nome').focus();
  renderizar();
}

function carregarDemo() {
  pessoas = [...demo];
  renderizar();
}

function limparTudo() {
  pessoas = [];
  renderizar();
}

function setFiltro(f) {
  filtro = f;
  renderizar();
}

function renderizar() {
  const visivel = pessoas.length > 0;
  document.getElementById('painel-filtros').style.display = visivel ? 'block' : 'none';
  document.getElementById('painel-tabela').style.display = visivel ? 'block' : 'none';
  
  if (!visivel) return;
  
  // Aplicar filtro
  let lista = pessoas;
  if (filtro === 'maiores') lista = pessoas.filter(p => p.idade >= 18);
  if (filtro === 'menores') lista = pessoas.filter(p => p.idade < 18);
  
  // Highlight botão ativo
  ['todos', 'maiores', 'menores'].forEach(f => {
    const btn = document.getElementById('btn-' + f);
    if (btn) btn.className = 'btn btn-sm ' + (f === filtro ? 'btn-primary' : 'btn-outline');
  });
  
  // Stats
  const mediaIdade = lista.length ? (lista.reduce((a, p) => a + p.idade, 0) / lista.length).toFixed(1) : '—';
  const mediaNota = lista.length ? (lista.reduce((a, p) => a + p.nota, 0) / lista.length).toFixed(1) : '—';
  document.getElementById('exibindo').textContent = lista.length;
  document.getElementById('media-idade').textContent = mediaIdade !== '—' ? mediaIdade + ' anos' : '—';
  document.getElementById('media-nota').textContent = mediaNota;
  
  // Tabela
  const corpo = document.getElementById('tabela');
  corpo.innerHTML = '';
  
  if (lista.length === 0) {
    corpo.innerHTML = `<tr><td colspan="5" class="empty">Nenhum resultado para este filtro.</td></tr>`;
    return;
  }
  
  lista.forEach((p, i) => {
    const maioridade = p.idade >= 18 ?
      '<span class="chip chip-lime">✓ Maior</span>' :
      '<span class="chip chip-red">Menor</span>';
    
    const notaClass = p.nota >= 6 ? 'text-success' : p.nota >= 1 ? 'text-warning' : 'text-danger';
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="text-muted text-mono">${i + 1}</td>
      <td>${p.nome}</td>
      <td class="text-mono">${p.idade}</td>
      <td class="text-mono ${notaClass}">${p.nota.toFixed(1)}</td>
      <td>${maioridade}</td>
    `;
    corpo.appendChild(tr);
  });
}

// Enter para avançar campos
['p-nome', 'p-idade', 'p-nota'].forEach((id, i, arr) => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (i < arr.length - 1) document.getElementById(arr[i + 1]).focus();
    else adicionar();
  });
});