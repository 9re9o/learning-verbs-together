

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
// NUEVA PREGUNTA
// =============================

function newQuestion() {

    result.innerHTML = "";
    answer.value = "";

    const list = getCurrentList();
    console.log(
        "Grupo actual:",
        selectedGroup
    );
    console.log(
        "Verbos disponibles:",
        list
    );

    currentVerb =
        list[Math.floor(Math.random() * list.length)];


    if (practiceMode === "complete") {

        const options = ["past", "participle"];

        requestedForm =
            options[Math.floor(Math.random() * options.length)];


        verbWord.textContent =
            currentVerb.infinitive;


        phonetic.textContent =
            currentVerb.ipaInfinitive || "";


        if (requestedForm === "past") {

            questionText.textContent =
                "Escribe el Past Simple de:";

            modeLabel.textContent =
                "PAST SIMPLE";

        } else {

            questionText.textContent =
                "Escribe el Past Participle de:";

            modeLabel.textContent =
                "PAST PARTICIPLE";
        }

    }

    else {

        const forms = [
            "infinitive",
            "past",
            "participle"
        ];

        requestedForm =
            forms[Math.floor(Math.random() * forms.length)];


        verbWord.textContent =
            currentVerb[requestedForm];


        phonetic.textContent = "";

        questionText.textContent =
            "¿Qué forma verbal es?";

        modeLabel.textContent =
            "IDENTIFICAR";
    }
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

        let isCorrect = false;


        if (
            requestedForm === "past" &&
            (
                userAnswer === "past" ||
                userAnswer === "past simple"
            )
        ) {
            isCorrect = true;
        }


        if (
            requestedForm === "participle" &&
            (
                userAnswer === "participle" ||
                userAnswer === "past participle"
            )
        ) {
            isCorrect = true;
        }


        if (
            requestedForm === "infinitive" &&
            (
                userAnswer === "infinitive" ||
                userAnswer === "infinitivo"
            )
        ) {
            isCorrect = true;
        }


        if (isCorrect) {

            showCorrect(
                requestedForm
            );

        } else {

            showIncorrect(
                requestedForm
            );
        }

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

    result.innerHTML = "";
    answer.value = "";

    const list =
        getCurrentList();

    currentVerb =
        list[
        Math.floor(
            Math.random() * list.length
        )
        ];


    // =============================
    // COMPLETAR
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

        verbWord.textContent =
            currentVerb.infinitive;

        phonetic.textContent =
            currentVerb.ipaInfinitive || "";

        if (requestedForm === "past") {

            questionText.textContent =
                "Escribe el Past Simple de:";

            modeLabel.textContent =
                "PAST SIMPLE";

        } else {

            questionText.textContent =
                "Escribe el Past Participle de:";

            modeLabel.textContent =
                "PAST PARTICIPLE";
        }

        return;
    }


    // =============================
    // IDENTIFICAR ESCRIBIENDO
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

        verbWord.textContent =
            currentVerb[requestedForm];

        phonetic.textContent =
            getCurrentIPA();

        questionText.textContent =
            "¿Qué forma verbal es?";

        modeLabel.textContent =
            "IDENTIFICAR";

        return;
    }


    // =============================
    // SELECCIONAR FORMA
    // =============================

    if (practiceMode === "select") {

        answer.classList.add("hidden");
        checkButton.classList.add("hidden");
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

        verbWord.textContent =
            currentVerb[requestedForm];

        phonetic.textContent =
            getCurrentIPA();

        questionText.textContent =
            "Selecciona qué forma verbal es:";

        modeLabel.textContent =
            "SELECCIONAR FORMA";

        document
            .querySelectorAll(".form-option")
            .forEach(button => {

                button.classList.remove(
                    "correct-option",
                    "wrong-option"
                );

                button.disabled = false;

            });
    }
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

        this.classList.add("active");

        document
            .getElementById("identifyMode")
            .classList.remove("active");

        newQuestion();
    });

document
    .getElementById("identifyMode")
    .addEventListener("click", function () {

        practiceMode = "identify";

        this.classList.add("active");

        document
            .getElementById("completeMode")
            .classList.remove("active");

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

document
    .querySelectorAll(".form-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const selectedForm =
                    this.dataset.form;


                const isCorrect =
                    selectedForm === requestedForm;


                if (isCorrect) {

                    this.classList.add(
                        "correct-option"
                    );

                    result.className =
                        "result correct";

                    result.innerHTML = `
                        ✅ Correcto
                    `;

                    correctAnswers++;

                    counter.textContent =
                        `${correctAnswers} correctas`;

                } else {

                    this.classList.add(
                        "wrong-option"
                    );


                    const correctButton =
                        document.querySelector(
                            `.form-option[data-form="${requestedForm}"]`
                        );


                    correctButton.classList.add(
                        "correct-option"
                    );


                    result.className =
                        "result incorrect";


                    let correctName;


                    if (
                        requestedForm === "infinitive"
                    ) {
                        correctName =
                            "Infinitive";
                    }

                    if (
                        requestedForm === "past"
                    ) {
                        correctName =
                            "Past Simple";
                    }

                    if (
                        requestedForm === "participle"
                    ) {
                        correctName =
                            "Past Participle";
                    }


                    result.innerHTML = `
                        ❌ Incorrecto
                        <br>
                        <strong>
                            ${correctName}
                        </strong>
                    `;
                }


                document
                    .querySelectorAll(
                        ".form-option"
                    )
                    .forEach(option => {

                        option.disabled = true;

                    });

            }
        );

    });
// =============================
// INICIAR APP
// =============================

// startApp();
newQuestion();