const TRANSLATIONS = {
    es: {
        app: {
            title: "Irregular Verbs",
            subtitle: "Practica escribiendo, no memorizando una tabla."
        },
        buttons: {
            check: "Comprobar",
            next: "Siguiente verbo →",
            list: "📚 Ver lista completa",
            close: "Cerrar",
            listen: "Escuchar",
            listenAnswer: "Escuchar respuesta",
            switchLanguage: "Cambiar a inglés",
            lightTheme: "Activar tema claro",
            darkTheme: "Activar tema oscuro"
        },
        answer: { placeholder: "Escribe tu respuesta..." },
        practice: {
            type: "Tipo de práctica",
            complete: "Completar",
            identify: "Identificar forma",
            select: "Seleccionar forma"
        },
        groups: {
            title: "Grupo de verbos",
            review: "15 primeros verbos",
            current: "20 siguientes",
            future: "Últimos 38",
            all: "Todos"
        },
        questions: {
            writePast: "Escribe el Past Simple de:",
            writeParticiple: "Escribe el Past Participle de:",
            identify: "¿Qué forma verbal es?",
            select: "Selecciona qué forma verbal es:"
        },
        forms: {
            infinitive: "Infinitive",
            past: "Past Simple",
            participle: "Past Participle"
        },
        results: {
            correct: "Correcto",
            incorrect: "Incorrecto",
            validForm: "Forma válida:",
            validForms: "Formas válidas:",
            wordCanBe: "Esta palabra también puede ser:",
            writeHint: "Escribe:",
            noVerbs: "No hay verbos disponibles en este grupo."
        },
        counter: {
            one: "{count} correcta",
            many: "{count} correctas"
        },
        list: {
            eyebrow: "IRREGULAR VERBS",
            title: "Lista completa",
            translation: "Español"
        },
        modal: { eyebrow: "IRREGULAR VERB" },
        errors: { speechUnsupported: "Tu navegador no soporta pronunciación por voz." }
    },
    en: {
        app: {
            title: "Irregular Verbs",
            subtitle: "Practice writing, not memorizing a table."
        },
        buttons: {
            check: "Check",
            next: "Next verb →",
            list: "📚 View complete list",
            close: "Close",
            listen: "Listen",
            listenAnswer: "Listen to answer",
            switchLanguage: "Switch to Spanish",
            lightTheme: "Use light theme",
            darkTheme: "Use dark theme"
        },
        answer: { placeholder: "Type your answer..." },
        practice: {
            type: "Practice type",
            complete: "Complete",
            identify: "Identify form",
            select: "Select form"
        },
        groups: {
            title: "Verb group",
            review: "First 15 verbs",
            current: "Next 20",
            future: "Last 38",
            all: "All"
        },
        questions: {
            writePast: "Write the Past Simple of:",
            writeParticiple: "Write the Past Participle of:",
            identify: "Which verb form is it?",
            select: "Select the verb form:"
        },
        forms: {
            infinitive: "Infinitive",
            past: "Past Simple",
            participle: "Past Participle"
        },
        results: {
            correct: "Correct",
            incorrect: "Incorrect",
            validForm: "Valid form:",
            validForms: "Valid forms:",
            wordCanBe: "This word can also be:",
            writeHint: "Type:",
            noVerbs: "There are no verbs available in this group."
        },
        counter: {
            one: "{count} correct",
            many: "{count} correct"
        },
        list: {
            eyebrow: "IRREGULAR VERBS",
            title: "Complete list",
            translation: "Spanish"
        },
        modal: { eyebrow: "IRREGULAR VERB" },
        errors: { speechUnsupported: "Your browser does not support text-to-speech." }
    }
};

const VERB_FORMS = ["infinitive", "past", "participle"];
const COMPLETE_FORMS = ["past", "participle"];

let selectedGroup = "current";
let practiceMode = "complete";
let currentVerb;
let requestedForm;
let correctAnswers = 0;
let questionAnswered = false;
let currentLanguage = localStorage.getItem("language") === "en" ? "en" : "es";
let translations = TRANSLATIONS[currentLanguage];

