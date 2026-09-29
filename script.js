/* ==========================================================
   ELEMENTOS
========================================================== */

const readerButtons =
  document.querySelectorAll("[data-reader]");

const status =
  document.querySelector(".status-leitor");

const themeButton =
  document.querySelector("[data-theme-toggle]");

const commandButton =
  document.querySelector("[data-voice-command]");

const disableMicrophoneButton =
  document.querySelector("#desativar-microfone");

const activationPanel =
  document.querySelector("#ativacao-acessibilidade");

const activationButton =
  document.querySelector("#ativar-acessibilidade");

const languageSelector =
  document.querySelector("[data-language-selector]");


const languages = {

  "pt-BR": {
    short: "Português",
    reader: "Ouvir a página",
    changed: "Idioma alterado para português.",
    voice:
      "Comandos de voz ativos. Diga trocar idioma para português, inglês ou espanhol."
  },

  "en-US": {
    short: "English",
    reader: "Listen to page",
    changed: "Language changed to English.",
    voice:
      "Voice commands are active. Say change language to Portuguese, English, or Spanish."
  },

  "es-ES": {
    short: "Español",
    reader: "Escuchar la página",
    changed: "Idioma cambiado a español.",
    voice:
      "Los comandos de voz están activos. Di cambiar idioma a portugués, inglés o español."
  }

};


let currentLanguage =
  localStorage.getItem("inclui-language")
  || "pt-BR";


/* ==========================================================
   TRADUÇÕES
========================================================== */

const translatedContent = {

  "en-US": {

    ".topo nav a:nth-child(1)":
      "Understand",

    ".topo nav a:nth-child(2)":
      "In practice",

    ".topo nav a:nth-child(3)":
      "Examples",

    ".hero .etiqueta":
      "DIGITAL ACCESSIBILITY",

    ".hero h1":
      "Technology is only complete when <em>it includes.</em>",

    ".introducao":
      "Inclusive systems remove barriers so that everyone can study, work, create, and participate in the digital world independently.",

    ".link-texto":
      "Discover more <span aria-hidden=\"true\">↓</span>",

    "#ajuda-comandos":
      "Voice commands are in the top-right corner. Say “change language to English”, “change topic”, “read topic 2”, “go to the start”, or “go to the end”.",

    ".cartao-1 strong":
      "Keyboard",

    ".cartao-1 small":
      "Free navigation",

    ".cartao-2 strong":
      "Reading",

    ".cartao-2 small":
      "Accessible content",

    ".entenda .etiqueta":
      "WHAT DOES THIS MEAN?",

    "#titulo-entenda":
      "Inclusion is not an extra.<br>It is part of the design.",

    ".texto-lateral p:first-child":
      "An inclusive system is designed for people with different ways of perceiving, understanding, and interacting with technology.",

    ".texto-lateral p:last-child":
      "Instead of creating one “standard” experience, it offers different paths to achieve the same result.",

    ".praticas .etiqueta":
      "DESIGN FOR REAL PEOPLE",

    "#titulo-praticas":
      "Small choices, big impacts.",

    ".praticas-texto > p:not(.etiqueta)":
      "When accessibility is included from the start, the experience improves for everyone — including in temporary situations such as a slow connection, a noisy environment, or an injury.",

    ".exemplos .etiqueta":
      "TECHNOLOGIES THAT OPEN PATHS",

    "#titulo-exemplos":
      "Resources that already make a difference",

    ".convite .etiqueta":
      "START TODAY",

    "#titulo-convite":
      "Designing for everyone is<br><em>designing better.</em>",

    "footer p:first-of-type":
      "An academic project about accessibility and digital inclusion.",

    "footer p:last-of-type":
      "Made to be accessible."

  },


  "es-ES": {

    ".topo nav a:nth-child(1)":
      "Entiende",

    ".topo nav a:nth-child(2)":
      "En la práctica",

    ".topo nav a:nth-child(3)":
      "Ejemplos",

    ".hero .etiqueta":
      "ACCESIBILIDAD DIGITAL",

    ".hero h1":
      "La tecnología solo está completa cuando <em>incluye.</em>",

    ".introducao":
      "Los sistemas inclusivos eliminan barreras para que cada persona pueda estudiar, trabajar, crear y participar en el mundo digital con autonomía.",

    ".link-texto":
      "Descubrir más <span aria-hidden=\"true\">↓</span>",

    "#ajuda-comandos":
      "Los comandos de voz están en la esquina superior derecha. Di “cambiar idioma a español”, “cambiar tema”, “leer tema 2”, “volver al inicio” o “ir al final”.",

    ".cartao-1 strong":
      "Teclado",

    ".cartao-1 small":
      "Navegación libre",

    ".cartao-2 strong":
      "Lectura",

    ".cartao-2 small":
      "Contenido accesible",

    ".entenda .etiqueta":
      "¿QUÉ SIGNIFICA ESTO?",

    "#titulo-entenda":
      "La inclusión no es un extra.<br>Es parte del proyecto.",

    ".texto-lateral p:first-child":
      "Un sistema inclusivo está diseñado para atender a personas con diferentes formas de percibir, comprender e interactuar con la tecnología.",

    ".texto-lateral p:last-child":
      "En lugar de crear una única experiencia “estándar”, ofrece distintos caminos para lograr el mismo resultado.",

    ".praticas .etiqueta":
      "DISEÑO PARA PERSONAS REALES",

    "#titulo-praticas":
      "Pequeñas decisiones, grandes impactos.",

    ".praticas-texto > p:not(.etiqueta)":
      "Cuando la accesibilidad se incorpora desde el inicio, la experiencia mejora para todos, incluso en situaciones temporales como una conexión lenta, un entorno ruidoso o una lesión.",

    ".exemplos .etiqueta":
      "TECNOLOGÍAS QUE ABREN CAMINOS",

    "#titulo-exemplos":
      "Recursos que ya marcan la diferencia",

    ".convite .etiqueta":
      "EMPIEZA HOY",

    "#titulo-convite":
      "Diseñar para todos es<br><em>diseñar mejor.</em>",

    "footer p:first-of-type":
      "Un proyecto académico sobre accesibilidad e inclusión digital.",

    "footer p:last-of-type":
      "Hecho para ser accesible."

  }

};


const portugueseContent = {};


/* ==========================================================
   MAIS TRADUÇÕES
========================================================== */

Object.assign(
  translatedContent["en-US"],
  {

    "#titulo-ativacao":
      "Enable voice commands",

    ".ativacao p:not(.etiqueta)":
      "To use voice commands, allow access to the microphone. Then you can say commands such as “change language to English”, “change topic”, “read topic 2”, “go to the start”, or “go to the end”.",

    "#ativar-acessibilidade":
      "Enable voice commands",

    "#agora-nao-acessibilidade":
      "Not now",

    ".pilar:nth-child(1) h3":
      "Perceivable",

    ".pilar:nth-child(1) p":
      "Information that can be seen, heard, or felt through more than one channel.",

    ".pilar:nth-child(2) h3":
      "Operable",

    ".pilar:nth-child(2) p":
      "Controls that can be used with a keyboard, mouse, touch, and assistive technologies.",

    ".pilar:nth-child(3) h3":
      "Understandable",

    ".pilar:nth-child(3) p":
      "Clear text, predictable navigation, and help available when needed.",

    ".pilar:nth-child(4) h3":
      "Robust",

    ".pilar:nth-child(4) p":
      "Compatibility with screen readers and different browsers and devices.",

    ".praticas li:nth-child(1) strong":
      "Alternative text",

    ".praticas li:nth-child(1) small":
      "Describes images for people who cannot see them.",

    ".praticas li:nth-child(2) strong":
      "Adequate contrast",

    ".praticas li:nth-child(2) small":
      "Helps with reading in any context.",

    ".praticas li:nth-child(3) strong":
      "Visible focus",

    ".praticas li:nth-child(3) small":
      "Shows where you are when navigating with a keyboard.",

    ".grid-exemplos article:nth-child(1) h3":
      "Screen readers",

    ".grid-exemplos article:nth-child(1) p":
      "They turn on-screen elements and text into speech or a braille display.",

    ".grid-exemplos article:nth-child(2) h3":
      "Keyboard navigation",

    ".grid-exemplos article:nth-child(2) p":
      "Lets you use websites without a mouse or complex gestures.",

    ".grid-exemplos article:nth-child(3) h3":
      "Captions and transcripts",

    ".grid-exemplos article:nth-child(3) p":
      "They make videos and audio accessible in different contexts."

  }
);


