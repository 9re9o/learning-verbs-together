**Este código fue creado principalmente a vibe coding**
# 📘 Irregular Verbs Practice

Aplicación web sencilla para practicar **verbos irregulares en inglés** de forma interactiva.

El objetivo principal es aprender a identificar y escribir correctamente:

- **Infinitive**
- **Past Simple**
- **Past Participle**

La aplicación está pensada principalmente para usarse desde **móviles**, aunque también funciona correctamente en computadora.

---

## 🚀 Características

- Práctica de verbos irregulares mediante escritura.
- Selección aleatoria de verbos.
- Práctica de:
  - Past Simple.
  - Past Participle.
  - Identificación de la forma verbal.
- Pronunciación mediante **Text-to-Speech** del navegador.
- Fonética IPA para cada forma verbal.
- Traducción al español.
- Interfaz en modo oscuro.
- Organización de verbos por grupos de estudio:
  - `review` → Repaso.
  - `current` → Verbos actuales.
  - `future` → Verbos para estudiar después.
- Lista completa de verbos.
- Tabla con:
  - Infinitive.
  - Past Simple.
  - Past Participle.
  - Traducción.
  - Pronunciación fonética.
- Ventana emergente al seleccionar un verbo de la tabla.
- Pronunciación individual de cada forma verbal.
- Diseño responsive para móviles.

---

## 🧠 Objetivo

La aplicación busca evitar depender únicamente de tablas de memorización.

En lugar de mostrar siempre las tres formas del verbo, el usuario debe **recordar y escribir la respuesta**.

Por ejemplo:

```text
PAST SIMPLE

drive
/draɪv/

Escribe tu respuesta:
drove
```

Después de comprobar:

```text
✅ Correcto

drove
/droʊv/

🔊 Escuchar
```

El flujo de estudio es:

**lectura → memoria → escritura → corrección → pronunciación**

---

## 📂 Estructura del proyecto

```text
irregular-verbs/
│
├── index.html
├── style.css
├── app.js
├── verbs.js
└── README.md
```

### `index.html`

Contiene la estructura principal de la aplicación.

### `style.css`

Contiene los estilos visuales, el diseño responsive y el modo oscuro.

### `app.js`

Contiene la lógica principal de la aplicación:

- Selección aleatoria de verbos.
- Validación de respuestas.
- Selección de grupos.
- Modos de práctica.
- Generación de la tabla.
- Ventana de detalle de cada verbo.
- Text-to-Speech.

### `verbs.js`

Contiene todos los verbos utilizados por la aplicación y sus datos.

Ejemplo:

```javascript
{
    group: "current",
    infinitive: "drive",
    past: "drove",
    participle: "driven",
    translation: "conducir",

    ipaInfinitive: "/draɪv/",
    ipaPast: "/droʊv/",
    ipaParticiple: "/ˈdrɪvən/"
}
```

---

## ✍️ Modos de práctica

Actualmente existen dos modos principales.

### Completar

La aplicación muestra el infinitivo de un verbo y solicita escribir una de sus formas.

Ejemplo:

```text
PAST PARTICIPLE

drink
/drɪŋk/

[ Escribe tu respuesta... ]
```

Respuesta:

```text
drunk
```

Después de comprobar:

```text
✅ Correcto

DRUNK
/drʌŋk/

🔊 Escuchar
```

---

### Identificar

La aplicación muestra una forma verbal y el usuario debe identificar qué forma es.

Ejemplo:

```text
DRIVEN
```

El usuario debe identificarlo como:

```text
Past Participle
```

Las formas disponibles son:

- Infinitive.
- Past Simple.
- Past Participle.

---

## 🔊 Pronunciación

La aplicación utiliza la API de voz integrada en el navegador:

```javascript
window.speechSynthesis
```

La pronunciación está configurada para inglés estadounidense:

```javascript
speech.lang = "en-US";
```

La velocidad puede modificarse desde JavaScript:

```javascript
speech.rate = 0.8;
```

Esto permite escuchar tanto:

- El verbo que aparece en la pregunta.
- La respuesta correcta.
- Cada una de las tres formas verbales desde la lista completa.

No se necesitan archivos de audio externos.

