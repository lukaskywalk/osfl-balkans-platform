// OSFL Balkans — Croatian Gross-to-Net Salary Calculator
// Tax rules: Croatia 2024/2025

function t(key) {
  return (window.toolI18n && window.toolI18n.t) ? window.toolI18n.t(key) : key;
}

function fmt(n) {
  return n.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function calculate() {
  var gross = parseFloat(document.getElementById('gross').value);
  if (!gross || gross <= 0) {
    alert(t('please_enter_salary'));
    return;
  }

  var prirezRate = parseFloat(document.getElementById('city').value) / 100;
  var showEmployer = document.getElementById('show-employer').checked;

  // ── Employee deductions ──────────────────────────────────────
  var pension1 = gross * 0.15;          // MIO I. stup
  var pension2 = gross * 0.05;          // MIO II. stup
  var totalPension = pension1 + pension2;

  // Taxable income = gross - pension - personal allowance (560 €/mj)
  var personalAllowance = 560;
  var taxBase = Math.max(0, gross - totalPension - personalAllowance);

  // Income tax: 20% up to 4200 €, 30% above
  var taxBracket1 = 4200;
  var incomeTax = 0;
  if (taxBase <= taxBracket1) {
    incomeTax = taxBase * 0.20;
  } else {
    incomeTax = taxBracket1 * 0.20 + (taxBase - taxBracket1) * 0.30;
  }

  // City surcharge (prirez) on income tax
  var prirez = incomeTax * prirezRate;

  // Net salary
  var totalDeductions = totalPension + incomeTax + prirez;
  var net = gross - totalDeductions;

  // ── Employer cost ────────────────────────────────────────────
  var employerHealth = gross * 0.165;   // ZO (zdravstveno osiguranje)
  var employerTotal = gross + employerHealth;

  // ── Render ───────────────────────────────────────────────────
  var netPct = Math.round((net / gross) * 100);
  var dedPct = 100 - netPct;

  var employerHTML = '';
  if (showEmployer) {
    employerHTML = '<div class="employer-section">' +
      '<strong>' + t('employer_cost_heading') + '</strong>' +
      '<table class="deduction-table" style="margin-top:10px">' +
      '<tr><td>' + t('employer_health') + ' (16,5%)</td><td>' + fmt(employerHealth) + '</td></tr>' +
      '<tr><td><strong>' + t('employer_total') + '</strong></td><td><strong>' + fmt(employerTotal) + '</strong></td></tr>' +
      '</table></div>';
  }

  document.getElementById('result').style.display = 'block';
  document.getElementById('result').innerHTML =
    '<div class="result-card">' +
    '<div style="font-size:0.85rem;color:#555;font-weight:600;text-transform:uppercase;letter-spacing:.05em">' + t('net_salary') + '</div>' +
    '<div class="net-amount">' + fmt(net) + '</div>' +

    '<div class="salary-bar-wrap" title="' + netPct + '% neto">' +
    '<div class="salary-bar-net" style="width:' + netPct + '%">' + netPct + '%</div>' +
    '<div class="salary-bar-ded" style="width:' + dedPct + '%">' + dedPct + '%</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.78rem;color:#777;margin-bottom:16px">' +
    '<span>' + t('net_salary') + '</span><span>' + t('total_deductions') + '</span></div>' +

    '<table class="deduction-table">' +
    '<tr><td>' + t('gross_salary') + '</td><td>' + fmt(gross) + '</td></tr>' +
    '<tr><td style="padding-left:16px;color:#555">' + t('pension_1') + ' (15%)</td><td style="color:#c0392b">−' + fmt(pension1) + '</td></tr>' +
    '<tr><td style="padding-left:16px;color:#555">' + t('pension_2') + ' (5%)</td><td style="color:#c0392b">−' + fmt(pension2) + '</td></tr>' +
    '<tr><td style="padding-left:16px;color:#555">' + t('income_tax') + '</td><td style="color:#c0392b">−' + fmt(incomeTax) + '</td></tr>' +
    (prirezRate > 0 ? '<tr><td style="padding-left:16px;color:#555">' + t('city_surcharge') + ' (' + (prirezRate*100) + '%)</td><td style="color:#c0392b">−' + fmt(prirez) + '</td></tr>' : '') +
    '<tr style="background:#e8f5e9"><td><strong>' + t('net_salary') + '</strong></td><td><strong style="color:#1a7a4a">' + fmt(net) + '</strong></td></tr>' +
    '</table>' +

    employerHTML +
    '</div>';
}