Object.assign(
  translatedContent["es-ES"],
  {

    "#titulo-ativacao":
      "Activa los comandos de voz",

    ".ativacao p:not(.etiqueta)":
      "Para utilizar los comandos de voz, permite el acceso al micrófono. Después podrás decir “cambiar idioma a español”, “cambiar tema”, “leer tema 2”, “volver al inicio” o “ir al final”.",

    "#ativar-acessibilidade":
      "Activar comandos de voz",

    "#agora-nao-acessibilidade":
      "Ahora no",

    ".pilar:nth-child(1) h3":
      "Perceptible",

    ".pilar:nth-child(1) p":
      "Información que puede verse, oírse o sentirse por más de un canal.",

    ".pilar:nth-child(2) h3":
      "Operable",

    ".pilar:nth-child(2) p":
      "Controles utilizables con teclado, ratón, tacto y tecnologías de apoyo.",

    ".pilar:nth-child(3) h3":
      "Comprensible",

    ".pilar:nth-child(3) p":
      "Textos claros, navegación previsible y ayuda disponible cuando sea necesaria.",

    ".pilar:nth-child(4) h3":
      "Robusto",

    ".pilar:nth-child(4) p":
      "Compatibilidad con lectores de pantalla y distintos navegadores y dispositivos.",

    ".praticas li:nth-child(1) strong":
      "Textos alternativos",

    ".praticas li:nth-child(1) small":
      "Describen imágenes para quien no las ve.",

    ".praticas li:nth-child(2) strong":
      "Contraste adecuado",

    ".praticas li:nth-child(2) small":
      "Ayuda a leer en cualquier contexto.",

    ".praticas li:nth-child(3) strong":
      "Foco visible",

    ".praticas li:nth-child(3) small":
      "Muestra dónde estás al navegar con el teclado.",

    ".grid-exemplos article:nth-child(1) h3":
      "Lectores de pantalla",

    ".grid-exemplos article:nth-child(1) p":
      "Transforman elementos y textos de la pantalla en voz o en una línea braille.",

    ".grid-exemplos article:nth-child(2) h3":
      "Navegación por teclado",

    ".grid-exemplos article:nth-child(2) p":
      "Permite usar sitios sin ratón ni gestos complejos.",

    ".grid-exemplos article:nth-child(3) h3":
      "Subtítulos y transcripciones",

    ".grid-exemplos article:nth-child(3) p":
      "Hacen accesibles los vídeos y audios en distintos contextos."

  }
);


/* ==========================================================
   SALVAR TEXTO ORIGINAL EM PORTUGUÊS
========================================================== */

Object.keys(
  translatedContent["en-US"]
).forEach((selector) => {

  const element =
    document.querySelector(selector);

  if (element) {
    portugueseContent[selector] =
      element.innerHTML;
  }

});


/* ==========================================================
   TROCAR IDIOMA
========================================================== */

function applyLanguage(
  language,
  feedback = true
) {

  currentLanguage =
    languages[language]
      ? language
      : "pt-BR";


  const content =
    currentLanguage === "pt-BR"
      ? portugueseContent
      : translatedContent[currentLanguage];


  Object.entries(content)
    .forEach(
      ([selector, value]) => {

        const element =
          document.querySelector(selector);

        if (element) {
          element.innerHTML = value;
        }

      }
    );


  document.documentElement.lang =
    currentLanguage;


  document.title =
    currentLanguage === "en-US"

      ? "Inclui | Systems for everyone"

      : currentLanguage === "es-ES"

        ? "Inclui | Sistemas para todas las personas"

        : "Inclui | Sistemas para todas as pessoas";


  languageSelector.value =
    currentLanguage;


  localStorage.setItem(
    "inclui-language",
    currentLanguage
  );


  if (recognition) {
    recognition.lang =
      currentLanguage;
  }


  if (
    typeof updateReaderButtons === "function"
    && !isSpeaking
  ) {

    updateReaderButtons(
      languages[currentLanguage].reader,
      false
    );

  }


  if (feedback) {
    announce(
      languages[currentLanguage].changed
    );
  }

}


languageSelector.addEventListener(
  "change",
  () => {

    applyLanguage(
      languageSelector.value
    );

  }
);


/* ==========================================================
   LEITOR DE TELA / VOZ NATIVA DO NAVEGADOR

   IMPORTANTE:
   - Não usa ElevenLabs.
   - Não usa StreamElements.
   - Não usa fetch().
   - Não depende de internet.
   - Usa window.speechSynthesis.
   - A leitura SOMENTE começa pelo botão.
========================================================== */

let speechParts = [];

let currentPart = 0;

let isSpeaking = false;

let isPaused = false;


/* ==========================================================
   MENSAGENS DE STATUS
========================================================== */

function announce(message) {

  status.textContent =
    message;

  status.classList.add(
    "visivel"
  );

  clearTimeout(
    announce.timer
  );

  announce.timer =
    setTimeout(
      () => {

        status.classList.remove(
          "visivel"
        );

      },
      3500
    );

}


/* ==========================================================
   ATUALIZAR BOTÕES DO LEITOR
========================================================== */

function updateReaderButtons(
  label,
  pressed
) {

  const allReaderButtons = [

    ...readerButtons,

    ...document.querySelectorAll(
      ".leitor-pagina-dinamico"
    )

  ];


  allReaderButtons.forEach(
    (button) => {

      button.setAttribute(
        "aria-pressed",
        String(pressed)
      );


      button.innerHTML = `
        <span aria-hidden="true">
          ${pressed ? "■" : "▶"}
        </span>

        ${label}
      `;

    }
  );

}


/* ==========================================================
   PEGAR TEXTO DA PÁGINA ATUAL
========================================================== */

function pageText() {

  const activePage =
    document.querySelector(
      ".pagina-site:not([hidden])"
    );


  return activePage

    ? activePage.innerText
        .replace(
          /\s+/g,
          " "
        )
        .trim()

    : "";

}


/* ==========================================================
   DIVIDIR TEXTO EM PARTES MENORES
========================================================== */

function splitText(text) {

  const sentences =
    text.match(
      /[^.!?]+[.!?]+|[^.!?]+$/g
    )
    || [text];


  const parts = [];

  let part = "";


  sentences.forEach(
    (sentence) => {

      const next =
        `${part} ${sentence}`.trim();


      if (
        next.length > 180
        && part
      ) {

        parts.push(part);

        part =
          sentence.trim();

      } else {

        part = next;

      }

    }
  );


  if (part) {
    parts.push(part);
  }


  return parts;

}


/* ==========================================================
   ESCOLHER VOZ
========================================================== */

