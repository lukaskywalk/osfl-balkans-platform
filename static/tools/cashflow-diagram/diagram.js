// OSFL Balkans — Sankey Cashflow Diagram
// Uses Google Charts Sankey

google.charts.load('current', { packages: ['sankey'] });

function t(key) {
  return (window.toolI18n && window.toolI18n.t) ? window.toolI18n.t(key) : key;
}

// ── Row builders ─────────────────────────────────────────────────────────────

function addIncomeRow(label, amount) {
  var wrap = document.getElementById('income-rows');
  var div = document.createElement('div');
  div.className = 'flow-row';
  div.innerHTML =
    '<input type="text" placeholder="' + t('income_label_placeholder') + '" value="' + (label || '') + '">' +
    '<input type="number" min="0" step="10" placeholder="0" value="' + (amount || '') + '">' +
    '<span style="font-size:0.8rem;color:#777">€/mj.</span>' +
    '<button onclick="this.parentNode.remove()" title="Ukloni">✕</button>';
  wrap.appendChild(div);
}

function addExpenseRow(label, amount, category) {
  var wrap = document.getElementById('expense-rows');
  var div = document.createElement('div');
  div.className = 'flow-row';
  var cats = [
    { val: 'needs',   label: t('needs') },
    { val: 'wants',   label: t('wants') },
    { val: 'savings', label: t('savings') }
  ];
  var opts = cats.map(function(c) {
    return '<option value="' + c.val + '"' + (c.val === (category || 'needs') ? ' selected' : '') + '>' + c.label + '</option>';
  }).join('');
  div.innerHTML =
    '<input type="text" placeholder="' + t('expense_label_placeholder') + '" value="' + (label || '') + '">' +
    '<input type="number" min="0" step="10" placeholder="0" value="' + (amount || '') + '">' +
    '<select>' + opts + '</select>' +
    '<button onclick="this.parentNode.remove()" title="Ukloni">✕</button>';
  wrap.appendChild(div);
}

function initRows() {
  // Try restoring from URL state
  var params = new URLSearchParams(window.location.search);
  var state = params.get('s');
  if (state) {
    try {
      var data = JSON.parse(atob(state));
      (data.income || []).forEach(function(r) { addIncomeRow(r[0], r[1]); });
      (data.expenses || []).forEach(function(r) { addExpenseRow(r[0], r[1], r[2]); });
      return;
    } catch(e) {}
  }
  // Default starter rows
  addIncomeRow(t('default_income_salary'), 1200);
  addExpenseRow(t('default_expense_rent'), 400, 'needs');
  addExpenseRow(t('default_expense_food'), 250, 'needs');
  addExpenseRow(t('default_expense_transport'), 100, 'needs');
  addExpenseRow(t('default_expense_entertainment'), 150, 'wants');
  addExpenseRow(t('default_expense_savings'), 200, 'savings');
}

// ── Collect data from DOM ────────────────────────────────────────────────────

function getIncomeRows() {
  var rows = [];
  document.querySelectorAll('#income-rows .flow-row').forEach(function(row) {
    var inputs = row.querySelectorAll('input');
    var label = inputs[0].value.trim();
    var amount = parseFloat(inputs[1].value);
    if (label && amount > 0) rows.push([label, amount]);
  });
  return rows;
}

function getExpenseRows() {
  var rows = [];
  document.querySelectorAll('#expense-rows .flow-row').forEach(function(row) {
    var inputs = row.querySelectorAll('input');
    var label = inputs[0].value.trim();
    var amount = parseFloat(inputs[1].value);
    var category = row.querySelector('select').value;
    if (label && amount > 0) rows.push([label, amount, category]);
  });
  return rows;
}

// ── Generate diagram ─────────────────────────────────────────────────────────

function generateDiagram() {
  var incomeRows = getIncomeRows();
  var expenseRows = getExpenseRows();

  if (incomeRows.length === 0 || expenseRows.length === 0) {
    alert(t('please_add_rows'));
    return;
  }

  var incomeNode = t('node_income');

  // Build sankey data rows: [from, to, value]
  // Multiple income sources → central income node → expense categories
  var sankeyRows = [];

  // Income sources → central node
  var totalIncome = 0;
  incomeRows.forEach(function(r) {
    sankeyRows.push([r[0], incomeNode, r[1]]);
    totalIncome += r[1];
  });

  // Central node → expense categories
  var totalExpenses = 0;
  expenseRows.forEach(function(r) {
    sankeyRows.push([incomeNode, r[0], r[1]]);
    totalExpenses += r[1];
  });

  // Show unallocated as savings if income > expenses
  var unallocated = totalIncome - totalExpenses;
  if (unallocated > 0.5) {
    sankeyRows.push([incomeNode, t('unallocated'), unallocated]);
  }

  // Colors: needs=blue, wants=amber, savings=green, income=gray, unallocated=teal
  var categoryColors = { needs: '#1d4ed8', wants: '#d97706', savings: '#16a34a' };
  var nodeColors = {};

  // Assign colors based on category
  expenseRows.forEach(function(r) {
    nodeColors[r[0]] = categoryColors[r[2]] || '#6b7280';
  });
  incomeRows.forEach(function(r) {
    nodeColors[r[0]] = '#64748b';
  });
  nodeColors[incomeNode] = '#334155';
  nodeColors[t('unallocated')] = '#0d9488';

  // Build unique node list preserving order
  var nodeList = [];
  sankeyRows.forEach(function(r) {
    if (nodeList.indexOf(r[0]) === -1) nodeList.push(r[0]);
    if (nodeList.indexOf(r[1]) === -1) nodeList.push(r[1]);
  });
  var colors = nodeList.map(function(n) { return nodeColors[n] || '#9ca3af'; });

  google.charts.setOnLoadCallback(function() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(sankeyRows);

    var options = {
      height: 380,
      sankey: {
        node: {
          colors: colors,
          label: { fontSize: 13, color: '#1e293b', bold: false },
          width: 20,
          nodePadding: 14
        },
        link: {
          colorMode: 'gradient'
        }
      },
      tooltip: { isHtml: true }
    };

    var chart = new google.visualization.Sankey(document.getElementById('sankey-chart'));
    chart.draw(data, options);
    document.getElementById('diagram-wrap').style.display = 'block';
    document.getElementById('diagram-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Trigger load callback immediately if already loaded
  if (google.visualization && google.visualization.Sankey) {
    google.charts.setOnLoadCallback(function() {});
  }
}

// ── Share ────────────────────────────────────────────────────────────────────

function shareDiagram() {
  var state = {
    income: getIncomeRows(),
    expenses: getExpenseRows()
  };
  var encoded = btoa(JSON.stringify(state));
  var url = window.location.origin + window.location.pathname + '?s=' + encoded;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() { alert(t('link_copied')); });
  } else {
    window.prompt(t('copy_link'), url);
  }
}
