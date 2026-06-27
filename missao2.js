/* ════════════════════════════════
   MISSÃO 2 — Processo de String
   ════════════════════════════════ */

function aplicarTransform(str, tipo) {
  switch (tipo) {
    case 'upper':   return str.toUpperCase();
    case 'lower':   return str.toLowerCase();
    case 'title':   return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'reverse': return str.split('').reverse().join('');
    case 'trim':    return str.trim();
    default:        return str;
  }
}

function processar() {
  const texto     = document.getElementById('texto').value;
  const sep       = document.getElementById('separador').value;
  const transform = document.getElementById('transform').value;

  if (!texto.trim()) { alert('Digite um texto para processar.'); return; }

  // .split() principal
  const partes = texto.split(sep).map(p => aplicarTransform(p, transform));

  const maior = partes.reduce((a, b) => a.length >= b.length ? a : b, '');

  document.getElementById('qtd').textContent   = partes.length;
  document.getElementById('chars').textContent = texto.length;
  document.getElementById('maior').textContent = `"${maior}" (${maior.length} ch.)`;
  document.getElementById('reconstruido').textContent = partes.join(' | ');

  // Pills
  const partesDiv = document.getElementById('partes');
  partesDiv.innerHTML = '';
  partes.forEach(p => {
    const pill = document.createElement('span');
    pill.className = 'name-pill sorted';
    pill.textContent = p || '(vazio)';
    partesDiv.appendChild(pill);
  });

  // Tabela de stats
  const corpo = document.getElementById('stats-corpo');
  corpo.innerHTML = '';
  partes.forEach((p, i) => {
    const letras   = p.replace(/\s/g, '').length;
    const palavras = p.trim() ? p.trim().split(/\s+/).length : 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="text-muted text-mono">${i + 1}</td>
      <td class="text-lime">${p || '<em style="color:var(--text-muted)">(vazio)</em>'}</td>
      <td class="text-mono">${letras}</td>
      <td class="text-mono">${palavras}</td>
    `;
    corpo.appendChild(tr);
  });

  document.getElementById('resultado').style.display = 'block';
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
}

function limpar() {
  document.getElementById('texto').value = '';
  document.getElementById('resultado').style.display = 'none';
}