const elements = {
    themeToggle: document.getElementById("themeToggle"),
    languageToggle: document.getElementById("languageToggle"),
    verbWord: document.getElementById("verbWord"),
    phonetic: document.getElementById("phonetic"),
    answer: document.getElementById("answer"),
    questionText: document.getElementById("questionText"),
    modeLabel: document.getElementById("modeLabel"),
    result: document.getElementById("result"),
    counter: document.getElementById("counter"),
    formOptions: document.getElementById("formOptions"),
    checkButton: document.getElementById("checkButton"),
    nextButton: document.getElementById("nextButton"),
    verbListSection: document.getElementById("verbListSection"),
    verbTableBody: document.getElementById("verbTableBody"),
    verbModal: document.getElementById("verbModal"),
    modalVerbTitle: document.getElementById("modalVerbTitle"),
    modalTranslation: document.getElementById("modalTranslation"),
    modalInfinitive: document.getElementById("modalInfinitive"),
    modalPast: document.getElementById("modalPast"),
    modalParticiple: document.getElementById("modalParticiple"),
    modalIpaInfinitive: document.getElementById("modalIpaInfinitive"),
    modalIpaPast: document.getElementById("modalIpaPast"),
    modalIpaParticiple: document.getElementById("modalIpaParticiple"),
    speakInfinitive: document.getElementById("speakInfinitive"),
    speakPast: document.getElementById("speakPast"),
    speakParticiple: document.getElementById("speakParticiple")
};

const formOptionButtons = [...document.querySelectorAll(".form-option")];

function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    if (elements.themeToggle) {
        elements.themeToggle.textContent = isLight ? "🌙" : "☀️";
        elements.themeToggle.setAttribute(
            "aria-label",
            t(isLight ? "buttons.darkTheme" : "buttons.lightTheme", "Cambiar tema")
        );
        elements.themeToggle.title = elements.themeToggle.getAttribute("aria-label");
    }
}

function initializeTheme() {
    applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");
    elements.themeToggle?.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
}

function t(path, fallback = "") {
    const value = path.split(".").reduce((object, key) => object?.[key], translations);
    return value ?? fallback;
}

function applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = t(element.dataset.i18n, element.textContent);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder, element.placeholder);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        element.setAttribute(
            "aria-label",
            t(element.dataset.i18nAriaLabel, element.getAttribute("aria-label") || "")
        );
    });
    elements.languageToggle.textContent = currentLanguage === "es" ? "EN" : "ES";
    elements.languageToggle.setAttribute("aria-label", t("buttons.switchLanguage"));
    elements.languageToggle.title = t("buttons.switchLanguage");
    document.documentElement.lang = currentLanguage;
    applyTheme(document.body.classList.contains("light") ? "light" : "dark");
    updateCounter();
}

function formatTranslation(path, replacements = {}) {
    return Object.entries(replacements).reduce(
        (text, [key, value]) => text.replaceAll(`{${key}}`, value),
        t(path)
    );
}

function updateCounter() {
    const key = correctAnswers === 1 ? "counter.one" : "counter.many";
    elements.counter.textContent = formatTranslation(key, { count: correctAnswers });
}

function addCorrectAnswer() {
    correctAnswers += 1;
    updateCounter();
}

function getCurrentList() {
    return selectedGroup === "all"
        ? verbs
        : verbs.filter(verb => verb.group === selectedGroup);
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getIPAByForm(verb, form) {
    const ipaProperties = {
        infinitive: "ipaInfinitive",
        past: "ipaPast",
        participle: "ipaParticiple"
    };
    return verb?.[ipaProperties[form]] || "";
}

function getFormName(form) {
    return t(`forms.${form}`, form);
}

function getValidForms() {
    const shownWord = currentVerb[requestedForm].trim().toLowerCase();
    const shownIPA = getIPAByForm(currentVerb, requestedForm);
    return VERB_FORMS.filter(form => (
        currentVerb[form].trim().toLowerCase() === shownWord
        && getIPAByForm(currentVerb, form) === shownIPA
    ));
}

function normalizeIdentifyAnswer(userAnswer) {
    const aliases = {
        past: "past",
        "past simple": "past",
        simple: "past",
        participle: "participle",
        "past participle": "participle",
        participio: "participle",
        infinitive: "infinitive",
        infinitivo: "infinitive"
    };
    return aliases[userAnswer.trim().toLowerCase()] || null;
}

function setQuestionLocked(isLocked) {
    questionAnswered = isLocked;
    elements.answer.disabled = isLocked;
    elements.checkButton.disabled = isLocked;
    if (practiceMode === "select") {
        formOptionButtons.forEach(button => {
            button.disabled = isLocked;
        });
    }
}

function resetQuestionUI() {
    elements.result.replaceChildren();
    elements.result.className = "result";
    elements.answer.value = "";
    elements.answer.disabled = false;
    elements.checkButton.disabled = false;
    questionAnswered = false;
    formOptionButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct-option", "wrong-option");
    });
}