function getPreferredVoice() {

  const voices =
    window.speechSynthesis
      .getVoices();


  if (!voices.length) {
    return null;
  }


  let voice =
    voices.find(
      (v) =>
        v.lang
        &&
        v.lang.toLowerCase()
        ===
        currentLanguage.toLowerCase()
    );


  /*
   * Se não encontrar exatamente,
   * procura uma voz no mesmo idioma.
   */

  if (!voice) {

    voice =
      voices.find(
        (v) =>
          v.lang
          &&
          v.lang
            .toLowerCase()
            .startsWith(
              currentLanguage
                .slice(0, 2)
                .toLowerCase()
            )
      );

  }


  return voice || voices[0];

}


/* ==========================================================
   FALAR PARTE ATUAL
========================================================== */

function speakCurrentPart() {

  if (
    !isSpeaking
    ||
    isPaused
  ) {
    return;
  }


  if (
    currentPart
    >=
    speechParts.length
  ) {

    finishReading(
      "Leitura concluída."
    );

    return;

  }


  const text =
    speechParts[currentPart];


  const utterance =
    new SpeechSynthesisUtterance(
      text
    );


  const voice =
    getPreferredVoice();


  if (voice) {
    utterance.voice = voice;
  }


  utterance.lang =
    voice?.lang
    ||
    currentLanguage;


  /*
   * Velocidade confortável
   * para leitura.
   */
  utterance.rate = 0.95;


  /*
   * Tom normal.
   */
  utterance.pitch = 1;


  /*
   * Volume máximo.
   */
  utterance.volume = 1;

    utterance.onend =
    () => {

      if (
        !isSpeaking
        ||
        isPaused
      ) {
        return;
      }


      currentPart++;

      speakCurrentPart();

    };


  utterance.onerror =
    (event) => {

      console.error(
        "Erro no leitor:",
        event.error
      );


      finishReading(
        "Não foi possível continuar a leitura."
      );

    };


  window.speechSynthesis.speak(
    utterance
  );

}


/* ==========================================================
   FINALIZAR LEITURA
========================================================== */

function finishReading(
  message = "Leitura interrompida."
) {

  window.speechSynthesis.cancel();


  isSpeaking = false;

  isPaused = false;

  speechParts = [];

  currentPart = 0;


  updateReaderButtons(
    languages[currentLanguage].reader,
    false
  );


  announce(message);

}


/* ==========================================================
   INICIAR LEITURA
========================================================== */

function startReading() {

  const text =
    pageText();


  if (!text) {

    announce(
      "Não encontrei conteúdo para ler nesta página."
    );

    return;

  }


  window.speechSynthesis.cancel();


  speechParts =
    splitText(text);


  currentPart = 0;

  isSpeaking = true;

  isPaused = false;


  updateReaderButtons(
    currentLanguage === "en-US"
      ? "Stop reading"
      : currentLanguage === "es-ES"
        ? "Detener lectura"
        : "Parar leitura",
    true
  );


  announce(
    currentLanguage === "en-US"
      ? "Reading started."
      : currentLanguage === "es-ES"
        ? "Lectura iniciada."
        : "Leitura iniciada."
  );


  speakCurrentPart();

}


/* ==========================================================
   PAUSAR / CONTINUAR LEITURA
========================================================== */

function toggleReading() {

  /*
   * Se ainda não iniciou,
   * começa a leitura.
   */
  if (!isSpeaking) {

    startReading();

    return;

  }


  /*
   * Se está pausado,
   * continua.
   */
  if (isPaused) {

    isPaused = false;


    window.speechSynthesis.resume();


    updateReaderButtons(
      currentLanguage === "en-US"
        ? "Stop reading"
        : currentLanguage === "es-ES"
          ? "Detener lectura"
          : "Parar leitura",
      true
    );


    announce(
      currentLanguage === "en-US"
        ? "Reading resumed."
        : currentLanguage === "es-ES"
          ? "Lectura reanudada."
          : "Leitura retomada."
    );


    return;

  }


  /*
   * Se está lendo,
   * pausa.
   */
  isPaused = true;


  window.speechSynthesis.pause();


  updateReaderButtons(
    currentLanguage === "en-US"
      ? "Continue reading"
      : currentLanguage === "es-ES"
        ? "Continuar lectura"
        : "Continuar leitura",
    true
  );


  announce(
    currentLanguage === "en-US"
      ? "Reading paused."
      : currentLanguage === "es-ES"
        ? "Lectura pausada."
        : "Leitura pausada."
  );

}


/* ==========================================================
   BOTÕES DO LEITOR
========================================================== */

readerButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      toggleReading
    );

  }
);


/* ==========================================================
   GARANTIR CARREGAMENTO DAS VOZES
========================================================== */

if (
  "speechSynthesis"
  in window
) {

  window.speechSynthesis
    .getVoices();


  window.speechSynthesis.onvoiceschanged =
    () => {

      window.speechSynthesis
        .getVoices();

    };

}


/* ==========================================================
   TEMA CLARO / ESCURO
========================================================== */

function setTheme(
  theme,
  feedback = true
) {

  document.body.dataset.theme =
    theme;


  const isDark =
    theme === "dark";


  themeButton.setAttribute(
    "aria-pressed",
    String(isDark)
  );


  themeButton.setAttribute(
    "aria-label",
    isDark
      ? "Ativar tema claro"
      : "Ativar tema escuro"
  );


  localStorage.setItem(
    "inclui-theme",
    theme
  );


  if (feedback) {

    announce(
      isDark
        ? "Tema escuro ativado."
        : "Tema claro ativado."
    );

  }

}


themeButton.addEventListener(
  "click",
  () => {

    const current =
      document.body.dataset.theme
      === "dark"
        ? "light"
        : "dark";


    setTheme(current);

  }
);


/* ==========================================================
   CARREGAR TEMA SALVO
========================================================== */

const savedTheme =
  localStorage.getItem(
    "inclui-theme"
  );


if (savedTheme) {

  setTheme(
    savedTheme,
    false
  );

}


/* ==========================================================
   NAVEGAÇÃO ENTRE PÁGINAS
========================================================== */

const pageOrder = [
  "inicio-geral",
  "visual",
  "auditiva",
  "motora",
  "cognitiva"
];

let currentPage = "inicio-geral";

let topicIndex = 0;


/* ==========================================================
   PEGAR PÁGINA ATUAL
========================================================== */

function activePageElement() {

  return document.querySelector(
    `.pagina-site[data-page-view="${currentPage}"]`
  );

}


/* ==========================================================
   PEGAR TÓPICOS DA PÁGINA ATUAL
========================================================== */

function currentTopics() {

  const page =
    activePageElement();


  if (!page) {
    return [];
  }


  /*
   * Na página inicial usamos
   * as seções que já existiam.
   */
  if (
    currentPage === "inicio-geral"
  ) {

    return [
      "inicio",
      "entenda",
      "praticas",
      "exemplos"
    ]
      .map(
        (id) =>
          document.getElementById(id)
      )
      .filter(Boolean);

  }


  /*
   * Nas páginas sobre deficiências
   * usamos data-topic.
   */
  return Array.from(
    page.querySelectorAll(
      "[data-topic]"
    )
  );

}


/* ==========================================================
   PARAR LEITURA AO TROCAR DE PÁGINA
========================================================== */

function stopReadingForNavigation() {

  window.speechSynthesis.cancel();

  isSpeaking = false;

  isPaused = false;

  speechParts = [];

  currentPart = 0;


  updateReaderButtons(
    languages[currentLanguage].reader,
    false
  );


  document
    .querySelectorAll(
      ".leitor-pagina-dinamico"
    )
    .forEach(
      (button) => {

        button.setAttribute(
          "aria-pressed",
          "false"
        );


        button.innerHTML = `
          <span aria-hidden="true">▶</span>
          Ouvir esta página
        `;

      }
    );

}


/* ==========================================================
   MOSTRAR PÁGINA
========================================================== */

