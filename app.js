

// =============================
// VARIABLES
// =============================

let selectedGroup = "current";
let practiceMode = "complete";

let currentVerb;
let requestedForm;

let correctAnswers = 0;

// =============================
// ELEMENTOS HTML
// =============================

const verbWord =
    document.getElementById("verbWord");

const phonetic =
    document.getElementById("phonetic");

const answer =
    document.getElementById("answer");

const questionText =
    document.getElementById("questionText");

const modeLabel =
    document.getElementById("modeLabel");

const result =
    document.getElementById("result");

const counter =
    document.getElementById("counter");

const verbListSection =
    document.getElementById("verbListSection");

const verbTableBody =
    document.getElementById("verbTableBody");

// =============================
// MODAL VERBO
// =============================

const verbModal =
    document.getElementById("verbModal");

const modalVerbTitle =
    document.getElementById("modalVerbTitle");

const modalTranslation =
    document.getElementById("modalTranslation");


const modalInfinitive =
    document.getElementById("modalInfinitive");

const modalPast =
    document.getElementById("modalPast");

const modalParticiple =
    document.getElementById("modalParticiple");


const modalIpaInfinitive =
    document.getElementById("modalIpaInfinitive");

const modalIpaPast =
    document.getElementById("modalIpaPast");

const modalIpaParticiple =
    document.getElementById("modalIpaParticiple");

const formOptions =
    document.getElementById("formOptions");

const checkButton =
    document.getElementById("checkButton");


// =============================
// CARGAR JSON
// =============================

// async function startApp() {

//     try {

//         const response =
//             await fetch("./verbs.json");

//         if (!response.ok) {
//             throw new Error(
//                 `Error HTTP: ${response.status}`
//             );
//         }

//         verbs =
//             (await response.json())
//                 .flat()
//                 .filter(verb =>
//                     verb.group &&
//                     verb.infinitive
//                 );

//         console.log(
//             "Verbos cargados:",
//             verbs
//         );

//         console.log(
//             "Cantidad válida:",
//             verbs.length
//         );

//     }
//     catch (error) {

//         console.error(
//             "No se pudo cargar verbs.json:",
//             error
//         );

//         result.innerHTML = `
//             ❌ No se pudo cargar verbs.json.
//             <br>
//             Revisa la consola.
//         `;

//         return;
//     }


//     newQuestion();
// }
// =============================
// OBTENER LISTA
// =============================

function getCurrentList() {

    if (selectedGroup === "all") {
        return verbs;
    }

    return verbs.filter(
        verb => verb.group === selectedGroup
    );
}


//traer tabla
function renderVerbTable() {

    verbTableBody.innerHTML = "";


    verbs
        .filter(verb =>
            verb.group &&
            verb.infinitive &&
            verb.past &&
            verb.participle
        )
        .forEach(verb => {
            const row =
                document.createElement("tr");


            row.innerHTML = `

            <td>
                ${verb.infinitive}

                <br>

                <small>
                    ${verb.ipaInfinitive}
                </small>
            </td>


            <td>
                ${verb.past}

                <br>

                <small>
                    ${verb.ipaPast}
                </small>
            </td>


            <td>
                ${verb.participle}

                <br>

                <small>
                    ${verb.ipaParticiple}
                </small>
            </td>


            <td>
                ${verb.translation}
            </td>

        `;


            // =============================
            // CLICK EN EL VERBO
            // =============================

            row.addEventListener(
                "click",
                function () {

                    openVerbModal(verb);

                }
            );


            verbTableBody.appendChild(row);

        });
}
// =============================
// ABRIR DETALLE VERBO
// =============================


function openVerbModal(verb) {

    modalVerbTitle.textContent =
        verb.infinitive;

    modalTranslation.textContent =
        verb.translation;


    // INFINITIVE

    modalInfinitive.textContent =
        verb.infinitive;

    modalIpaInfinitive.textContent =
        verb.ipaInfinitive || "";


    // PAST

    modalPast.textContent =
        verb.past;

    modalIpaPast.textContent =
        verb.ipaPast || "";


    // PARTICIPLE

    modalParticiple.textContent =
        verb.participle;

    modalIpaParticiple.textContent =
        verb.ipaParticiple || "";


    // =============================
    // AUDIO
    // =============================

    document
        .getElementById("speakInfinitive")
        .onclick = function () {

            speak(verb.infinitive);

        };


    document
        .getElementById("speakPast")
        .onclick = function () {

            speak(verb.past);

        };


    document
        .getElementById("speakParticiple")
        .onclick = function () {

            speak(verb.participle);

        };


    // MOSTRAR

    verbModal.classList.remove("hidden");
}

// =============================
// COMPROBAR RESPUESTA
// =============================