function showAnswerFeedback(isCorrect, word, ipa) {
    elements.result.className = `result ${isCorrect ? "correct" : "incorrect"}`;
    elements.result.innerHTML = `
        <div>${isCorrect ? "✅" : "❌"} ${t(isCorrect ? "results.correct" : "results.incorrect")}</div>
        <div class="correct-answer"></div>
        <div class="answer-phonetic"></div>
        <button class="answer-audio" type="button"></button>
    `;
    elements.result.querySelector(".correct-answer").textContent = word;
    elements.result.querySelector(".answer-phonetic").textContent = ipa;
    const audioButton = elements.result.querySelector(".answer-audio");
    audioButton.textContent = `🔊 ${t(isCorrect ? "buttons.listen" : "buttons.listenAnswer")}`;
    audioButton.addEventListener("click", () => speak(word));
}

function showFormFeedback(isCorrect, validForms, selectedForm = null) {
    const validNames = validForms.map(getFormName).join(" · ");
    const hasSeveralForms = validForms.length > 1;
    let explanation = "";
    if (isCorrect && hasSeveralForms) {
        explanation = t("results.wordCanBe");
    } else if (!isCorrect) {
        explanation = t(hasSeveralForms ? "results.validForms" : "results.validForm");
    }
    elements.result.className = `result ${isCorrect ? "correct" : "incorrect"}`;
    elements.result.innerHTML = `
        ${isCorrect ? "✅" : "❌"} ${t(isCorrect ? "results.correct" : "results.incorrect")}
        ${explanation ? `<br><small>${explanation}</small><br><strong></strong>` : ""}
    `;
    const strong = elements.result.querySelector("strong");
    if (strong) {
        strong.textContent = validNames;
    } else if (isCorrect && selectedForm) {
        const detail = document.createElement("strong");
        detail.textContent = getFormName(selectedForm);
        elements.result.append(document.createElement("br"), detail);
    }
}

function checkAnswer() {
    if (questionAnswered) {
        return;
    }
    const userAnswer = elements.answer.value.trim().toLowerCase();
    if (!userAnswer) {
        return;
    }
    if (practiceMode === "complete") {
        const correctAnswer = currentVerb[requestedForm];
        const possibleAnswers = correctAnswer.toLowerCase().split("/").map(item => item.trim());
        const isCorrect = possibleAnswers.includes(userAnswer);
        setQuestionLocked(true);
        showAnswerFeedback(isCorrect, correctAnswer, getIPAByForm(currentVerb, requestedForm));
        if (isCorrect) {
            addCorrectAnswer();
        }
        return;
    }
    if (practiceMode === "identify") {
        const selectedForm = normalizeIdentifyAnswer(userAnswer);
        if (!selectedForm) {
            elements.result.className = "result incorrect";
            elements.result.innerHTML = `❌ ${t("results.writeHint")}<br><strong>infinitive, simple, participle</strong>`;
            return;
        }
        const validForms = getValidForms();
        const isCorrect = validForms.includes(selectedForm);
        setQuestionLocked(true);
        showFormFeedback(isCorrect, validForms, selectedForm);
        if (isCorrect) {
            addCorrectAnswer();
        }
    }
}

function configureWrittenMode() {
    elements.answer.classList.remove("hidden");
    elements.checkButton.classList.remove("hidden");
    elements.formOptions.classList.add("hidden");
}

function configureFormQuestion() {
    requestedForm = randomItem(VERB_FORMS);
    elements.verbWord.textContent = currentVerb[requestedForm];
    elements.phonetic.textContent = getIPAByForm(currentVerb, requestedForm);
}

function newQuestion() {
    resetQuestionUI();
    const list = getCurrentList();
    if (!list.length) {
        elements.result.className = "result incorrect";
        elements.result.textContent = t("results.noVerbs");
        return;
    }
    currentVerb = randomItem(list);
    if (practiceMode === "complete") {
        configureWrittenMode();
        requestedForm = randomItem(COMPLETE_FORMS);
        elements.verbWord.textContent = currentVerb.infinitive;
        elements.phonetic.textContent = currentVerb.ipaInfinitive || "";
        elements.questionText.textContent = t(`questions.${requestedForm === "past" ? "writePast" : "writeParticiple"}`);
        elements.modeLabel.textContent = getFormName(requestedForm).toUpperCase();
        elements.answer.focus();
        return;
    }
    configureFormQuestion();
    if (practiceMode === "identify") {
        configureWrittenMode();
        elements.questionText.textContent = t("questions.identify");
        elements.modeLabel.textContent = t("practice.identify").toUpperCase();
        elements.answer.focus();
        return;
    }
    elements.answer.classList.add("hidden");
    elements.checkButton.classList.add("hidden");
    elements.formOptions.classList.remove("hidden");
    elements.questionText.textContent = t("questions.select");
    elements.modeLabel.textContent = t("practice.select").toUpperCase();
}