function showPage(
  pageName,
  feedback = true
) {

  if (
    !pageOrder.includes(
      pageName
    )
  ) {
    return;
  }


  stopReadingForNavigation();


  currentPage =
    pageName;


  topicIndex = 0;


  /*
   * Mostra somente a página escolhida.
   */
  document
    .querySelectorAll(
      ".pagina-site"
    )
    .forEach(
      (page) => {

        const active =
          page.dataset.pageView
          ===
          pageName;


        page.hidden =
          !active;


        page.setAttribute(
          "aria-hidden",
          String(!active)
        );

      }
    );


  /*
   * Atualiza botão ativo no menu.
   */
  document
    .querySelectorAll(
      "[data-page-target]"
    )
    .forEach(
      (button) => {

        const active =
          button.dataset.pageTarget
          ===
          pageName;


        button.classList.toggle(
          "ativo",
          active
        );


        if (active) {

          button.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          button.removeAttribute(
            "aria-current"
          );

        }

      }
    );


  const page =
    activePageElement();


  const heading =
    page?.querySelector(
      "h1, h2"
    );


  /*
   * Volta para o topo.
   */
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /*
   * Move o foco para o título,
   * importante para acessibilidade.
   */
  if (heading) {

    heading.setAttribute(
      "tabindex",
      "-1"
    );


    setTimeout(
      () => {

        heading.focus({
          preventScroll: true
        });

      },
      250
    );

  }


  /*
   * Atualiza a URL.
   */
  history.replaceState(
    null,
    "",
    pageName === "inicio-geral"
      ? "#inicio"
      : `#${pageName}`
  );


  if (feedback) {

    const label =
      heading
        ?.textContent
        .replace(/\s+/g, " ")
        .trim()
      ||
      "página";


    announce(
      `Página aberta: ${label}.`
    );

  }

}


/* ==========================================================
   PRÓXIMA / PÁGINA ANTERIOR
========================================================== */

function nextPage(
  direction = 1
) {

  const index =
    pageOrder.indexOf(
      currentPage
    );


  const nextIndex =
    (
      index
      +
      direction
      +
      pageOrder.length
    )
    %
    pageOrder.length;


  showPage(
    pageOrder[nextIndex]
  );

}


/* ==========================================================
   BOTÕES DO MENU
========================================================== */

document
  .querySelectorAll(
    "[data-page-target]"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showPage(
            button.dataset.pageTarget
          );

        }
      );

    }
  );


/* ==========================================================
   BOTÃO PRÓXIMA PÁGINA
========================================================== */

document
  .querySelectorAll(
    "[data-page-next]"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          nextPage(1);

        }
      );

    }
  );


/* ==========================================================
   BOTÃO PÁGINA ANTERIOR
========================================================== */

document
  .querySelectorAll(
    "[data-page-prev]"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          nextPage(-1);

        }
      );

    }
  );


/* ==========================================================
   LOGO / LINKS PARA INÍCIO
========================================================== */

document
  .querySelectorAll(
    "[data-page-link]"
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();


          showPage(
            link.dataset.pageLink
          );

        }
      );

    }
  );


/* ==========================================================
   LEITOR DAS PÁGINAS NOVAS
========================================================== */

document
  .querySelectorAll(
    ".leitor-pagina-dinamico"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          startReading();

        }
      );

    }
  );


/* ==========================================================
   MUDAR TÓPICO
========================================================== */

function changeTopic() {

  const topics =
    currentTopics();


  if (!topics.length) {

    announce(
      "Nenhum tópico encontrado."
    );

    return;

  }


  topicIndex =
    (
      topicIndex + 1
    )
    %
    topics.length;


  const section =
    topics[topicIndex];


  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  section.setAttribute(
    "tabindex",
    "-1"
  );


  section.focus({
    preventScroll: true
  });


  const title =
    section.querySelector(
      "h1, h2, h3"
    )
      ?.textContent
      .trim()
    ||
    `tópico ${topicIndex + 1}`;


  announce(
    `Tópico alterado: ${title}.`
  );

}


/* ==========================================================
   LER TÓPICO ESPECÍFICO
========================================================== */

function readTopic(
  number
) {

  const topics =
    currentTopics();


  if (!topics.length) {

    announce(
      "Nenhum tópico encontrado."
    );

    return;

  }


  const index =
    Math.max(
      0,
      Math.min(
        topics.length - 1,
        number - 1
      )
    );


  topicIndex =
    index;


  const section =
    topics[index];


  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  const title =
    section.querySelector(
      "h1, h2, h3"
    )
      ?.textContent
      .trim()
    ||
    `tópico ${number}`;


  window.speechSynthesis.cancel();


  isSpeaking = false;

  isPaused = false;


  announce(
    `Lendo tópico ${index + 1}: ${title}.`
  );


  const text =
    section.innerText
      .replace(/\s+/g, " ")
      .trim();


  speechParts =
    splitText(text);


  currentPart = 0;

  isSpeaking = true;

  isPaused = false;


  updateReaderButtons(
    "Parar leitura",
    true
  );


  speakCurrentPart();

}


/* ==========================================================
   VOLTAR AO INÍCIO
========================================================== */

function goToStart() {

  const topics =
    currentTopics();


  const section =
    topics[0]
    ||
    activePageElement();


  topicIndex = 0;


  section?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  announce(
    "Você voltou ao início da página atual."
  );

}


/* ==========================================================
   IR PARA O FINAL
========================================================== */

function goToEnd() {

  const page =
    activePageElement();


  const target =
    page?.querySelector(
      ".navegacao-inferior"
    )
    ||
    page?.lastElementChild
    ||
    document.querySelector(
      "footer"
    );


  target?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  announce(
    "Você chegou ao final da página atual."
  );

}


/* ==========================================================
   ABRIR PÁGINA INICIAL
========================================================== */

const hashPage =
  location.hash
    .replace("#", "");


if (
  pageOrder.includes(
    hashPage
  )
) {

  showPage(
    hashPage,
    false
  );

} else {

  showPage(
    "inicio-geral",
    false
  );

}


/* ==========================================================
   RECONHECIMENTO DE VOZ
========================================================== */

const SpeechRecognition =
  window.SpeechRecognition
  ||
  window.webkitSpeechRecognition;


let recognition = null;

let recognitionActive = false;

let microphoneAllowed = false;


/* ==========================================================
   CRIAR RECONHECIMENTO
========================================================== */

if (SpeechRecognition) {

  recognition =
    new SpeechRecognition();


  recognition.lang =
    currentLanguage;


  /*
   * Continua ouvindo
   * enquanto estiver ativo.
   */
  recognition.continuous = true;


  /*
   * Só retorna resultado final.
   */
  recognition.interimResults = false;


  /*
   * Uma alternativa por vez.
   */
  recognition.maxAlternatives = 1;

}

/* ==========================================================
   FUNÇÕES AUXILIARES DOS COMANDOS DE VOZ
========================================================== */

function normalizeCommand(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

}


/* ==========================================================
   TROCAR TEMA POR VOZ
========================================================== */

function toggleThemeByVoice() {

  const current =
    document.body.dataset.theme === "dark"
      ? "dark"
      : "light";


  const next =
    current === "dark"
      ? "light"
      : "dark";


  setTheme(next);

}


/* ==========================================================
   IR PARA O INÍCIO DA PÁGINA
========================================================== */

function goToStart() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  announce(
    currentLanguage === "en-US"
      ? "Going to the top of the page."
      : currentLanguage === "es-ES"
        ? "Yendo al inicio de la página."
        : "Indo para o início da página."
  );

}


/* ==========================================================
   IR PARA O FINAL DA PÁGINA
========================================================== */

