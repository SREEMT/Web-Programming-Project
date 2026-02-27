import en from "../locales/en.js";
import es from "../locales/es.js";

const toggle = document.getElementById("localeToggle");

function applyTranslations(locale) {
    document.getElementById("heroTitle").textContent = locale.heroTitle;
    document.getElementById("heroSubtitle").textContent = locale.heroSubtitle;
    document.getElementById("watchlistTitle").textContent = locale.watchlistTitle;
    document.getElementById("loginBtn").textContent = locale.loginBtn;
    document.getElementById("signupBtn").textContent = locale.signupBtn;
}

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        applyTranslations(es);
        toggle.nextElementSibling.textContent = "EN";
    } else {
        applyTranslations(en);
        toggle.nextElementSibling.textContent = "ES";
    }
});