> La calidad y el tipo de voz pueden variar dependiendo del navegador y del dispositivo utilizado.

---

## 🔤 Fonética IPA

Cada verbo incluye su pronunciación escrita mediante **IPA (International Phonetic Alphabet)**.

Ejemplo:

```text
drive
/draɪv/

drove
/droʊv/

driven
/ˈdrɪvən/
```

Los datos se almacenan en `verbs.js`.

Ejemplo:

```javascript
ipaInfinitive: "/draɪv/",
ipaPast: "/droʊv/",
ipaParticiple: "/ˈdrɪvən/"
```

---

## 🌎 Traducción

Cada verbo incluye también una traducción al español.

Ejemplo:

```javascript
translation: "conducir"
```

Esto permite asociar el verbo en inglés con su significado sin mostrar directamente sus formas irregulares durante el ejercicio.

---

## 📚 Lista completa

La aplicación incluye una sección para consultar todos los verbos disponibles.

La tabla muestra:

| Infinitive | Past Simple | Past Participle | Español |
|---|---|---|---|
| drive | drove | driven | conducir |
| drink | drank | drunk | beber |
| eat | ate | eaten | comer |

También se muestra la fonética IPA debajo de cada forma verbal.

---

## 🔎 Detalle de un verbo

Al seleccionar un verbo dentro de la tabla se abre una ventana emergente con toda su información.

Por ejemplo:

```text
DRIVE
conducir

INFINITIVE
drive
/draɪv/
🔊

PAST SIMPLE
drove
/droʊv/
🔊

PAST PARTICIPLE
driven
/ˈdrɪvən/
🔊
```

Cada forma puede reproducirse individualmente mediante Text-to-Speech.

---

## 🗂️ Grupos de estudio

Los verbos están organizados en diferentes grupos.

### Repaso

```javascript
group: "review"
```

Contiene verbos estudiados anteriormente que se desean seguir repasando.

---

### Ahora

```javascript
group: "current"
```

Contiene los verbos que se están estudiando actualmente.

---

### Después

```javascript
group: "future"
```

Contiene los verbos que se estudiarán posteriormente.

---

### Todos

El modo **Todos** combina los verbos de todos los grupos.

---

## 🔄 Actualizar verbos

Los verbos se encuentran dentro de:

```text
verbs.js
```

Para agregar uno nuevo se debe añadir un objeto al array `verbs`.

Ejemplo:

```javascript
{
    group: "future",
    infinitive: "write",
    past: "wrote",
    participle: "written",
    translation: "escribir",

    ipaInfinitive: "/raɪt/",
    ipaPast: "/roʊt/",
    ipaParticiple: "/ˈrɪtən/"
}
```

Cada verbo debe contener:

```javascript
{
    group: "",
    infinitive: "",
    past: "",
    participle: "",
    translation: "",
    ipaInfinitive: "",
    ipaPast: "",
    ipaParticiple: ""
}
```

---


## 🛠️ Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- Web Speech API.
- Git.
- GitHub.
- GitHub Pages.

El proyecto no utiliza frameworks ni librerías externas.

---

## 💡 Posibles mejoras futuras

Algunas funcionalidades que podrían añadirse posteriormente:

- Guardar respuestas correctas e incorrectas.
- Registrar qué verbos generan más errores.
- Repetición adaptativa.
- Sistema de puntuación.
- Estadísticas de progreso.
- Buscador de verbos.
- Filtros en la tabla.
- Modo exclusivo de pronunciación.
- Soporte offline mediante PWA.
- Guardar progreso mediante `localStorage`.
- Exportar e importar progreso.
- Mostrar porcentaje de aciertos por verbo.
- Dar mayor prioridad a los verbos que se responden incorrectamente.

---

## 🎯 Propósito

Este proyecto fue creado como una herramienta personal de estudio para mejorar el dominio de los **verbos irregulares en inglés**.

La aplicación combina:

- Escritura.
- Memoria.
- Reconocimiento visual.
- Traducción.
- Fonética.
- Pronunciación.

El objetivo es aprender las diferentes formas de los verbos de una manera más interactiva que utilizando únicamente una tabla tradicional.