function checkAnswer() {

    const userAnswer =
        answer.value.trim().toLowerCase();

    if (userAnswer === "") {
        return;
    }


    let correctAnswer;


    // =============================
    // COMPLETAR
    // =============================

    if (practiceMode === "complete") {

        correctAnswer =
            currentVerb[requestedForm]
                .toLowerCase();


        // caso especial: be -> was / were

        const possibleAnswers =
            correctAnswer
                .split("/")
                .map(item =>
                    item.trim()
                );


        if (
            possibleAnswers.includes(userAnswer)
        ) {

            showCorrect(
                currentVerb[requestedForm]
            );

            return;
        }


        showIncorrect(
            currentVerb[requestedForm]
        );

        return;
    }



    // =============================
    // IDENTIFICAR
    // =============================

    if (practiceMode === "identify") {

        const selectedForm =
            normalizeIdentifyAnswer(userAnswer);


        // No reconocemos lo que escribió
        if (!selectedForm) {

            result.className =
                "result incorrect";

            result.innerHTML = `
            ❌ Escribe:
            <br>
            <strong>
                infinitive, simple o participle
            </strong>
        `;

            return;
        }


        // Obtener TODAS las formas válidas
        // según palabra + pronunciación

        const validForms =
            getValidForms();


        const isCorrect =
            validForms.includes(selectedForm);


        const validNames =
            validForms
                .map(getFormName)
                .join(" · ");


        // =============================
        // CORRECTO
        // =============================

        if (isCorrect) {

            result.className =
                "result correct";


            if (validForms.length === 1) {

                result.innerHTML = `
                ✅ Correcto
                <br>

                <strong>
                    ${getFormName(selectedForm)}
                </strong>
            `;

            }

            else {

                result.innerHTML = `

                ✅ Correcto

                <br>

                <small>
                    Esta palabra puede ser:
                </small>

                <br>

                <strong>
                    ${validNames}
                </strong>

            `;
            }


            correctAnswers++;


            counter.textContent =
                `${correctAnswers} correctas`;

            return;
        }


        // =============================
        // INCORRECTO
        // =============================

        result.className =
            "result incorrect";


        result.innerHTML = `

        ❌ Incorrecto

        <br>

        <small>
            ${validForms.length > 1
                ? "Formas válidas:"
                : "Forma válida:"}
        </small>

        <br>

        <strong>
            ${validNames}
        </strong>

    `;

        return;
    }
}
function showIncorrect(correctAnswer) {

    const answerIPA =
        getAnswerIPA();


    let wordToSpeak;


    if (practiceMode === "identify") {

        wordToSpeak =
            currentVerb[requestedForm];

    } else {

        wordToSpeak =
            correctAnswer;
    }


    result.className =
        "result incorrect";


    result.innerHTML = `

        <div>
            ❌ Incorrecto
        </div>

        <div class="correct-answer">
            ${correctAnswer}
        </div>

        <div class="answer-phonetic">
            ${answerIPA}
        </div>

        <button
            class="answer-audio"
            onclick="speak('${wordToSpeak}')"
        >
            🔊 Escuchar respuesta
        </button>

    `;
}
/// text speech
function speak(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Tu navegador no soporta pronunciación por voz."
        );

        return;
    }


    /* detener pronunciación anterior */

    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";

    speech.rate = 0.8; //velocidad de la voz

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);
}

// =============================
// CORRECTO
// =============================

function showCorrect(correctAnswer) {

    result.className = "result correct";

    let wordToSpeak;
    let answerIPA;


    if (practiceMode === "identify") {

        wordToSpeak =
            currentVerb[requestedForm];

        answerIPA =
            getAnswerIPA();

    }

    else {

        wordToSpeak =
            correctAnswer;

        answerIPA =
            getAnswerIPA();

    }


    result.innerHTML = `

        <div>
            ✅ Correcto
        </div>

        <div class="correct-answer">
            ${wordToSpeak}
        </div>

        <div class="answer-phonetic">
            ${answerIPA}
        </div>

        <button
            class="answer-audio"
            onclick="speak('${wordToSpeak}')"
        >
            🔊 Escuchar
        </button>

    `;


    correctAnswers++;


    counter.textContent =
        `${correctAnswers} correctas`;
}

function getAnswerIPA() {

    if (requestedForm === "past") {
        return currentVerb.ipaPast || "";
    }

    if (requestedForm === "participle") {
        return currentVerb.ipaParticiple || "";
    }

    if (requestedForm === "infinitive") {
        return currentVerb.ipaInfinitive || "";
    }

    return "";
}