function goToEnd() {

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });


  announce(
    currentLanguage === "en-US"
      ? "Going to the end of the page."
      : currentLanguage === "es-ES"
        ? "Yendo al final de la página."
        : "Indo para o final da página."
  );

}


/* ==========================================================
   MUDAR TÓPICO
========================================================== */

function changeTopic() {

  const activePage =
    document.querySelector(
      ".pagina-site:not([hidden])"
    );


  if (!activePage) {
    return;
  }


  const topics = [
    ...activePage.querySelectorAll(
      "section, article, [data-topic]"
    )
  ].filter(
    (element) => {

      return (
        element.offsetParent !== null
        &&
        element.querySelector(
          "h2, h3"
        )
      );

    }
  );


  if (!topics.length) {

    announce(
      "Não encontrei tópicos nesta página."
    );

    return;

  }


  const currentScroll =
    window.scrollY + 140;


  let destination =
    topics.find(
      (topic) =>
        topic.offsetTop
        >
        currentScroll
    );


  if (!destination) {
    destination = topics[0];
  }


  destination.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  const title =
    destination.querySelector(
      "h2, h3"
    );


  if (title) {

    title.setAttribute(
      "tabindex",
      "-1"
    );


    setTimeout(
      () => {

        title.focus();

      },
      300
    );

  }


  announce(
    "Mudando para o próximo tópico."
  );

}


/* ==========================================================
   LER UM TÓPICO ESPECÍFICO
========================================================== */

function readTopic(number) {

  const activePage =
    document.querySelector(
      ".pagina-site:not([hidden])"
    );


  if (!activePage) {
    return;
  }


  const topics = [
    ...activePage.querySelectorAll(
      "[data-topic], article"
    )
  ].filter(
    (element) =>
      element.offsetParent !== null
  );


  const index =
    number - 1;


  if (
    index < 0
    ||
    index >= topics.length
  ) {

    announce(
      `O tópico ${number} não foi encontrado nesta página.`
    );

    return;

  }


  const topic =
    topics[index];


  const text =
    topic.innerText
      .replace(/\s+/g, " ")
      .trim();


  if (!text) {

    announce(
      `O tópico ${number} não possui conteúdo para leitura.`
    );

    return;

  }


  window.speechSynthesis.cancel();


  speechParts =
    splitText(text);


  currentPart = 0;

  isSpeaking = true;

  isPaused = false;


  updateReaderButtons(
    "Parar leitura",
    true
  );


  announce(
    `Lendo o tópico ${number}.`
  );


  speakCurrentPart();

}


/* ==========================================================
   TROCAR IDIOMA POR VOZ
========================================================== */

function changeLanguageByVoice(
  language
) {

  applyLanguage(language);


  if (recognition) {

    recognition.lang =
      language;

  }

}


/* ==========================================================
   EXECUTAR COMANDO DE VOZ
========================================================== */

function executeVoiceCommand(
  spokenText
) {

  const command =
    normalizeCommand(
      spokenText
    );


  console.log(
    "Comando recebido:",
    command
  );


  /* ========================================================
     NAVEGAÇÃO ENTRE PÁGINAS
  ======================================================== */


  /*
   * Início
   */
  if (
    command.includes(
      "ir para inicio"
    )
    ||
    command.includes(
      "ir para o inicio"
    )
    ||
    command === "inicio"
    ||
    command.includes(
      "pagina inicial"
    )
  ) {

    showPage("inicio");

    return;

  }


  /*
   * Deficiência visual
   */
  if (
    command.includes(
      "deficiencia visual"
    )
    ||
    command.includes(
      "pagina visual"
    )
    ||
    command.includes(
      "ir para visual"
    )
    ||
    command.includes(
      "pessoa cega"
    )
    ||
    command.includes(
      "cegueira"
    )
  ) {

    showPage("visual");

    return;

  }


  /*
   * Deficiência auditiva
   */
  if (
    command.includes(
      "deficiencia auditiva"
    )
    ||
    command.includes(
      "pagina auditiva"
    )
    ||
    command.includes(
      "ir para auditiva"
    )
    ||
    command.includes(
      "pessoa surda"
    )
    ||
    command.includes(
      "surdez"
    )
  ) {

    showPage("auditiva");

    return;

  }


  /*
   * Deficiência motora
   */
  if (
    command.includes(
      "deficiencia motora"
    )
    ||
    command.includes(
      "pagina motora"
    )
    ||
    command.includes(
      "ir para motora"
    )
    ||
    command.includes(
      "mobilidade reduzida"
    )
    ||
    command.includes(
      "deficiencia fisica"
    )
  ) {

    showPage("motora");

    return;

  }


  /*
   * Deficiência cognitiva
   * e intelectual
   */
  if (
    command.includes(
      "deficiencia cognitiva"
    )
    ||
    command.includes(
      "deficiencia intelectual"
    )
    ||
    command.includes(
      "pagina cognitiva"
    )
    ||
    command.includes(
      "ir para cognitiva"
    )
    ||
    command.includes(
      "cognitiva e intelectual"
    )
  ) {

    showPage("cognitiva");

    return;

  }


  /*
   * Próxima página
   */
  if (
    command.includes(
      "proxima pagina"
    )
    ||
    command.includes(
      "pagina seguinte"
    )
    ||
    command.includes(
      "avancar pagina"
    )
    ||
    command === "avancar"
  ) {

    nextPage();

    return;

  }


  /*
   * Página anterior
   */
  if (
    command.includes(
      "pagina anterior"
    )
    ||
    command.includes(
      "voltar pagina"
    )
    ||
    command.includes(
      "pagina passada"
    )
    ||
    command === "voltar"
  ) {

    previousPage();

    return;

  }


  /* ========================================================
     LEITOR
  ======================================================== */


  /*
   * Ouvir página
   */
  if (
    command.includes(
      "ouvir pagina"
    )
    ||
    command.includes(
      "ler pagina"
    )
    ||
    command.includes(
      "ouvir conteudo"
    )
    ||
    command.includes(
      "ler conteudo"
    )
  ) {

    startReading();

    return;

  }


  /*
   * Parar leitura
   */
  if (
    command.includes(
      "parar leitura"
    )
    ||
    command.includes(
      "parar de ler"
    )
    ||
    command.includes(
      "interromper leitura"
    )
  ) {

    finishReading(
      "Leitura interrompida."
    );

    return;

  }


  /*
   * Pausar leitura
   */
  if (
    command.includes(
      "pausar leitura"
    )
    ||
    command === "pausar"
  ) {

    if (
      isSpeaking
      &&
      !isPaused
    ) {

      isPaused = true;

      window.speechSynthesis.pause();


      updateReaderButtons(
        "Continuar leitura",
        true
      );


      announce(
        "Leitura pausada."
      );

    }

    return;

  }


  /*
   * Continuar leitura
   */
  if (
    command.includes(
      "continuar leitura"
    )
    ||
    command.includes(
      "retomar leitura"
    )
    ||
    command === "continuar"
  ) {

    if (
      isSpeaking
      &&
      isPaused
    ) {

      isPaused = false;

      window.speechSynthesis.resume();


      updateReaderButtons(
        "Parar leitura",
        true
      );


      announce(
        "Leitura retomada."
      );

    }

    return;

  }


  /* ========================================================
     TEMA
  ======================================================== */

  if (
    command.includes(
      "trocar tema"
    )
    ||
    command.includes(
      "mudar tema"
    )
    ||
    command.includes(
      "alterar tema"
    )
  ) {

    toggleThemeByVoice();

    return;

  }


  /*
   * Tema escuro
   */
  if (
    command.includes(
      "tema escuro"
    )
    ||
    command.includes(
      "modo escuro"
    )
  ) {

    setTheme("dark");

    return;

  }


  /*
   * Tema claro
   */
  if (
    command.includes(
      "tema claro"
    )
    ||
    command.includes(
      "modo claro"
    )
  ) {

    setTheme("light");

    return;

  }


  /* ========================================================
     NAVEGAÇÃO NA PÁGINA
  ======================================================== */


  /*
   * Voltar ao início
   */
  if (
    command.includes(
      "voltar ao inicio"
    )
    ||
    command.includes(
      "ir para o topo"
    )
    ||
    command.includes(
      "voltar para o topo"
    )
  ) {

    goToStart();

    return;

  }


  /*
   * Ir para o final
   */
  if (
    command.includes(
      "ir para o final"
    )
    ||
    command.includes(
      "ir para o fim"
    )
    ||
    command.includes(
      "final da pagina"
    )
  ) {

    goToEnd();

    return;

  }


  /*
   * Mudar tópico
   */
  if (
    command.includes(
      "mudar topico"
    )
    ||
    command.includes(
      "proximo topico"
    )
    ||
    command.includes(
      "trocar topico"
    )
  ) {

    changeTopic();

    return;

  }


  /* ========================================================
     LER TÓPICOS POR NÚMERO
  ======================================================== */

  const topicMatch =
    command.match(
      /(?:ler|ouvir)\s+(?:o\s+)?topico\s+(\d+)/
    );


  if (topicMatch) {

    const topicNumber =
      Number(
        topicMatch[1]
      );


    readTopic(
      topicNumber
    );

    return;

  }


  /*
   * Alguns navegadores
   * retornam número por extenso.
   */
  if (
    command.includes(
      "ler topico um"
    )
    ||
    command.includes(
      "ouvir topico um"
    )
  ) {

    readTopic(1);

    return;

  }


  if (
    command.includes(
      "ler topico dois"
    )
    ||
    command.includes(
      "ouvir topico dois"
    )
  ) {

    readTopic(2);

    return;

  }


  if (
    command.includes(
      "ler topico tres"
    )
    ||
    command.includes(
      "ouvir topico tres"
    )
  ) {

    readTopic(3);

    return;

  }


  if (
    command.includes(
      "ler topico quatro"
    )
    ||
    command.includes(
      "ouvir topico quatro"
    )
  ) {

    readTopic(4);

    return;

  }


  if (
    command.includes(
      "ler topico cinco"
    )
    ||
    command.includes(
      "ouvir topico cinco"
    )
  ) {

    readTopic(5);

    return;

  }


  /* ========================================================
     IDIOMAS
  ======================================================== */


  /*
   * Português
   */
  if (
    command.includes(
      "idioma portugues"
    )
    ||
    command.includes(
      "mudar para portugues"
    )
    ||
    command.includes(
      "trocar idioma para portugues"
    )
  ) {

    changeLanguageByVoice(
      "pt-BR"
    );

    return;

  }


  /*
   * Inglês
   */
  if (
    command.includes(
      "idioma ingles"
    )
    ||
    command.includes(
      "mudar para ingles"
    )
    ||
    command.includes(
      "trocar idioma para ingles"
    )
  ) {

    changeLanguageByVoice(
      "en-US"
    );

    return;

  }


  /*
   * Espanhol
   */
  if (
    command.includes(
      "idioma espanhol"
    )
    ||
    command.includes(
      "mudar para espanhol"
    )
    ||
    command.includes(
      "trocar idioma para espanhol"
    )
  ) {

    changeLanguageByVoice(
      "es-ES"
    );

    return;

  }


  /* ========================================================
     COMANDO NÃO RECONHECIDO
  ======================================================== */

  announce(
    `Comando não reconhecido: ${spokenText}`
  );

}