function renderVerbTable() {
    elements.verbTableBody.replaceChildren();
    verbs.forEach(verb => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${verb.infinitive}<br><small>${verb.ipaInfinitive || ""}</small></td>
            <td>${verb.past}<br><small>${verb.ipaPast || ""}</small></td>
            <td>${verb.participle}<br><small>${verb.ipaParticiple || ""}</small></td>
            <td>${verb.translation}</td>
        `;
        row.addEventListener("click", () => openVerbModal(verb));
        elements.verbTableBody.appendChild(row);
    });
}

function openVerbModal(verb) {
    const modalForms = [
        ["infinitive", elements.modalInfinitive, elements.modalIpaInfinitive, elements.speakInfinitive],
        ["past", elements.modalPast, elements.modalIpaPast, elements.speakPast],
        ["participle", elements.modalParticiple, elements.modalIpaParticiple, elements.speakParticiple]
    ];
    elements.modalVerbTitle.textContent = verb.infinitive;
    elements.modalTranslation.textContent = verb.translation;
    modalForms.forEach(([form, wordElement, ipaElement, audioButton]) => {
        wordElement.textContent = verb[form];
        ipaElement.textContent = getIPAByForm(verb, form);
        audioButton.onclick = () => speak(verb[form]);
    });
    elements.verbModal.classList.remove("hidden");
}

function closeVerbModal() {
    elements.verbModal.classList.add("hidden");
}

function speak(text) {
    if (!("speechSynthesis" in window)) {
        alert(t("errors.speechUnsupported"));
        return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.8;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

function selectPracticeMode(button) {
    document.querySelectorAll(".mode-btn").forEach(item => {
        item.classList.toggle("active", item === button);
    });
    practiceMode = button.dataset.mode;
    newQuestion();
}

function selectGroup(button) {
    document.querySelectorAll(".group-btn").forEach(item => {
        item.classList.toggle("active", item === button);
    });
    selectedGroup = button.dataset.group;
    newQuestion();
}

function selectForm(button) {
    if (questionAnswered) {
        return;
    }
    const validForms = getValidForms();
    const isCorrect = validForms.includes(button.dataset.form);
    setQuestionLocked(true);
    validForms.forEach(form => {
        document.querySelector(`.form-option[data-form="${form}"]`)?.classList.add("correct-option");
    });
    if (!isCorrect) {
        button.classList.add("wrong-option");
    }
    showFormFeedback(isCorrect, validForms, button.dataset.form);
    if (isCorrect) {
        addCorrectAnswer();
    }
}

function bindEvents() {
    elements.checkButton.addEventListener("click", checkAnswer);
    elements.nextButton.addEventListener("click", newQuestion);
    document.getElementById("speakQuestion").addEventListener("click", () => {
        speak(elements.verbWord.textContent.trim());
    });
    elements.answer.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    document.querySelectorAll(".mode-btn").forEach(button => {
        button.addEventListener("click", () => selectPracticeMode(button));
    });
    document.querySelectorAll(".group-btn").forEach(button => {
        button.addEventListener("click", () => selectGroup(button));
    });
    formOptionButtons.forEach(button => {
        button.addEventListener("click", () => selectForm(button));
    });
    document.getElementById("showVerbList").addEventListener("click", () => {
        renderVerbTable();
        elements.verbListSection.classList.remove("hidden");
    });
    document.getElementById("closeVerbList").addEventListener("click", () => {
        elements.verbListSection.classList.add("hidden");
    });
    document.getElementById("closeVerbModal").addEventListener("click", closeVerbModal);
    elements.verbModal.addEventListener("click", event => {
        if (event.target === elements.verbModal) {
            closeVerbModal();
        }
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeVerbModal();
        }
    });
    elements.languageToggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "es" ? "en" : "es";
        translations = TRANSLATIONS[currentLanguage];
        localStorage.setItem("language", currentLanguage);
        applyLanguage();
        newQuestion();
    });
}

function startApp() {
    initializeTheme();
    bindEvents();
    applyLanguage();
    newQuestion();
}

startApp();