function newQuestion() {

    // =============================
    // LIMPIAR ESTADO ANTERIOR
    // =============================

    result.innerHTML = "";
    result.className = "result";

    answer.value = "";

    const list = getCurrentList();

    if (!list || list.length === 0) {
        result.className = "result incorrect";
        result.innerHTML = "No hay verbos disponibles en este grupo.";
        return;
    }


    // =============================
    // SELECCIONAR VERBO ALEATORIO
    // =============================

    currentVerb =
        list[
        Math.floor(
            Math.random() * list.length
        )
        ];


    // =============================
    // MODO COMPLETAR
    // =============================

    if (practiceMode === "complete") {

        answer.classList.remove("hidden");
        checkButton.classList.remove("hidden");
        formOptions.classList.add("hidden");

        const options = [
            "past",
            "participle"
        ];


        requestedForm =
            options[
            Math.floor(
                Math.random() * options.length
            )
            ];


        // Siempre mostramos el infinitivo
        verbWord.textContent =
            currentVerb.infinitive;


        phonetic.textContent =
            currentVerb.ipaInfinitive || "";


        if (requestedForm === "past") {

            questionText.textContent =
                "Escribe el Past Simple de:";

            modeLabel.textContent =
                "PAST SIMPLE";

        }

        else {

            questionText.textContent =
                "Escribe el Past Participle de:";

            modeLabel.textContent =
                "PAST PARTICIPLE";
        }


        answer.focus();

        return;
    }


    // =============================
    // MODO IDENTIFICAR ESCRIBIENDO
    // =============================

    if (practiceMode === "identify") {

        answer.classList.remove("hidden");
        checkButton.classList.remove("hidden");
        formOptions.classList.add("hidden");


        const forms = [
            "infinitive",
            "past",
            "participle"
        ];


        requestedForm =
            forms[
            Math.floor(
                Math.random() * forms.length
            )
            ];


        // Mostrar la forma seleccionada
        verbWord.textContent =
            currentVerb[requestedForm];


        // Mostrar IPA correspondiente
        phonetic.textContent =
            getCurrentIPA();


        questionText.textContent =
            "¿Qué forma verbal es?";


        modeLabel.textContent =
            "IDENTIFICAR";


        answer.focus();

        return;
    }


    // =============================
    // MODO SELECCIONAR FORMA
    // =============================

    if (practiceMode === "select") {

        // No necesitamos escribir
        answer.classList.add("hidden");
        checkButton.classList.add("hidden");

        // Mostrar las tres opciones
        formOptions.classList.remove("hidden");


        const forms = [
            "infinitive",
            "past",
            "participle"
        ];


        requestedForm =
            forms[
            Math.floor(
                Math.random() * forms.length
            )
            ];


        // Mostrar la palabra correspondiente
        verbWord.textContent =
            currentVerb[requestedForm];


        // IMPORTANTE:
        // esto permite distinguir casos como:
        // read /riːd/ vs read /rɛd/
        phonetic.textContent =
            getCurrentIPA();


        questionText.textContent =
            "Selecciona qué forma verbal es:";


        modeLabel.textContent =
            "SELECCIONAR FORMA";


        // =============================
        // REINICIAR BOTONES
        // =============================

        document
            .querySelectorAll(".form-option")
            .forEach(button => {

                button.classList.remove(
                    "correct-option",
                    "wrong-option"
                );

                button.disabled = false;

            });


        return;
    }
}
function getIPAByForm(verb, form) {

    if (form === "infinitive") {
        return verb.ipaInfinitive || "";
    }

    if (form === "past") {
        return verb.ipaPast || "";
    }

    if (form === "participle") {
        return verb.ipaParticiple || "";
    }

    return "";
}

function getValidForms() {

    const forms = [
        "infinitive",
        "past",
        "participle"
    ];

    const shownWord =
        currentVerb[requestedForm]
            .trim()
            .toLowerCase();

    const shownIPA =
        getIPAByForm(
            currentVerb,
            requestedForm
        );


    return forms.filter(form => {

        const sameWord =
            currentVerb[form]
                .trim()
                .toLowerCase()
            === shownWord;

        const sameIPA =
            getIPAByForm(
                currentVerb,
                form
            )
            === shownIPA;

        return sameWord && sameIPA;
    });
}

function getCurrentIPA() {

    if (requestedForm === "infinitive") {
        return currentVerb.ipaInfinitive || "";
    }

    if (requestedForm === "past") {
        return currentVerb.ipaPast || "";
    }

    if (requestedForm === "participle") {
        return currentVerb.ipaParticiple || "";
    }

    return "";
}



// =============================
// NOMBRE VISIBLE DE LA FORMA
// =============================

function getFormName(form) {

    if (form === "infinitive") {
        return "Infinitive";
    }

    if (form === "past") {
        return "Past Simple";
    }

    if (form === "participle") {
        return "Past Participle";
    }

    return form;
}


