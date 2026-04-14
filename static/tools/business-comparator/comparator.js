// OSFL Balkans — Business Structure Comparator
// Data sourced from M3 Module 9 country supplements
// All regulatory data last verified: April 2026

var DATA = {
  HR: {
    name: "Croatia",
    structures: [
      {
        name: "Obrt (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "~€50–100",
        reg_time: "1–5 days (eObrt online)",
        tax_rate: "flat 10% or 15% on profit",
        vat_threshold: "€40,000/yr",
        accounting: "Single-entry bookkeeping allowed",
        social: "Required (HZZO + pension); ~€450/month minimum",
        where: "eObrt portal / Fina"
      },
      {
        name: "j.d.o.o. (Simple LLC)",
        type: "solo", revenue: "low", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "€1 (symbolic)",
        reg_cost: "~€150–250",
        reg_time: "3–7 days",
        tax_rate: "10% corporate tax (≤€1M revenue)",
        vat_threshold: "€40,000/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "Sudski registar / Fina"
      },
      {
        name: "d.o.o. (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "€2,500",
        reg_cost: "~€400–700",
        reg_time: "5–10 days",
        tax_rate: "10% (≤€1M) or 18% corporate tax",
        vat_threshold: "€40,000/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "Sudski registar / Fina / notary"
      }
    ]
  },
  RS: {
    name: "Serbia",
    structures: [
      {
        name: "Preduzetnik (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "Free (APR online)",
        reg_time: "1–3 days",
        tax_rate: "10% flat (lump sum or actual profit)",
        vat_threshold: "8,000,000 RSD/yr (~€68,000)",
        accounting: "Simplified allowed (lump sum taxpayers)",
        social: "Required; minimum ~15,000 RSD/month",
        where: "APR (Agencija za privredne registre)"
      },
      {
        name: "D.O.O. (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "100 RSD (symbolic)",
        reg_cost: "~4,500 RSD",
        reg_time: "3–5 days",
        tax_rate: "15% corporate tax",
        vat_threshold: "8,000,000 RSD/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "APR"
      }
    ]
  },
  BA: {
    name: "Bosnia & Herzegovina",
    structures: [
      {
        name: "Fizičko lice / Obrtnik (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "~50–100 BAM",
        reg_time: "5–15 days",
        tax_rate: "10% flat income tax",
        vat_threshold: "50,000 BAM/yr",
        accounting: "Simplified allowed",
        social: "Required; varies by entity (FBiH vs RS entity)",
        where: "FBiH: APIF | RS entity: APIF Banja Luka"
      },
      {
        name: "D.O.O. (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "2,000 BAM (FBiH) / 1 BAM (RS entity)",
        reg_cost: "~300–600 BAM",
        reg_time: "10–20 days",
        tax_rate: "10% corporate tax",
        vat_threshold: "50,000 BAM/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "FBiH: APIF / RS entity: APIF"
      }
    ]
  },
  ME: {
    name: "Montenegro",
    structures: [
      {
        name: "Preduzetnik (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "~€10–30",
        reg_time: "1–3 days",
        tax_rate: "9% (income up to €12,000) / 15% above",
        vat_threshold: "€30,000/yr",
        accounting: "Simplified allowed",
        social: "Required; minimum ~€150/month",
        where: "CRPS (Centralni registar privrednih subjekata)"
      },
      {
        name: "D.O.O. (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "€1",
        reg_cost: "~€50–150",
        reg_time: "3–7 days",
        tax_rate: "9% / 15% corporate tax",
        vat_threshold: "€30,000/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "CRPS"
      }
    ]
  },
  MK: {
    name: "North Macedonia",
    structures: [
      {
        name: "Трговец поединец (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "~1,000–2,000 MKD",
        reg_time: "4 hours (online via Центар за регистрација)",
        tax_rate: "10% flat",
        vat_threshold: "2,000,000 MKD/yr (~€32,500)",
        accounting: "Simplified allowed",
        social: "Required",
        where: "Центар за регистрација на РСМ"
      },
      {
        name: "ДООЕЛ / ДОО (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "5,000 MKD (~€81)",
        reg_cost: "~2,000–4,000 MKD",
        reg_time: "4 hours online",
        tax_rate: "10% corporate tax",
        vat_threshold: "2,000,000 MKD/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "Центар за регистрација"
      }
    ]
  },
  AL: {
    name: "Albania",
    structures: [
      {
        name: "Person Fizik (Sole Trader)",
        type: "solo", revenue: "low", liability: "low",
        liability_desc: "Unlimited personal liability",
        min_capital: "None",
        reg_cost: "Free (QKB online)",
        reg_time: "1 day",
        tax_rate: "0% up to 14M ALL; 15% above",
        vat_threshold: "10,000,000 ALL/yr",
        accounting: "Simplified allowed",
        social: "Required",
        where: "QKB (Qendra Kombëtare e Biznesit)"
      },
      {
        name: "SHPK (LLC)",
        type: "small", revenue: "mid", liability: "high",
        liability_desc: "Limited to company assets",
        min_capital: "100 ALL (symbolic)",
        reg_cost: "~1,000 ALL",
        reg_time: "1–3 days",
        tax_rate: "15% corporate tax",
        vat_threshold: "10,000,000 ALL/yr",
        accounting: "Double-entry required",
        social: "As per director salary",
        where: "QKB"
      }
    ]
  }
};

