/* ════════════════════════════════
   MISSÃO 4 — Tipos de Dados
   ════════════════════════════════ */

function avaliarValor(entrada) {
  let valor;
  let parsed = false;
  
  // Tenta parsear como JSON (captura arrays, objetos, null, booleans, números)
  try {
    valor = JSON.parse(entrada);
    parsed = true;
  } catch {
    // Se falhar, é uma string pura
    valor = entrada;
  }
  
  const tipo = typeof valor;
  const ehNull = valor === null;
  const ehArray = Array.isArray(valor);
  const ehNaN = typeof valor === 'number' && isNaN(valor);
  const ehInteiro = Number.isInteger(valor);
  const ehFloat = typeof valor === 'number' && !Number.isInteger(valor) && !isNaN(valor);
  const ehBoolean = typeof valor === 'boolean';
  const ehObjeto = tipo === 'object' && !ehNull && !ehArray;
  const ehString = typeof valor === 'string';
  const ehUndefined = tipo === 'undefined';
  
  // Rótulo amigável
  let rotulo = tipo;
  if (ehNull) rotulo = 'null';
  if (ehArray) rotulo = 'array';
  if (ehNaN) rotulo = 'NaN';
  if (ehInteiro) rotulo = 'integer';
  if (ehFloat) rotulo = 'float';
  
  // Conversões
  const conversoes = [
    { label: 'String(valor)', resultado: String(valor), tipo: typeof String(valor) },
    { label: 'Number(valor)', resultado: Number(valor), tipo: typeof Number(valor) },
    { label: 'Boolean(valor)', resultado: Boolean(valor), tipo: typeof Boolean(valor) },
    { label: 'parseInt(valor)', resultado: parseInt(valor), tipo: typeof parseInt(valor) },
    { label: 'parseFloat(valor)', resultado: parseFloat(valor), tipo: typeof parseFloat(valor) },
    { label: 'JSON.stringify(valor)', resultado: JSON.stringify(valor), tipo: 'string' },
  ];
  
  // Info cards
  const infos = [
    { label: 'typeof', valor: tipo, destaque: true },
    { label: 'Tipo específico', valor: rotulo, destaque: true },
    { label: 'É Array?', valor: ehArray ? '✓ Sim' : '✕ Não', cor: ehArray ? 'lime' : 'muted' },
    { label: 'É null?', valor: ehNull ? '✓ Sim' : '✕ Não', cor: ehNull ? 'lime' : 'muted' },
    { label: 'É NaN?', valor: ehNaN ? '✓ Sim' : '✕ Não', cor: ehNaN ? 'yellow' : 'muted' },
    { label: 'É inteiro?', valor: ehInteiro ? '✓ Sim' : '✕ Não', cor: ehInteiro ? 'lime' : 'muted' },
    { label: 'É flutuante?', valor: ehFloat ? '✓ Sim' : '✕ Não', cor: ehFloat ? 'lime' : 'muted' },
    { label: 'Valor truthy?', valor: valor ? '✓ Truthy' : '✕ Falsy', cor: valor ? 'green' : 'red' },
  ];
  
  return { valor, tipo, rotulo, infos, conversoes, ehNull, ehArray };
}

function testar() {
  const entrada = document.getElementById('valor').value.trim();
  if (entrada === '') { alert('Digite algo para analisar.'); return; }
  
  const r = avaliarValor(entrada);
  
  // Grid info
  const grid = document.getElementById('grid-info');
  grid.innerHTML = r.infos.map(info => `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;">
      <div class="output-label">${info.label}</div>
      <div class="text-mono" style="font-size:15px;font-weight:600;margin-top:4px;
        color:${info.cor === 'lime' ? 'var(--lime)' :
                info.cor === 'red'  ? 'var(--danger)' :
                info.cor === 'green'? 'var(--success)':
                info.cor === 'yellow'? 'var(--warning)' :
                'var(--text-muted)'}">${info.valor}</div>
    </div>
  `).join('');
  
  // Bruto
  document.getElementById('bruto').textContent = entrada;
  
  // Tabela de conversões
  const corpo = document.getElementById('conv-corpo');
  corpo.innerHTML = r.conversoes.map(c => `
    <tr>
      <td class="text-mono" style="color:var(--text-muted)">${c.label}</td>
      <td class="text-lime text-mono">${c.resultado}</td>
      <td class="text-mono" style="font-size:12px;color:var(--text-muted)">${c.tipo}</td>
    </tr>
  `).join('');
  
  document.getElementById('painel').style.display = 'block';
  document.getElementById('painel').scrollIntoView({ behavior: 'smooth' });
}

function testarTodos() {
  const amostras = [
    '42', '3.14', '"Olá mundo"', 'true', 'false', 'null', '""',
    '0', '[1,2,3]', '{"nome":"Ana"}', 'undefined', 'NaN',
  ];
  
  let log = '';
  amostras.forEach(entrada => {
    const r = avaliarValor(entrada);
    log += `Entrada: ${entrada.padEnd(18)} → tipo: ${r.rotulo.padEnd(10)} | truthy: ${Boolean(r.valor)}\n`;
  });
  
  document.getElementById('demo-log').textContent = log;
  document.getElementById('painel-demo').style.display = 'block';
  document.getElementById('painel-demo').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('valor').addEventListener('keydown', e => {
  if (e.key === 'Enter') testar();
});