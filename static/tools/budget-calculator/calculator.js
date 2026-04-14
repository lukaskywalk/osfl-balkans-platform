// OSFL Balkans — Budget Calculator
// Vanilla JS, no dependencies, localStorage + URL state

var categories = {
  needs: ['rent', 'mortgage', 'utilities', 'groceries', 'transport', 'insurance', 'medical', 'childcare'],
  wants: ['dining', 'entertainment', 'subscriptions', 'clothing', 'hobbies', 'travel'],
  savings: ['savings', 'investment', 'pension', 'debt repayment', 'emergency fund']
};

function addRow(label, amount, freq, category) {
  var container = document.getElementById('expense-rows');
  var row = document.createElement('div');
  row.className = 'expense-row';
  row.innerHTML =
    '<input type="text" placeholder="Label (e.g. Rent)" value="' + (label || '') + '" style="flex:2">' +
    '<input type="number" placeholder="Amount" value="' + (amount || '') + '" min="0" step="1" style="flex:1">' +
    '<select style="flex:1">' +
      '<option value="monthly"' + (freq === 'monthly' ? ' selected' : '') + '>Monthly</option>' +
      '<option value="weekly"' + (freq === 'weekly' ? ' selected' : '') + '>Weekly</option>' +
      '<option value="annual"' + (freq === 'annual' ? ' selected' : '') + '>Annual</option>' +
    '</select>' +
    '<select style="flex:1">' +
      '<option value="auto"' + (!category || category === 'auto' ? ' selected' : '') + '>Auto</option>' +
      '<option value="needs"' + (category === 'needs' ? ' selected' : '') + '>Needs</option>' +
      '<option value="wants"' + (category === 'wants' ? ' selected' : '') + '>Wants</option>' +
      '<option value="savings"' + (category === 'savings' ? ' selected' : '') + '>Savings</option>' +
    '</select>' +
    '<button onclick="this.parentElement.remove()" title="Remove">✕</button>';
  container.appendChild(row);
}

function guessCategory(label) {
  var l = label.toLowerCase();
  for (var cat in categories) {
    for (var i = 0; i < categories[cat].length; i++) {
      if (l.includes(categories[cat][i])) return cat;
    }
  }
  return 'wants'; // default
}

function toMonthly(amount, freq) {
  if (freq === 'weekly') return amount * 52 / 12;
  if (freq === 'annual') return amount / 12;
  return amount;
}

function calculate() {
  var income = parseFloat(document.getElementById('income').value) || 0;
  var currency = document.getElementById('currency').value;
  if (income <= 0) { alert('Please enter your monthly income.'); return; }

  var rows = document.querySelectorAll('#expense-rows .expense-row');
  var totals = { needs: 0, wants: 0, savings: 0 };

  rows.forEach(function (row) {
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    var label = inputs[0].value.trim();
    var amount = parseFloat(inputs[1].value) || 0;
    var freq = selects[0].value;
    var catSel = selects[1].value;
    var monthly = toMonthly(amount, freq);
    var cat = catSel === 'auto' ? guessCategory(label) : catSel;
    totals[cat] += monthly;
  });

  var totalExpenses = totals.needs + totals.wants + totals.savings;
  var surplus = income - totalExpenses;
  var fmt = function (n) { return currency + ' ' + Math.round(n).toLocaleString(); };
  var pct = function (n) { return income > 0 ? Math.round((n / income) * 100) : 0; };

  // Targets: 50/30/20
  var targets = { needs: income * 0.5, wants: income * 0.3, savings: income * 0.2 };

  var chart = document.getElementById('chart');
  chart.innerHTML = '';
  var bars = [
    { key: 'needs', label: 'Needs', cls: 'bar-needs' },
    { key: 'wants', label: 'Wants', cls: 'bar-wants' },
    { key: 'savings', label: 'Savings', cls: 'bar-savings' }
  ];
  bars.forEach(function (b) {
    var p = pct(totals[b.key]);
    var tp = pct(targets[b.key]);
    var over = totals[b.key] > targets[b.key];
    chart.innerHTML +=
      '<div style="margin-bottom:14px">' +
        '<div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:4px">' +
          '<span><strong>' + b.label + '</strong></span>' +
          '<span>' + fmt(totals[b.key]) + ' (' + p + '%) — target ' + tp + '%' +
          (over ? ' <span style="color:#c0392b">▲ over</span>' : ' <span style="color:#1a7a4a">✓</span>') + '</span>' +
        '</div>' +
        '<div style="background:#e0e0e0;border-radius:4px;height:20px;overflow:hidden">' +
          '<div class="chart-bar ' + b.cls + '" style="width:' + Math.min(p, 100) + '%">' + (p >= 8 ? p + '%' : '') + '</div>' +
        '</div>' +
      '</div>';
  });

  var summary = document.getElementById('summary');
  summary.innerHTML =
    '<div style="display:flex;gap:20px;flex-wrap:wrap">' +
      '<div><span style="font-size:0.85rem;color:#555">Income</span><br><strong>' + fmt(income) + '</strong></div>' +
      '<div><span style="font-size:0.85rem;color:#555">Total expenses</span><br><strong>' + fmt(totalExpenses) + '</strong></div>' +
      '<div><span style="font-size:0.85rem;color:#555">' + (surplus >= 0 ? 'Surplus' : 'Deficit') + '</span><br>' +
        '<strong class="' + (surplus >= 0 ? 'surplus' : 'deficit') + '">' + fmt(Math.abs(surplus)) + '</strong></div>' +
    '</div>' +
    (surplus < 0 ? '<p style="margin-top:14px;color:#c0392b;font-size:0.9rem">⚠ Your expenses exceed your income. Review your Wants category first.</p>' : '') +
    '<p style="margin-top:14px;font-size:0.85rem;color:#555">Target: 50% Needs · 30% Wants · 20% Savings</p>';

  document.getElementById('result').style.display = 'block';
  localStorage.setItem('osfl_budget', JSON.stringify({ income: income, currency: currency, rows: getRows() }));
}

function getRows() {
  var rows = [];
  document.querySelectorAll('#expense-rows .expense-row').forEach(function (row) {
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    rows.push({ label: inputs[0].value, amount: inputs[1].value, freq: selects[0].value, cat: selects[1].value });
  });
  return rows;
}

function saveState() {
  var state = btoa(JSON.stringify({ income: document.getElementById('income').value, currency: document.getElementById('currency').value, rows: getRows() }));
  var url = window.location.origin + window.location.pathname + '?s=' + state;
  navigator.clipboard ? navigator.clipboard.writeText(url) : prompt('Copy link:', url);
  alert('Link copied to clipboard.');
}

// Restore from URL or localStorage on load
(function () {
  var params = new URLSearchParams(window.location.search);
  var saved = null;
  if (params.get('s')) {
    try { saved = JSON.parse(atob(params.get('s'))); } catch (e) {}
  } else {
    try { saved = JSON.parse(localStorage.getItem('osfl_budget')); } catch (e) {}
  }
  if (saved) {
    document.getElementById('income').value = saved.income || '';
    if (saved.currency) document.getElementById('currency').value = saved.currency;
    if (saved.rows) saved.rows.forEach(function (r) { addRow(r.label, r.amount, r.freq, r.cat); });
  }
  // Always start with at least 3 blank rows
  var existingRows = document.querySelectorAll('#expense-rows .expense-row').length;
  for (var i = existingRows; i < 3; i++) addRow();
})();