function loadCountry(code) {
  document.getElementById('questions').style.display = code ? 'block' : 'none';
  document.getElementById('result').style.display = 'none';
}

function getVal(name) {
  var el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : null;
}

function compare() {
  var countryCode = document.getElementById('country').value;
  if (!countryCode) { alert('Please select a country.'); return; }
  var type = getVal('type');
  var revenue = getVal('revenue');
  var liability = getVal('liability');

  var country = DATA[countryCode];
  if (!country) return;

  // Score each structure
  var scored = country.structures.map(function (s) {
    var score = 0;
    if (type && s.type === type) score += 2;
    if (revenue === 'low' && s.revenue === 'low') score += 1;
    if (revenue === 'high' && s.revenue === 'high') score += 1;
    if (liability && s.liability === liability) score += 2;
    return { s: s, score: score };
  });
  scored.sort(function (a, b) { return b.score - a.score; });
  var topScore = scored[0].score;

  var html = '<h2 style="margin-bottom:16px">Business structures in ' + country.name + '</h2>';
  html += '<table class="comparison-table"><thead><tr>' +
    '<th>Structure</th><th>Liability</th><th>Min. capital</th><th>Reg. cost</th>' +
    '<th>Reg. time</th><th>Tax rate</th><th>VAT threshold</th><th>Register at</th>' +
    '</tr></thead><tbody>';

  scored.forEach(function (item) {
    var s = item.s;
    var isTop = item.score === topScore && topScore > 0;
    html += '<tr' + (isTop ? ' class="recommended"' : '') + '>' +
      '<td><strong>' + s.name + '</strong>' + (isTop ? ' <span class="badge badge-recommended">Recommended</span>' : '') + '</td>' +
      '<td>' + s.liability_desc + '</td>' +
      '<td>' + s.min_capital + '</td>' +
      '<td>' + s.reg_cost + '</td>' +
      '<td>' + s.reg_time + '</td>' +
      '<td>' + s.tax_rate + '</td>' +
      '<td>' + s.vat_threshold + '</td>' +
      '<td>' + s.where + '</td>' +
      '</tr>';
  });

  html += '</tbody></table>';
  html += '<p style="margin-top:14px;font-size:0.8rem;color:#555">Data last verified: April 2026. Always confirm with a local accountant or official registry before registering. This tool is for educational purposes only.</p>';
  html += '<button onclick="window.print()" style="margin-top:12px;padding:6px 14px;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;font-size:0.85rem">Print comparison</button>';

  var result = document.getElementById('result');
  result.innerHTML = html;
  result.style.display = 'block';
}