/* ==========================================================
   EVENTO DE RESULTADO DO RECONHECIMENTO
========================================================== */

if (recognition) {

  recognition.onresult =
    (event) => {

      const lastResult =
        event.results[
          event.results.length - 1
        ];


      if (
        !lastResult
        ||
        !lastResult[0]
      ) {
        return;
      }


      const spokenText =
        lastResult[0]
          .transcript
          .trim();


      if (!spokenText) {
        return;
      }


      announce(
        `Comando ouvido: ${spokenText}`
      );


      executeVoiceCommand(
        spokenText
      );

    };

}


/* ==========================================================
   QUANDO O MICROFONE COMEÇAR A OUVIR
========================================================== */

if (recognition) {

  recognition.onstart =
    () => {

      recognitionActive = true;


      commandButton.setAttribute(
        "aria-pressed",
        "true"
      );


      announce(
        "Comandos de voz ativados."
      );

    };

}


/* ==========================================================
   QUANDO O MICROFONE PARAR
========================================================== */

if (recognition) {

  recognition.onend =
    () => {

      recognitionActive = false;


      commandButton.setAttribute(
        "aria-pressed",
        "false"
      );


      /*
       * Se o usuário ainda autorizou
       * o microfone, tenta continuar
       * ouvindo automaticamente.
       */
      if (microphoneAllowed) {

        setTimeout(
          () => {

            try {

              recognition.start();

            } catch (error) {

              console.log(
                "Reconhecimento já estava ativo."
              );

            }

          },
          500
        );

      }

    };

}


/* ==========================================================
   ERROS DO RECONHECIMENTO DE VOZ
========================================================== */

if (recognition) {

  recognition.onerror =
    (event) => {

      console.error(
        "Erro no reconhecimento de voz:",
        event.error
      );


      if (
        event.error
        === "not-allowed"
        ||
        event.error
        === "service-not-allowed"
      ) {

        microphoneAllowed = false;


        announce(
          "O acesso ao microfone foi bloqueado."
        );

      }


      else if (
        event.error
        === "no-speech"
      ) {

        announce(
          "Nenhuma fala foi detectada."
        );

      }


      else if (
        event.error
        === "audio-capture"
      ) {

        announce(
          "Não foi possível acessar o microfone."
        );

      }

    };

}

/* ==========================================================
   INICIAR RECONHECIMENTO DE VOZ
========================================================== */

function startVoiceRecognition() {

  if (!recognition) {

    announce(
      "Este navegador não oferece suporte aos comandos de voz."
    );

    return;

  }


  microphoneAllowed = true;


  try {

    recognition.lang =
      currentLanguage;


    recognition.start();


    commandButton.setAttribute(
      "aria-pressed",
      "true"
    );


    announce(
      "Comandos de voz ativados."
    );

  } catch (error) {

    console.log(
      "O reconhecimento de voz já está ativo."
    );

  }

}


/* ==========================================================
   PARAR RECONHECIMENTO DE VOZ
========================================================== */

function stopVoiceRecognition() {

  microphoneAllowed = false;


  if (recognition) {

    try {

      recognition.stop();

    } catch (error) {

      console.log(
        "O reconhecimento de voz já estava parado."
      );

    }

  }


  recognitionActive = false;


  commandButton.setAttribute(
    "aria-pressed",
    "false"
  );


  announce(
    "Comandos de voz desativados."
  );

}


/* ==========================================================
   BOTÃO DE COMANDOS DE VOZ
========================================================== */

if (commandButton) {

  commandButton.addEventListener(
    "click",
    () => {

      if (
        recognitionActive
        ||
        microphoneAllowed
      ) {

        stopVoiceRecognition();

      } else {

        startVoiceRecognition();

      }

    }
  );

}


/* ==========================================================
   BOTÃO PARA DESATIVAR O MICROFONE
========================================================== */

if (disableMicrophoneButton) {

  disableMicrophoneButton.addEventListener(
    "click",
    () => {

      stopVoiceRecognition();

    }
  );

}


/* ==========================================================
   ATIVAR PELO MODAL INICIAL
========================================================== */

