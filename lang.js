const langInput = document.querySelector(".lang-input");
const localized = document.querySelectorAll("[data-en][data-ru]");
const localizedHrefs = document.querySelectorAll("[data-en-href][data-ru-href]");
let currentLang = localStorage.getItem("lang") || "en";

const NBSP = String.fromCharCode(160);

function fixHangingPrepositions(text) {
  return text.replace(
    / (и|а|в|к|о|с|у|на|не|но|об|от|по|до|из|за|да|же|ни|ли|бы|то|или|для|без|под|над|при|про|как|что|уже|ещё|это|так|тут|вот|через|перед) /gi,
    " $1" + NBSP
  );
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localized.forEach((node) => {
    const text = node.dataset[lang];
    node.textContent = lang === "ru" ? fixHangingPrepositions(text) : text;
  });
  localizedHrefs.forEach((node) => {
    node.href = node.dataset[lang + "Href"];
  });
  if (langInput) langInput.checked = lang === "ru";
  document.querySelectorAll(".lang-label").forEach((label) => {
    label.classList.toggle("active", label.id === "lang-label-" + lang);
  });
  localStorage.setItem("lang", lang);
}

if (langInput) {
  langInput.addEventListener("change", () => {
    setLanguage(langInput.checked ? "ru" : "en");
  });
}

setLanguage(currentLang);
