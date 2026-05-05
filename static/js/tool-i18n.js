// OSFL Balkans — tool-i18n.js
// Shared language support for all 3 interactive tools.
// Usage: include this script, then call toolI18n.t("key") or toolI18n.lang

(function (global) {
  var STRINGS = {
    hr: {
      income: "Mjesečni prihod", expenses: "Rashodi", add_expense: "+ Dodaj rashod",
      calculate: "Izračunaj budžet", needs: "Potrebe", wants: "Želje", savings: "Štednja",
      surplus: "Višak", deficit: "Manjak", income_label: "Prihod", total_expenses: "Ukupni rashodi",
      target: "Cilj 50% Potrebe · 30% Želje · 20% Štednja",
      goal_name: "Naziv cilja", goal_amount: "Ciljni iznos", current_balance: "Trenutna štednja",
      interest_rate: "Godišnja kamatna stopa (%)", target_date: "Ciljni datum",
      monthly_needed: "Potrebna mjesečna štednja", time_to_goal: "Vrijeme do cilja",
      months: "mj.", total_saved: "Ukupno ušteđeno", interest_earned: "Zarađene kamate",
      country: "Država", compare: "Usporedi strukture", recommended: "Preporučeno",
      liability: "Odgovornost", min_capital: "Min. kapital", reg_cost: "Trošak registracije",
      reg_time: "Rok registracije", tax_rate: "Porezna stopa", vat_threshold: "PDV prag",
      register_at: "Gdje se registrira", disclaimer: "Podaci verificirani travanj 2026. Uvijek konzultirajte lokalnog računovođu.",
    },
    "sr-latn": {
      income: "Mesečni prihod", expenses: "Rashodi", add_expense: "+ Dodaj rashod",
      calculate: "Izračunaj budžet", needs: "Potrebe", wants: "Želje", savings: "Štednja",
      surplus: "Višak", deficit: "Manjak", income_label: "Prihod", total_expenses: "Ukupni rashodi",
      target: "Cilj 50% Potrebe · 30% Želje · 20% Štednja",
      goal_name: "Naziv cilja", goal_amount: "Ciljni iznos", current_balance: "Trenutna štednja",
      interest_rate: "Godišnja kamatna stopa (%)", target_date: "Ciljni datum",
      monthly_needed: "Potrebna mesečna štednja", time_to_goal: "Vreme do cilja",
      months: "mes.", total_saved: "Ukupno uštedeno", interest_earned: "Zarađena kamata",
      country: "Zemlja", compare: "Uporedi strukture", recommended: "Preporučeno",
      liability: "Odgovornost", min_capital: "Min. kapital", reg_cost: "Troškovi registracije",
      reg_time: "Rok registracije", tax_rate: "Poreska stopa", vat_threshold: "PDV prag",
      register_at: "Gde se registruje", disclaimer: "Podaci verifikovani april 2026. Uvek konsultujte lokalnog računovođu.",
    },
    bs: {
      income: "Mjesečni prihod", expenses: "Rashodi", add_expense: "+ Dodaj rashod",
      calculate: "Izračunaj budžet", needs: "Potrebe", wants: "Želje", savings: "Štednja",
      surplus: "Višak", deficit: "Manjak", income_label: "Prihod", total_expenses: "Ukupni rashodi",
      target: "Cilj 50% Potrebe · 30% Želje · 20% Štednja",
      goal_name: "Naziv cilja", goal_amount: "Ciljni iznos", current_balance: "Trenutna štednja",
      interest_rate: "Godišnja kamatna stopa (%)", target_date: "Ciljni datum",
      monthly_needed: "Potrebna mjesečna štednja", time_to_goal: "Vrijeme do cilja",
      months: "mj.", total_saved: "Ukupno uštedeno", interest_earned: "Zarađena kamata",
      country: "Zemlja", compare: "Usporedi strukture", recommended: "Preporučeno",
      liability: "Odgovornost", min_capital: "Min. kapital", reg_cost: "Troškovi registracije",
      reg_time: "Rok registracije", tax_rate: "Porezna stopa", vat_threshold: "PDV prag",
      register_at: "Gdje se registrira", disclaimer: "Podaci verificirani april 2026. Uvijek konsultirajte lokalnog računovođu.",
    },
    cnr: {
      income: "Mjesečni prihod", expenses: "Rashodi", add_expense: "+ Dodaj rashod",
      calculate: "Izračunaj budžet", needs: "Potrebe", wants: "Želje", savings: "Štednja",
      surplus: "Višak", deficit: "Manjak", income_label: "Prihod", total_expenses: "Ukupni rashodi",
      target: "Cilj 50% Potrebe · 30% Želje · 20% Štednja",
      goal_name: "Naziv cilja", goal_amount: "Ciljni iznos", current_balance: "Trenutna štednja",
      interest_rate: "Godišnja kamatna stopa (%)", target_date: "Ciljni datum",
      monthly_needed: "Potrebna mjesečna štednja", time_to_goal: "Vrijeme do cilja",
      months: "mj.", total_saved: "Ukupno uštedeno", interest_earned: "Zarađena kamata",
      country: "Zemlja", compare: "Uporedi strukture", recommended: "Preporučeno",
      liability: "Odgovornost", min_capital: "Min. kapital", reg_cost: "Troškovi registracije",
      reg_time: "Rok registracije", tax_rate: "Poreska stopa", vat_threshold: "PDV prag",
      register_at: "Gdje se registrira", disclaimer: "Podaci verifikovani april 2026. Uvijek konsultujte lokalnog računovođu.",
    },
    mk: {
      income: "Месечен приход", expenses: "Расходи", add_expense: "+ Додади расход",
      calculate: "Пресметај буџет", needs: "Потреби", wants: "Желби", savings: "Штедење",
      surplus: "Вишок", deficit: "Дефицит", income_label: "Приход", total_expenses: "Вкупни расходи",
      target: "Цел 50% Потреби · 30% Желби · 20% Штедење",
      goal_name: "Назив на целта", goal_amount: "Целен износ", current_balance: "Тековна штедња",
      interest_rate: "Годишна каматна стапка (%)", target_date: "Целен датум",
      monthly_needed: "Потребна месечна штедња", time_to_goal: "Време до целта",
      months: "мес.", total_saved: "Вкупно заштедено", interest_earned: "Заработена камата",
      country: "Земја", compare: "Спореди структури", recommended: "Препорачано",
      liability: "Одговорност", min_capital: "Мин. капитал", reg_cost: "Трошок за регистрација",
      reg_time: "Рок за регистрација", tax_rate: "Даночна стапка", vat_threshold: "ДДВ праг",
      register_at: "Каде се регистрира", disclaimer: "Податоци верификувани април 2026. Секогаш консултирајте локален сметководител.",
    },
    sq: {
      income: "Të ardhura mujore", expenses: "Shpenzime", add_expense: "+ Shto shpenzim",
      calculate: "Llogarit buxhetin", needs: "Nevoja", wants: "Dëshira", savings: "Kursime",
      surplus: "Tepricë", deficit: "Deficit", income_label: "Të ardhura", total_expenses: "Shpenzime totale",
      target: "Qëllim 50% Nevoja · 30% Dëshira · 20% Kursime",
      goal_name: "Emri i qëllimit", goal_amount: "Shuma e synuar", current_balance: "Kursime aktuale",
      interest_rate: "Norma vjetore e interesit (%)", target_date: "Data e synuar",
      monthly_needed: "Kursim mujor i nevojshëm", time_to_goal: "Kohë deri te qëllimi",
      months: "muj.", total_saved: "Totali i kursyer", interest_earned: "Interesi i fituar",
      country: "Shteti", compare: "Krahaso strukturat", recommended: "I rekomanduar",
      liability: "Përgjegjësia", min_capital: "Kapital min.", reg_cost: "Kosto regjistrimi",
      reg_time: "Kohë regjistrimi", tax_rate: "Norma tatimore", vat_threshold: "Pragu i TVSH",
      register_at: "Ku regjistrohet", disclaimer: "Të dhëna të verifikuara prill 2026. Konsultohuni gjithmonë me një kontabilist lokal.",
    },
  };

  // Detect language from URL param ?lang=hr, then html[lang], then default 'hr'
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") || document.documentElement.lang || "hr";
  // Normalize: sr-Latn → sr-latn, sr-Cyrl → sr-cyrl
  lang = lang.toLowerCase().replace("sr-latn", "sr-latn").replace("sr-cyrl", "sr-latn");
  if (!STRINGS[lang]) lang = "hr";

  global.toolI18n = {
    lang: lang,
    t: function (key) {
      return (STRINGS[lang] && STRINGS[lang][key]) || (STRINGS["hr"] && STRINGS["hr"][key]) || key;
    },
  };
})(window);