if (activationButton) {

  activationButton.addEventListener(
    "click",
    () => {

      startVoiceRecognition();


      if (activationPanel) {

        activationPanel.hidden =
          true;

      }


      localStorage.setItem(
        "inclui-microphone-choice",
        "allowed"
      );

    }
  );

}


/* ==========================================================
   BOTÃO "AGORA NÃO"
========================================================== */

const notNowButton =
  document.querySelector(
    "#agora-nao-acessibilidade"
  );


if (notNowButton) {

  notNowButton.addEventListener(
    "click",
    () => {

      microphoneAllowed = false;


      if (activationPanel) {

        activationPanel.hidden =
          true;

      }


      localStorage.setItem(
        "inclui-microphone-choice",
        "denied"
      );


      announce(
        "Comandos de voz não foram ativados."
      );

    }
  );

}


/* ==========================================================
   FECHAR MODAL PELO X
========================================================== */

function fecharPedidoMicrofone(
  event
) {

  if (event) {

    event.preventDefault();

  }


  microphoneAllowed = false;


  if (activationPanel) {

    activationPanel.hidden =
      true;

  }


  localStorage.setItem(
    "inclui-microphone-choice",
    "denied"
  );


  announce(
    "A solicitação de microfone foi fechada."
  );

}


/*
 * Torna a função disponível
 * para o onclick do HTML.
 */
window.fecharPedidoMicrofone =
  fecharPedidoMicrofone;


/* ==========================================================
   FECHAR MODAL COM ESC
========================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
      &&
      activationPanel
      &&
      !activationPanel.hidden
    ) {

      fecharPedidoMicrofone(
        event
      );

    }

  }
);


/* ==========================================================
   PÁGINA MUDOU PELA URL
========================================================== */

window.addEventListener(
  "hashchange",
  () => {

    const hash =
      window.location.hash
        .replace("#", "")
        .trim();


    if (
      pages.includes(hash)
    ) {

      showPage(hash);

    }

  }
);


/* ==========================================================
   LINKS INTERNOS ANTIGOS
========================================================== */

/*
 * Alguns links antigos do site
 * apontam para #entenda, #praticas
 * ou #exemplos.
 *
 * Eles continuam funcionando
 * dentro da página inicial.
 */

document
  .querySelectorAll(
    'a[href="#entenda"], a[href="#praticas"], a[href="#exemplos"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link
              .getAttribute("href")
              .replace("#", "");


          /*
           * Primeiro garante que
           * a página inicial está aberta.
           */
          if (
            currentPage !== "inicio"
          ) {

            event.preventDefault();


            showPage(
              "inicio",
              {
                focus: false,
                announceChange: false
              }
            );


            setTimeout(
              () => {

                const target =
                  document.getElementById(
                    id
                  );


                if (target) {

                  target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });

                }

              },
              300
            );

          }

        }
      );

    }
  );


/* ==========================================================
   LINKS DA MARCA / LOGO
========================================================== */

document
  .querySelectorAll(
    '.marca[href="#inicio"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          showPage("inicio");

        }
      );

    }
  );


/* ==========================================================
   COMANDOS DE VOZ — AJUDA
========================================================== */

function voiceCommandsHelp() {

  const commands = `
    Você pode dizer:
    ir para início,
    ir para deficiência visual,
    ir para deficiência auditiva,
    ir para deficiência motora,
    ir para deficiência cognitiva,
    próxima página,
    página anterior,
    ouvir página,
    parar leitura,
    pausar leitura,
    continuar leitura,
    trocar tema,
    tema claro,
    tema escuro,
    mudar tópico,
    ler tópico 1,
    ler tópico 2,
    voltar ao início,
    ir para o final.
  `;


  announce(
    "Lista de comandos disponível."
  );


  window.speechSynthesis.cancel();


  speechParts =
    splitText(commands);


  currentPart = 0;

  isSpeaking = true;

  isPaused = false;


  updateReaderButtons(
    "Parar leitura",
    true
  );


  speakCurrentPart();

}


/* ==========================================================
   ADICIONAR COMANDO "AJUDA"
========================================================== */

const originalExecuteVoiceCommand =
  executeVoiceCommand;


executeVoiceCommand =
  function (
    spokenText
  ) {

    const command =
      normalizeCommand(
        spokenText
      );


    if (
      command === "ajuda"
      ||
      command.includes(
        "listar comandos"
      )
      ||
      command.includes(
        "quais sao os comandos"
      )
      ||
      command.includes(
        "comandos disponiveis"
      )
    ) {

      voiceCommandsHelp();

      return;

    }


    originalExecuteVoiceCommand(
      spokenText
    );

  };


/* ==========================================================
   CONFIGURAÇÃO DE ACESSIBILIDADE
========================================================== */

function configureAccessibility() {

  /*
   * Melhora acessibilidade
   * de todos os botões de página.
   */
  document
    .querySelectorAll(
      "[data-go-page]"
    )
    .forEach(
      (button) => {

        const destination =
          button.dataset.goPage;


        if (
          destination
          &&
          pageNames[
            destination
          ]
        ) {

          button.setAttribute(
            "aria-label",
            `Ir para a página ${pageNames[destination]}`
          );

        }

      }
    );


  /*
   * Todos os elementos que
   * representam tópicos recebem
   * índice semântico.
   */
  document
    .querySelectorAll(
      "[data-topic]"
    )
    .forEach(
      (
        topic,
        index
      ) => {

        if (
          !topic.hasAttribute(
            "aria-label"
          )
        ) {

          topic.setAttribute(
            "aria-label",
            `Tópico ${index + 1}`
          );

        }

      }
    );

}


/* ==========================================================
   ESTADO DO MODAL DO MICROFONE
========================================================== */

function configureMicrophoneModal() {

  if (!activationPanel) {
    return;
  }


  const choice =
    localStorage.getItem(
      "inclui-microphone-choice"
    );


  /*
   * Se já escolheu anteriormente,
   * não mostra novamente.
   */
  if (
    choice === "allowed"
    ||
    choice === "denied"
  ) {

    activationPanel.hidden =
      true;

  } else {

    activationPanel.hidden =
      false;

  }

}


/* ==========================================================
   REATIVAR MICROFONE SALVO
========================================================== */

function restoreMicrophonePreference() {

  const choice =
    localStorage.getItem(
      "inclui-microphone-choice"
    );


  /*
   * Navegadores normalmente não permitem
   * iniciar reconhecimento automaticamente
   * sem interação do usuário.
   *
   * Por isso apenas preservamos a escolha,
   * mas o usuário ativa pelo botão quando
   * entrar novamente.
   */
  if (
    choice === "allowed"
  ) {

    microphoneAllowed = false;


    announce(
      "Comandos de voz disponíveis. Use o botão Comandos para ativar."
    );

  }

}


/* ==========================================================
   CARREGAMENTO INICIAL
========================================================== */

function initializeSite() {

  configureReadingPreferences();

  /*
   * Configura navegação.
   */
  configurePageButtons();


  /*
   * Configura botões de leitura
   * que foram adicionados
   * nas páginas novas.
   */
  configureDynamicReaderButtons();


  /*
   * Configura atributos
   * de acessibilidade.
   */
  configureAccessibility();


  /*
   * Aplica idioma salvo.
   */
  applyLanguage(
    currentLanguage,
    false
  );


  /*
   * Abre página definida
   * na URL ou início.
   */
  openPageFromHash();


  /*
   * Configura modal inicial.
   */
  configureMicrophoneModal();


  /*
   * Verifica preferência
   * anterior do microfone.
   */
  restoreMicrophonePreference();


  /*
   * Atualiza botão do leitor.
   */
  updateReaderButtons(
    languages[currentLanguage].reader,
    false
  );

}