function normalizeIdentifyAnswer(userAnswer) {

    const value =
        userAnswer.trim().toLowerCase();


    if (
        value === "past" ||
        value === "past simple" ||
        value === "simple"
    ) {
        return "past";
    }


    if (
        value === "participle" ||
        value === "past participle" ||
        value === "participio"
    ) {
        return "participle";
    }


    if (
        value === "infinitive" ||
        value === "infinitivo"
    ) {
        return "infinitive";
    }


    return null;
}
function activateModeButton(selectedButton) {

    document
        .querySelectorAll(".mode-btn")
        .forEach(button =>
            button.classList.remove("active")
        );

    selectedButton.classList.add("active");
}
// =============================
// BOTONES
// =============================

document
    .getElementById("checkButton")
    .addEventListener("click", checkAnswer);


document
    .getElementById("nextButton")
    .addEventListener("click", newQuestion);

document
    .getElementById("speakQuestion")
    .addEventListener("click", function () {

        speak(
            verbWord.textContent.trim()
        );

    });

// ENTER


//tabla 
document
    .getElementById("showVerbList")
    .addEventListener("click", function () {

        renderVerbTable();

        verbListSection.classList.remove("hidden");

    });

// =============================
// CERRAR MODAL
// =============================

document
    .getElementById("closeVerbModal")
    .addEventListener("click", function () {

        verbModal.classList.add("hidden");

    });
verbModal.addEventListener(
    "click",
    function (event) {

        if (event.target === verbModal) {

            verbModal.classList.add("hidden");

        }

    }
);
document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            verbModal.classList.add("hidden");

        }

    }
);
document
    .getElementById("closeVerbList")
    .addEventListener("click", function () {

        verbListSection.classList.add("hidden");

    });


answer.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        checkAnswer();
    }

});


// GRUPOS

document
    .querySelectorAll(".group-btn")
    .forEach(button => {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".group-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            this.classList.add("active");

            selectedGroup =
                this.dataset.group;

            newQuestion();
        });

    });


// MODOS

document
    .getElementById("completeMode")
    .addEventListener("click", function () {

        practiceMode = "complete";

        document
            .querySelectorAll(".mode-btn")
            .forEach(button =>
                button.classList.remove("active")
            );

        this.classList.add("active");

        newQuestion();
    });

document
    .getElementById("identifyMode")
    .addEventListener("click", function () {

        practiceMode = "identify";

        document
            .querySelectorAll(".mode-btn")
            .forEach(button =>
                button.classList.remove("active")
            );

        this.classList.add("active");

        newQuestion();
    });
document
    .getElementById("selectMode")
    .addEventListener("click", function () {

        practiceMode = "select";

        document
            .querySelectorAll(".mode-btn")
            .forEach(button =>
                button.classList.remove("active")
            );

        this.classList.add("active");

        newQuestion();
    });

// =============================
// SELECCIONAR FORMA
// =============================

document
    .querySelectorAll(".form-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const selectedForm =
                    this.dataset.form;


                // Todas las formas que pueden
                // representar la palabra mostrada

                const validForms =
                    getValidForms();


                const isCorrect =
                    validForms.includes(
                        selectedForm
                    );


                // =============================
                // DESACTIVAR BOTONES
                // =============================

                document
                    .querySelectorAll(".form-option")
                    .forEach(option => {

                        option.disabled = true;

                    });


                // =============================
                // MARCAR TODAS LAS VÁLIDAS
                // =============================

                validForms.forEach(form => {

                    const validButton =
                        document.querySelector(
                            `.form-option[data-form="${form}"]`
                        );


                    if (validButton) {

                        validButton.classList.add(
                            "correct-option"
                        );

                    }

                });


                // =============================
                // RESPUESTA CORRECTA
                // =============================

                if (isCorrect) {

                    result.className =
                        "result correct";


                    if (validForms.length === 1) {

                        result.innerHTML = `
                            ✅ Correcto
                        `;

                    }

                    else {

                        const validNames =
                            validForms
                                .map(getFormName)
                                .join(" · ");


                        result.innerHTML = `

                            ✅ Correcto

                            <br>

                            <small>
                                Esta forma también puede ser:
                            </small>

                            <br>

                            <strong>
                                ${validNames}
                            </strong>

                        `;

                    }


                    correctAnswers++;


                    counter.textContent =
                        `${correctAnswers} correctas`;

                }


                // =============================
                // RESPUESTA INCORRECTA
                // =============================

                else {

                    this.classList.add(
                        "wrong-option"
                    );


                    const validNames =
                        validForms
                            .map(getFormName)
                            .join(" · ");


                    result.className =
                        "result incorrect";


                    result.innerHTML = `

                        ❌ Incorrecto

                        <br>

                        <small>
                            Respuesta${validForms.length > 1 ? "s" : ""} válida${validForms.length > 1 ? "s" : ""}:
                        </small>

                        <br>

                        <strong>
                            ${validNames}
                        </strong>

                    `;

                }

            }
        );

    });
// =============================
// INICIAR APP
// =============================

// startApp();
newQuestion();