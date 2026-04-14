// OSFL Balkans — site.js
// Language preference persistence + country selector

(function () {
  // --- Language preference ---
  // Saves the current language to localStorage so the switcher can highlight
  // the last-used language on the home page.
  var lang = document.documentElement.lang;
  if (lang) localStorage.setItem('osfl_lang', lang);

  // --- Country selector persistence ---
  // When a user selects a country, store it and show the relevant supplement.
  window.setCountry = function (countryCode) {
    if (countryCode) {
      localStorage.setItem('osfl_country', countryCode);
    } else {
      localStorage.removeItem('osfl_country');
    }
    applyCountryFilter(countryCode);
  };

  function applyCountryFilter(countryCode) {
    // Supplement panels: elements with class supplement-panel and data-country attribute
    document.querySelectorAll('.supplement-panel').forEach(function (el) {
      if (!countryCode || el.dataset.country === countryCode) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // Restore on page load
  document.addEventListener('DOMContentLoaded', function () {
    var savedCountry = localStorage.getItem('osfl_country');
    var select = document.getElementById('country-select');
    if (select && savedCountry) {
      select.value = savedCountry;
      applyCountryFilter(savedCountry);
    }
  });
})();