/* Preferências independentes da leitura em voz e da navegação. */
function configureReadingPreferences() {
  const decrease = document.querySelector("[data-text-decrease]");
  const increase = document.querySelector("[data-text-increase]");
  const level = document.querySelector("[data-text-level]");
  const spacingButton = document.querySelector("[data-reading-spacing]");
  const reset = document.querySelector("[data-reading-reset]");
  if (!decrease || !increase || !level || !spacingButton || !reset) return;

  const allowedLevels = [100, 110, 125, 150];
  const savedLevel = Number(localStorage.getItem("inclui-text-size"));
  let size = allowedLevels.includes(savedLevel) ? savedLevel : 100;
  let spacing = localStorage.getItem("inclui-reading-spacing") === "true";

  function render() {
    document.documentElement.style.setProperty("--inclui-text-zoom", String(size / 100));
    document.body.dataset.readingSpacing = String(spacing);
    level.value = `${size}%`;
    level.textContent = `${size}%`;
    decrease.disabled = size === allowedLevels[0];
    increase.disabled = size === allowedLevels[allowedLevels.length - 1];
    spacingButton.setAttribute("aria-pressed", String(spacing));
    spacingButton.textContent = spacing ? "Espaçamento normal" : "Mais espaçamento";
  }

  function save() {
    localStorage.setItem("inclui-text-size", String(size));
    localStorage.setItem("inclui-reading-spacing", String(spacing));
    render();
  }

  decrease.addEventListener("click", () => {
    const index = allowedLevels.indexOf(size);
    if (index > 0) { size = allowedLevels[index - 1]; save(); }
  });
  increase.addEventListener("click", () => {
    const index = allowedLevels.indexOf(size);
    if (index < allowedLevels.length - 1) { size = allowedLevels[index + 1]; save(); }
  });
  spacingButton.addEventListener("click", () => { spacing = !spacing; save(); });
  reset.addEventListener("click", () => { size = 100; spacing = false; save(); });
  render();
}


/* ==========================================================
   INICIALIZAR QUANDO O HTML ESTIVER PRONTO
========================================================== */

if (
  document.readyState
  === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeSite
  );

} else {

  initializeSite();

}


/* ==========================================================
   PARAR LEITOR AO SAIR DA PÁGINA
========================================================== */

window.addEventListener(
  "beforeunload",
  () => {

    window.speechSynthesis.cancel();


    if (recognition) {

      microphoneAllowed = false;


      try {

        recognition.stop();

      } catch (error) {

        /*
         * Nada precisa ser feito.
         */

      }

    }

  }
);


/* ==========================================================
   MENSAGEM DE DEBUG
========================================================== */

console.log(
  "Inclui carregado com sucesso."
);


console.log(
  "Página atual:",
  currentPage
);


console.log(
  "Idioma atual:",
  currentLanguage
);


console.log(
  "Reconhecimento de voz disponível:",
  Boolean(SpeechRecognition)
);


/* =========================================
   FILTRO DE DALTONISMO
   ========================================= */

const botaoDaltonismo = document.getElementById("botao-daltonismo");

if (botaoDaltonismo) {

  /*
     =========================================
     1. CRIA OS FILTROS SVG
     =========================================
  */

  const SVG_NS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");

  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.style.overflow = "hidden";

  svg.innerHTML = `
    <defs>

      <!-- PROTANOPIA -->
      <filter id="filtro-protanopia">
        <feColorMatrix
          type="matrix"
          values="
            0.567 0.433 0     0 0
            0.558 0.442 0     0 0
            0     0.242 0.758 0 0
            0     0     0     1 0
          "
        />
      </filter>

      <!-- DEUTERANOPIA -->
      <filter id="filtro-deuteranopia">
        <feColorMatrix
          type="matrix"
          values="
            0.625 0.375 0     0 0
            0.700 0.300 0     0 0
            0     0.300 0.700 0 0
            0     0     0     1 0
          "
        />
      </filter>

      <!-- TRITANOPIA -->
      <filter id="filtro-tritanopia">
        <feColorMatrix
          type="matrix"
          values="
            0.950 0.050 0     0 0
            0     0.433 0.567 0 0
            0     0.475 0.525 0 0
            0     0     0     1 0
          "
        />
      </filter>

      <!-- ACROMATOPSIA -->
      <filter id="filtro-acromatopsia">
        <feColorMatrix
          type="matrix"
          values="
            0.2126 0.7152 0.0722 0 0
            0.2126 0.7152 0.0722 0 0
            0.2126 0.7152 0.0722 0 0
            0      0      0      1 0
          "
        />
      </filter>

    </defs>
  `;

  document.body.appendChild(svg);


  /*
     =========================================
     2. CRIA O MENU
     =========================================
  */

  const menu = document.createElement("div");

  menu.className = "menu-daltonismo";

  menu.hidden = true;

  menu.innerHTML = `
    <button type="button" data-filtro="normal">
      Normal
    </button>

    <button type="button" data-filtro="protanopia">
      Protanopia
    </button>

    <button type="button" data-filtro="deuteranopia">
      Deuteranopia
    </button>

    <button type="button" data-filtro="tritanopia">
      Tritanopia
    </button>

    <button type="button" data-filtro="acromatopsia">
      Acromatopsia
    </button>
  `;


  /*
     =========================================
     3. COLOCA O MENU AO LADO DO BOTÃO
     =========================================
  */

  const containerBotao = botaoDaltonismo.parentElement;

  if (containerBotao) {

    containerBotao.style.position = "relative";

    containerBotao.appendChild(menu);

  }


  /*
     =========================================
     4. ABRIR / FECHAR MENU
     =========================================
  */

  botaoDaltonismo.addEventListener("click", () => {

    menu.hidden = !menu.hidden;

  });


  /*
     =========================================
     5. APLICAR O FILTRO NA PÁGINA INTEIRA
     =========================================
  */

  const botoesFiltro = menu.querySelectorAll("[data-filtro]");

  botoesFiltro.forEach((botao) => {

    botao.addEventListener("click", () => {

      const filtro = botao.dataset.filtro;


      /*
         Primeiro remove qualquer filtro
         que já esteja aplicado.
      */

      document.body.style.filter = "";


      /*
         NORMAL
         Volta para as cores originais.
      */

      if (filtro === "normal") {

        document.body.style.filter = "";

      }


      /*
         PROTANOPIA
      */

      else if (filtro === "protanopia") {

        document.body.style.filter =
          'url("#filtro-protanopia")';

      }


      /*
         DEUTERANOPIA
      */

      else if (filtro === "deuteranopia") {

        document.body.style.filter =
          'url("#filtro-deuteranopia")';

      }


      /*
         TRITANOPIA
      */

      else if (filtro === "tritanopia") {

        document.body.style.filter =
          'url("#filtro-tritanopia")';

      }


      /*
         ACROMATOPSIA
      */

      else if (filtro === "acromatopsia") {

        document.body.style.filter =
          'url("#filtro-acromatopsia")';

      }


      /*
         Marca o botão selecionado.
      */

      botoesFiltro.forEach((b) => {

        b.classList.remove("ativo");

      });

      botao.classList.add("ativo");


      /*
         Marca o botão principal como ativo.
      */

      if (filtro === "normal") {

        botaoDaltonismo.classList.remove("filtro-ativo");

        botaoDaltonismo.setAttribute(
          "aria-pressed",
          "false"
        );

      } else {

        botaoDaltonismo.classList.add("filtro-ativo");

        botaoDaltonismo.setAttribute(
          "aria-pressed",
          "true"
        );

      }


      /*
         Fecha o menu depois de escolher.
      */

      menu.hidden = true;

    });

  });

}


/* ==========================================================
   FIM DO SCRIPT
========================================================== */