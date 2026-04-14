// OSFL Balkans — Savings Goal Planner
// Compound interest projection, Chart.js

var chartInstance = null;

function preset(name, amount, rate) {
  document.getElementById('goal-name').value = name;
  document.getElementById('goal-amount').value = amount;
  document.getElementById('interest-rate').value = rate;
  // Default target: 2 years from now
  var d = new Date();
  d.setFullYear(d.getFullYear() + 2);
  document.getElementById('target-date').value = d.toISOString().slice(0, 7);
}

function calculate() {
  var goal = parseFloat(document.getElementById('goal-amount').value) || 0;
  var current = parseFloat(document.getElementById('current-balance').value) || 0;
  var rate = (parseFloat(document.getElementById('interest-rate').value) || 0) / 100;
  var currency = document.getElementById('currency').value;
  var targetVal = document.getElementById('target-date').value;

  if (goal <= 0) { alert('Please enter a target amount.'); return; }
  if (!targetVal) { alert('Please select a target date.'); return; }

  var now = new Date();
  var target = new Date(targetVal + '-01');
  var months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  if (months <= 0) { alert('Target date must be in the future.'); return; }

  var monthlyRate = rate / 12;
  // Required monthly contribution formula (future value of annuity + lump sum)
  var fvCurrent = current * Math.pow(1 + monthlyRate, months);
  var remaining = goal - fvCurrent;
  var monthly;
  if (monthlyRate === 0) {
    monthly = remaining / months;
  } else {
    monthly = remaining * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
  }
  if (monthly < 0) monthly = 0;

  var fmt = function (n) { return currency + ' ' + Math.round(n).toLocaleString(); };
  var totalContributions = monthly * months + current;
  var interestEarned = goal - totalContributions;

  document.getElementById('summary').innerHTML =
    '<h2 style="font-size:1.1rem;margin-bottom:16px">' + (document.getElementById('goal-name').value || 'Your goal') + '</h2>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
      '<div><span style="font-size:0.8rem;color:#555">Monthly savings needed</span><br><strong style="font-size:1.5rem;color:#005fa3">' + fmt(monthly) + '</strong></div>' +
      '<div><span style="font-size:0.8rem;color:#555">Time to goal</span><br><strong style="font-size:1.5rem">' + months + ' months</strong></div>' +
      '<div><span style="font-size:0.8rem;color:#555">Total you save</span><br><strong>' + fmt(totalContributions) + '</strong></div>' +
      '<div><span style="font-size:0.8rem;color:#555">Interest earned</span><br><strong style="color:#1a7a4a">' + fmt(Math.max(0, interestEarned)) + '</strong></div>' +
    '</div>';

  // Build chart data month by month
  var labels = [], balances = [], contributions = [], interests = [];
  var balance = current;
  var totalSaved = current;
  for (var m = 0; m <= months; m++) {
    var d = new Date(now);
    d.setMonth(d.getMonth() + m);
    labels.push(d.toLocaleDateString('en', { month: 'short', year: '2-digit' }));
    balances.push(Math.round(balance));
    contributions.push(Math.round(totalSaved));
    interests.push(Math.round(Math.max(0, balance - totalSaved)));
    // Next month
    balance = balance * (1 + monthlyRate) + monthly;
    totalSaved += monthly;
  }

  var ctx = document.getElementById('chart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Balance', data: balances, borderColor: '#005fa3', backgroundColor: 'rgba(0,95,163,0.08)', fill: true, tension: 0.3, pointRadius: 0 },
        { label: 'Contributions', data: contributions, borderColor: '#aaa', borderDash: [5,3], fill: false, tension: 0, pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { ticks: { callback: function (v) { return currency + ' ' + v.toLocaleString(); } } }
      }
    }
  });

  document.getElementById('result').style.display = 'block';
}

// Set default target date to 1 year from now
(function () {
  var d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  document.getElementById('target-date').value = d.toISOString().slice(0, 7);
})();
