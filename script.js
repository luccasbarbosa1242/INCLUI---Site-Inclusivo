
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

    const languageSelector = document.querySelector("[data-language-selector]");

    const languages = {
      "pt-BR": { short: "Português", reader: "Ouvir a página", changed: "Idioma alterado para português.", voice: "Comandos de voz ativos. Diga trocar idioma para português, inglês ou espanhol." },
      "en-US": { short: "English", reader: "Listen to page", changed: "Language changed to English.", voice: "Voice commands are active. Say change language to Portuguese, English, or Spanish." },
      "es-ES": { short: "Español", reader: "Escuchar la página", changed: "Idioma cambiado a español.", voice: "Los comandos de voz están activos. Di cambiar idioma a portugués, inglés o español." }
    };

    let currentLanguage = localStorage.getItem("inclui-language") || "pt-BR";

    const translatedContent = {
      "en-US": {
        ".topo nav a:nth-child(1)": "Understand", ".topo nav a:nth-child(2)": "In practice", ".topo nav a:nth-child(3)": "Examples",
        ".hero .etiqueta": "DIGITAL ACCESSIBILITY", ".hero h1": "Technology is only complete when <em>it includes.</em>", ".introducao": "Inclusive systems remove barriers so that everyone can study, work, create, and participate in the digital world independently.",
        ".link-texto": "Discover more <span aria-hidden=\"true\">↓</span>", "#ajuda-comandos": "Voice commands are in the top-right corner. Say “change language to English”, “change topic”, “read topic 2”, “go to the start”, or “go to the end”.",
        ".cartao-1 strong": "Keyboard", ".cartao-1 small": "Free navigation", ".cartao-2 strong": "Reading", ".cartao-2 small": "Accessible content",
        ".entenda .etiqueta": "WHAT DOES THIS MEAN?", "#titulo-entenda": "Inclusion is not an extra.<br>It is part of the design.", ".texto-lateral p:first-child": "An inclusive system is designed for people with different ways of perceiving, understanding, and interacting with technology.", ".texto-lateral p:last-child": "Instead of creating one “standard” experience, it offers different paths to achieve the same result.",
        ".praticas .etiqueta": "DESIGN FOR REAL PEOPLE", "#titulo-praticas": "Small choices, big impacts.", ".praticas-texto > p:not(.etiqueta)": "When accessibility is included from the start, the experience improves for everyone — including in temporary situations such as a slow connection, a noisy environment, or an injury.",
        ".exemplos .etiqueta": "TECHNOLOGIES THAT OPEN PATHS", "#titulo-exemplos": "Resources that already make a difference", ".convite .etiqueta": "START TODAY", "#titulo-convite": "Designing for everyone is<br><em>designing better.</em>",
        "footer p:first-of-type": "An academic project about accessibility and digital inclusion.", "footer p:last-of-type": "Made to be accessible."
      },
      "es-ES": {
        ".topo nav a:nth-child(1)": "Entiende", ".topo nav a:nth-child(2)": "En la práctica", ".topo nav a:nth-child(3)": "Ejemplos",
        ".hero .etiqueta": "ACCESIBILIDAD DIGITAL", ".hero h1": "La tecnología solo está completa cuando <em>incluye.</em>", ".introducao": "Los sistemas inclusivos eliminan barreras para que cada persona pueda estudiar, trabajar, crear y participar en el mundo digital con autonomía.",
        ".link-texto": "Descubrir más <span aria-hidden=\"true\">↓</span>", "#ajuda-comandos": "Los comandos de voz están en la esquina superior derecha. Di “cambiar idioma a español”, “cambiar tema”, “leer tema 2”, “volver al inicio” o “ir al final”.",
        ".cartao-1 strong": "Teclado", ".cartao-1 small": "Navegación libre", ".cartao-2 strong": "Lectura", ".cartao-2 small": "Contenido accesible",
        ".entenda .etiqueta": "¿QUÉ SIGNIFICA ESTO?", "#titulo-entenda": "La inclusión no es un extra.<br>Es parte del proyecto.", ".texto-lateral p:first-child": "Un sistema inclusivo está diseñado para atender a personas con diferentes formas de percibir, comprender e interactuar con la tecnología.", ".texto-lateral p:last-child": "En lugar de crear una única experiencia “estándar”, ofrece distintos caminos para lograr el mismo resultado.",
        ".praticas .etiqueta": "DISEÑO PARA PERSONAS REALES", "#titulo-praticas": "Pequeñas decisiones, grandes impactos.", ".praticas-texto > p:not(.etiqueta)": "Cuando la accesibilidad se incorpora desde el inicio, la experiencia mejora para todos, incluso en situaciones temporales como una conexión lenta, un entorno ruidoso o una lesión.",
        ".exemplos .etiqueta": "TECNOLOGÍAS QUE ABREN CAMINOS", "#titulo-exemplos": "Recursos que ya marcan la diferencia", ".convite .etiqueta": "EMPIEZA HOY", "#titulo-convite": "Diseñar para todos es<br><em>diseñar mejor.</em>",
        "footer p:first-of-type": "Un proyecto académico sobre accesibilidad e inclusión digital.", "footer p:last-of-type": "Hecho para ser accesible."
      }
    };

    const portugueseContent = {};
    Object.assign(translatedContent["en-US"], {
      "#titulo-ativacao": "Enable voice commands", ".ativacao p:not(.etiqueta)": "To use voice commands, allow access to the microphone. Then you can say commands such as “change language to English”, “change topic”, “read topic 2”, “go to the start”, or “go to the end” .", "#ativar-acessibilidade": "Enable voice commands", "#agora-nao-acessibilidade": "Not now",
      ".pilar:nth-child(1) h3": "Perceivable", ".pilar:nth-child(1) p": "Information that can be seen, heard, or felt through more than one channel.",
      ".pilar:nth-child(2) h3": "Operable", ".pilar:nth-child(2) p": "Controls that can be used with a keyboard, mouse, touch, and assistive technologies.",
      ".pilar:nth-child(3) h3": "Understandable", ".pilar:nth-child(3) p": "Clear text, predictable navigation, and help available when needed.",
      ".pilar:nth-child(4) h3": "Robust", ".pilar:nth-child(4) p": "Compatibility with screen readers and different browsers and devices.",
      ".praticas li:nth-child(1) strong": "Alternative text", ".praticas li:nth-child(1) small": "Describes images for people who cannot see them.",
      ".praticas li:nth-child(2) strong": "Adequate contrast", ".praticas li:nth-child(2) small": "Helps with reading in any context.",
      ".praticas li:nth-child(3) strong": "Visible focus", ".praticas li:nth-child(3) small": "Shows where you are when navigating with a keyboard.",
      ".grid-exemplos article:nth-child(1) h3": "Screen readers", ".grid-exemplos article:nth-child(1) p": "They turn on-screen elements and text into speech or a braille display.",
      ".grid-exemplos article:nth-child(2) h3": "Keyboard navigation", ".grid-exemplos article:nth-child(2) p": "Lets you use websites without a mouse or complex gestures.",
      ".grid-exemplos article:nth-child(3) h3": "Captions and transcripts", ".grid-exemplos article:nth-child(3) p": "They make videos and audio accessible in different contexts."
    });
    Object.assign(translatedContent["es-ES"], {
      "#titulo-ativacao": "Activa los comandos de voz", ".ativacao p:not(.etiqueta)": "Para utilizar los comandos de voz, permite el acceso al micrófono. Después podrás decir “cambiar idioma a español”, “cambiar tema”, “leer tema 2”, “volver al inicio” o “ir al final” .", "#ativar-acessibilidade": "Activar comandos de voz", "#agora-nao-acessibilidade": "Ahora no",
      ".pilar:nth-child(1) h3": "Perceptible", ".pilar:nth-child(1) p": "Información que puede verse, oírse o sentirse por más de un canal.",
      ".pilar:nth-child(2) h3": "Operable", ".pilar:nth-child(2) p": "Controles utilizables con teclado, ratón, tacto y tecnologías de apoyo.",
      ".pilar:nth-child(3) h3": "Comprensible", ".pilar:nth-child(3) p": "Textos claros, navegación previsible y ayuda disponible cuando sea necesaria.",
      ".pilar:nth-child(4) h3": "Robusto", ".pilar:nth-child(4) p": "Compatibilidad con lectores de pantalla y distintos navegadores y dispositivos.",
      ".praticas li:nth-child(1) strong": "Textos alternativos", ".praticas li:nth-child(1) small": "Describen imágenes para quien no las ve.",
      ".praticas li:nth-child(2) strong": "Contraste adecuado", ".praticas li:nth-child(2) small": "Ayuda a leer en cualquier contexto.",
      ".praticas li:nth-child(3) strong": "Foco visible", ".praticas li:nth-child(3) small": "Muestra dónde estás al navegar con el teclado.",
      ".grid-exemplos article:nth-child(1) h3": "Lectores de pantalla", ".grid-exemplos article:nth-child(1) p": "Transforman elementos y textos de la pantalla en voz o en una línea braille.",
      ".grid-exemplos article:nth-child(2) h3": "Navegación por teclado", ".grid-exemplos article:nth-child(2) p": "Permite usar sitios sin ratón ni gestos complejos.",
      ".grid-exemplos article:nth-child(3) h3": "Subtítulos y transcripciones", ".grid-exemplos article:nth-child(3) p": "Hacen accesibles los vídeos y audios en distintos contextos."
    });
    Object.keys(translatedContent["en-US"]).forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) portugueseContent[selector] = element.innerHTML;
    });

    function applyLanguage(language, feedback = true) {
      currentLanguage = languages[language] ? language : "pt-BR";
      const content = currentLanguage === "pt-BR" ? portugueseContent : translatedContent[currentLanguage];
      Object.entries(content).forEach(([selector, value]) => {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = value;
      });
      document.documentElement.lang = currentLanguage;
      document.title = currentLanguage === "en-US" ? "Inclui | Systems for everyone" : currentLanguage === "es-ES" ? "Inclui | Sistemas para todas las personas" : "Inclui | Sistemas para todas as pessoas";
      languageSelector.value = currentLanguage;
      localStorage.setItem("inclui-language", currentLanguage);
      if (recognition) recognition.lang = currentLanguage;
      if (typeof updateReaderButtons === "function" && !isSpeaking) {
        updateReaderButtons(languages[currentLanguage].reader, false);
      }
      if (feedback) announce(languages[currentLanguage].changed);
    }

    languageSelector.addEventListener("change", () => applyLanguage(languageSelector.value));


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


    function announce(message) {

      status.textContent = message;

      status.classList.add("visivel");

      clearTimeout(announce.timer);

      announce.timer = setTimeout(() => {
        status.classList.remove("visivel");
      }, 3500);
    }


    function updateReaderButtons(label, pressed) {

      readerButtons.forEach((button) => {

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

      });

    }


    function pageText() {

      const main =
        document.querySelector("main");

      return main
        ? main.innerText
            .replace(/\s+/g, " ")
            .trim()
        : "";

    }


    function splitText(text) {

      const sentences =
        text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
        || [text];

      const parts = [];

      let part = "";

      sentences.forEach((sentence) => {

        const next =
          `${part} ${sentence}`.trim();

        if (
          next.length > 180 &&
          part
        ) {
          parts.push(part);

          part =
            sentence.trim();

        } else {

          part = next;

        }

      });

      if (part) {
        parts.push(part);
      }

      return parts;
    }


    function getPreferredVoice() {

      const voices =
        window.speechSynthesis.getVoices();

      if (!voices.length) {
        return null;
      }

      let voice =
        voices.find(
          (v) =>
            v.lang &&
            v.lang.toLowerCase() === currentLanguage.toLowerCase()
        );

      /*
       * Depois procura uma voz no mesmo idioma.
       */
      if (!voice) {
        voice =
          voices.find(
            (v) =>
              v.lang &&
              v.lang.toLowerCase().startsWith(currentLanguage.slice(0, 2).toLowerCase())
          );
      }

      return voice || voices[0];
    }


    function speakCurrentPart() {

      if (
        !isSpeaking ||
        isPaused
      ) {
        return;
      }

      if (
        currentPart >=
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
        new SpeechSynthesisUtterance(text);


      const voice =
        getPreferredVoice();

      if (voice) {
        utterance.voice = voice;
      }


      utterance.lang =
        voice?.lang || currentLanguage;


      /*
       * Velocidade confortável para leitura.
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


      utterance.onend = () => {

        if (!isSpeaking) {
          return;
        }

        currentPart++;

        if (!isPaused) {
          speakCurrentPart();
        }

      };


      utterance.onerror = (event) => {

        /*
         * "interrupted" normalmente ocorre quando
         * o usuário aperta pausa/parar.
         */
        if (
          event.error === "interrupted" ||
          event.error === "canceled"
        ) {
          return;
        }

        finishReading(
          "Não foi possível reproduzir a voz neste navegador."
        );

      };


      window.speechSynthesis.speak(
        utterance
      );

    }


    function finishReading(message) {

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


    function startReading(textToRead = pageText()) {

      /*
       * Se já está lendo:
       * botão pausa.
       */
      if (
        isSpeaking &&
        !isPaused
      ) {

        window.speechSynthesis.pause();

        isPaused = true;

        updateReaderButtons(
          "Continuar leitura",
          true
        );

        announce(
          "Leitura pausada."
        );

        return;
      }


      /*
       * Se está pausado:
       * botão continua.
       */
      if (
        isSpeaking &&
        isPaused
      ) {

        window.speechSynthesis.resume();

        isPaused = false;

        updateReaderButtons(
          "Pausar leitura",
          true
        );

        announce(
          "Leitura retomada."
        );

        return;
      }


      /*
       * Começa uma nova leitura.
       */
      window.speechSynthesis.cancel();

      speechParts =
        splitText(textToRead);

      currentPart = 0;

      isSpeaking = true;
      isPaused = false;

      updateReaderButtons(
        "Pausar leitura",
        true
      );

      announce(
        "Leitura iniciada."
      );

      /*
       * Alguns navegadores carregam as vozes
       * de maneira assíncrona.
       */
      if (
        window.speechSynthesis.getVoices().length === 0
      ) {

        setTimeout(
          speakCurrentPart,
          150
        );

      } else {

        speakCurrentPart();

      }

    }


    /*
     * IMPORTANTE:
     *
     * A leitura só pode ser iniciada pelos
     * botões [data-reader].
     */
    readerButtons.forEach((button) => {

      button.addEventListener(
        "click",
        () => startReading()
      );

    });


    /*
     * Força o carregamento das vozes
     * quando o navegador disponibilizá-las.
     */
    if (
      "speechSynthesis" in window
    ) {

      window.speechSynthesis.onvoiceschanged =
        () => {
          window.speechSynthesis.getVoices();
        };

    }


    /* ==========================================================
       TEMA
    ========================================================== */

    function applyTheme(
      theme,
      feedback = true
    ) {

      const dark =
        theme === "dark";


      document.body.dataset.theme =
        dark ? "dark" : "light";


      themeButton.setAttribute(
        "aria-pressed",
        String(dark)
      );


      themeButton.setAttribute(
        "aria-label",
        dark
          ? "Ativar tema claro"
          : "Ativar tema escuro"
      );


      themeButton.innerHTML = `
        <span aria-hidden="true">
          ${dark ? "☀" : "☾"}
        </span>

        <span class="texto-controle">
          ${dark ? "Claro" : "Tema"}
        </span>
      `;


      localStorage.setItem(
        "inclui-theme",
        theme
      );


      if (feedback) {

        const message =
          `Tema ${
            dark
              ? "escuro"
              : "claro"
          } ativado.`;

        announce(message);

      }

    }


    applyTheme(
      localStorage.getItem(
        "inclui-theme"
      ) || "light",
      false
    );


    themeButton.addEventListener(
      "click",
      () => {

        applyTheme(
          document.body.dataset.theme ===
            "dark"
            ? "light"
            : "dark"
        );

      }
    );


    /* ==========================================================
       TÓPICOS
    ========================================================== */

    const topics = [
      "inicio",
      "entenda",
      "praticas",
      "exemplos"
    ];

    let topicIndex = 0;


    function changeTopic() {

      topicIndex =
        (topicIndex + 1) %
        topics.length;


      const section =
        document.getElementById(
          topics[topicIndex]
        );


      if (!section) {
        return;
      }


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
        section
          .querySelector("h1, h2")
          ?.textContent
          .trim()
        || "início";


      announce(
        `Tópico alterado: ${title}.`
      );

    }


    function readTopic(number) {

      const index =
        Math.max(
          0,
          Math.min(
            topics.length - 1,
            number - 1
          )
        );


      topicIndex = index;


      const section =
        document.getElementById(
          topics[index]
        );


      if (!section) {
        return;
      }


      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      const title =
        section
          .querySelector("h1, h2")
          ?.textContent
          .trim()
        || `tópico ${number}`;


      /*
       * Se estiver lendo alguma coisa,
       * interrompe antes de começar o tópico.
       */
      window.speechSynthesis.cancel();

      isSpeaking = false;
      isPaused = false;


      announce(
        `Lendo tópico ${index + 1}: ${title}.`
      );


      /*
       * EXCEÇÃO IMPORTANTE:
       *
       * "ler tópico 1/2/3/4" continua sendo
       * um comando de voz válido.
       *
       * O comando "começar a ler" NÃO existe.
       */
      startReading(
        section.innerText
          .replace(/\s+/g, " ")
          .trim()
      );

    }


    function goToStart() {

      topicIndex = 0;


      const section =
        document.getElementById(
          "inicio"
        );


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


      announce(
        "Você voltou ao início da página."
      );

    }


    function goToEnd() {

      const footer =
        document.querySelector("footer");


      footer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      footer.setAttribute(
        "tabindex",
        "-1"
      );


      footer.focus({
        preventScroll: true
      });


      announce(
        "Você chegou ao final da página."
      );

    }


    /* ==========================================================
       RECONHECIMENTO DE VOZ
    ========================================================== */

    let recognition = null;

    let isListening = false;

    let microphoneBlocked = false;

    let microphoneGranted = false;

    let microphoneStream = null;

    applyLanguage(currentLanguage, false);


    function createRecognition() {

      const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


      if (!Recognition) {
        return false;
      }


      if (recognition) {
        return true;
      }


      recognition =
        new Recognition();


      recognition.lang =
        currentLanguage;


      recognition.continuous =
        true;


      recognition.interimResults =
        false;


      recognition.onresult =
        (event) => {

          const result =
            event.results[
              event.results.length - 1
            ];


          if (
            result.isFinal
          ) {

            handleVoiceCommand(
              result[0].transcript
            );

          }

        };


      recognition.onerror =
        (event) => {

          if (
            event.error ===
              "not-allowed" ||
            event.error ===
              "service-not-allowed"
          ) {

            microphoneBlocked =
              true;

            isListening =
              false;


            commandButton.setAttribute(
              "aria-pressed",
              "false"
            );


            announce(
              "Permissão do microfone negada. Libere o microfone nas configurações do navegador."
            );

          }


          if (
            event.error === "network"
          ) {

            announce(
              "O reconhecimento de voz precisa de internet."
            );

          }

        };


      recognition.onend =
        () => {

          if (
            isListening &&
            microphoneGranted &&
            !microphoneBlocked
          ) {

            setTimeout(
              () => {

                try {
                  recognition.start();
                } catch {}

              },
              350
            );

          }

        };


      return true;
    }


    async function requestMicrophone() {

      if (
        !navigator.mediaDevices?.getUserMedia
      ) {

        announce(
          "Este navegador não permite acesso ao microfone."
        );

        return false;
      }


      try {

        microphoneStream =
          await navigator.mediaDevices.getUserMedia({
            audio: true
          });


        microphoneGranted =
          true;


        return true;

      } catch {

        microphoneBlocked =
          true;


        announce(
          "Permissão do microfone negada. Libere o acesso nas configurações do navegador."
        );


        return false;
      }

    }


    async function startVoiceCommands() {

      if (
        !createRecognition()
      ) {

        announce(
          "Comandos de voz não são compatíveis com este navegador. Use o Google Chrome."
        );

        return false;
      }


      if (
        microphoneBlocked
      ) {

        announce(
          "O microfone está bloqueado pelo navegador. Libere a permissão antes de ativar os comandos."
        );

        return false;
      }


      if (
        !microphoneGranted
      ) {

        const granted =
          await requestMicrophone();


        if (!granted) {
          return false;
        }

      }


      isListening = true;


      commandButton.setAttribute(
        "aria-pressed",
        "true"
      );


      announce(languages[currentLanguage].voice);


      try {
        recognition.start();
      } catch {}


      return true;
    }


    function stopVoiceCommands() {
  isListening = false;

  if (recognition) {
    try {
      recognition.stop();
    } catch {}
  }

  if (microphoneStream) {
    try {
      microphoneStream
        .getTracks()
        .forEach((track) => track.stop());
    } catch {}

    microphoneStream = null;
  }

  microphoneGranted = false;

  commandButton.setAttribute(
    "aria-pressed",
    "false"
  );

  announce(
    "Microfone e comandos de voz desativados."
  );
}
    /* ==========================================================
       COMANDOS DE VOZ
       
       ATENÇÃO:
       
       NÃO EXISTE comando para:
       - começar a ler
       - ler página
       - leia página
       
       A leitura da página inteira é EXCLUSIVAMENTE
       feita pelos botões.
    ========================================================== */

    function handleVoiceCommand(
      transcript
    ) {

      const command =
        transcript
          .normalize("NFD")
          .replace(
            /[\u0300-\u036f]/g,
            ""
          )
          .toLowerCase()
          .trim();

      /* Troca de idioma: português, inglês e espanhol. */
      const wantsLanguageChange =
        /(?:trocar|mudar)\s+(?:o\s+)?idioma|change\s+language|cambiar\s+(?:el\s+)?idioma/.test(command);

      if (wantsLanguageChange) {
        if (/ingles|english|ingl[eé]s/.test(command)) {
          applyLanguage("en-US");
        } else if (/espanhol|espanol|spanish/.test(command)) {
          applyLanguage("es-ES");
        } else if (/portugues|portuguese/.test(command)) {
          applyLanguage("pt-BR");
        } else {
          const order = ["pt-BR", "en-US", "es-ES"];
          applyLanguage(order[(order.indexOf(currentLanguage) + 1) % order.length]);
        }
        return;
      }


      /*
       * -------------------------------------------------------
       * LER TÓPICO
       * -------------------------------------------------------
       *
       * Continua funcionando por voz.
       */

      const numericTopic =
        command.match(
          /ler\s+(?:o\s+)?topico\s+(?:numero\s+)?(\d+)/
        );


      const writtenTopic =
        command.match(
          /ler\s+(?:o\s+)?topico\s+(um|uma|dois|duas|tres|quatro)/
        );


      let topicNumber =
        numericTopic?.[1];


      if (!topicNumber) {

        const written =
          writtenTopic?.[1];


        const numbers = {
          um: 1,
          uma: 1,
          dois: 2,
          duas: 2,
          tres: 3,
          quatro: 4
        };


        topicNumber =
          numbers[written];

      }


      if (topicNumber) {

        readTopic(
          Number(topicNumber)
        );

        return;
      }


      /*
       * -------------------------------------------------------
       * VOLTAR AO INÍCIO
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "voltar ao inicio"
        ) ||
        command.includes(
          "ir para o inicio"
        )
      ) {

        goToStart();

        return;
      }


      /*
       * -------------------------------------------------------
       * IR PARA O FINAL
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "ir para o final"
        ) ||
        command.includes(
          "ir para final"
        ) ||
        command.includes(
          "ir pro final"
        ) ||
        command.includes(
          "ir ao final"
        ) ||
        command.includes(
          "fim da pagina"
        ) ||
        command.includes(
          "final da pagina"
        )
      ) {

        goToEnd();

        return;
      }


      /*
       * -------------------------------------------------------
       * TROCAR TEMA
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "trocar tema"
        ) ||
        command.includes(
          "mudar tema"
        ) ||
        command.includes(
          "mudar o tema"
        ) ||
        command.includes(
          "mude o tema"
        ) ||
        command.includes(
          "mude tema"
        )
      ) {

        applyTheme(
          document.body.dataset.theme ===
            "dark"
            ? "light"
            : "dark"
        );

        return;
      }


      /*
       * -------------------------------------------------------
       * TEMA ESCURO
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "tema escuro"
        )
      ) {

        applyTheme("dark");

        return;
      }


      /*
       * -------------------------------------------------------
       * TEMA CLARO
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "tema claro"
        )
      ) {

        applyTheme("light");

        return;
      }


      /*
       * -------------------------------------------------------
       * MUDAR TÓPICO
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "mudar topico"
        ) ||
        command.includes(
          "trocar topico"
        ) ||
        command.includes(
          "proximo topico"
        ) ||
        command.includes(
          "proximo tópico"
        )
      ) {

        changeTopic();

        return;
      }


      /*
       * -------------------------------------------------------
       * COMANDOS DE LEITURA DA PÁGINA
       *
       * NÃO SÃO MAIS ACEITOS.
       *
       * Isso é proposital.
       *
       * "começar a ler"
       * "comecar a ler"
       * "ler página"
       * "ler pagina"
       * "leia a página"
       *
       * não fazem nada.
       *
       * A página inteira só pode ser lida pelo botão.
       * -------------------------------------------------------
       */

      if (
        command.includes(
          "comecar a ler"
        ) ||
        command.includes(
          "começar a ler"
        ) ||
        command.includes(
          "ler pagina"
        ) ||
        command.includes(
          "ler a pagina"
        ) ||
        command.includes(
          "leia pagina"
        ) ||
        command.includes(
          "leia a pagina"
        )
      ) {

        announce(
          "Para ler a página inteira, utilize o botão Ouvir a página."
        );

        return;
      }


      /*
       * -------------------------------------------------------
       * COMANDO DESCONHECIDO
       * -------------------------------------------------------
       */

      announce(
        "Não reconheci esse comando. Diga trocar tema, mudar tópico, ler tópico 1, voltar ao início ou ir para o final."
      );

    }


    /* ==========================================================
       FECHAR / NEGAR PERMISSÃO INICIAL
    ========================================================== */

    function fecharPedidoMicrofone(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Fechamento imediato e sem depender de outras funções do site.
      if (activationPanel) {
        activationPanel.hidden = true;
        activationPanel.setAttribute("aria-hidden", "true");
      }

      // Marca a permissão como recusada nesta sessão, evitando nova solicitação automática.
      microphoneBlocked = true;
      microphoneGranted = false;
      isListening = false;

      if (microphoneStream) {
        try {
          microphoneStream.getTracks().forEach((track) => track.stop());
        } catch {}
        microphoneStream = null;
      }

      if (recognition) {
        try { recognition.stop(); } catch {}
      }

      if (commandButton) {
        commandButton.setAttribute("aria-pressed", "false");
      }
    }

    const declineActivationButton =
      document.querySelector("#agora-nao-acessibilidade");

    if (declineActivationButton) {
      declineActivationButton.addEventListener("click", () => {
        fecharPedidoMicrofone();
      });
    }


    /* ==========================================================
       ATIVAÇÃO INICIAL
    ========================================================== */

    activationButton.addEventListener(
      "click",
      async () => {

        const activated =
          await startVoiceCommands();


        if (activated) {

          activationPanel.hidden =
            true;

        }

      }
    );


    /*
     * Também permite pressionar ENTER
     * no botão de ativação.
     */
    activationButton.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          activationButton.click();

        }

      }
    );


    /* ==========================================================
       LIMPEZA AO SAIR
    ========================================================== */

    window.addEventListener(
      "beforeunload",
      () => {

        /*
         * Para a leitura.
         */
        window.speechSynthesis.cancel();


        /*
         * Para o reconhecimento.
         */
        try {
          recognition?.stop();
        } catch {}


        /*
         * Libera o microfone.
         */
        microphoneStream
          ?.getTracks()
          .forEach(
            (track) => track.stop()
          );

      }
    );


    /* ==========================================================
       TRATAMENTO PARA NAVEGADORES QUE NÃO POSSUEM
       SPEECH SYNTHESIS
    ========================================================== */

    if (
      !("speechSynthesis" in window)
    ) {

      readerButtons.forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              announce(
                "A leitura de voz não está disponível neste navegador. Tente utilizar o Google Chrome."
              );

            }
          );

        }
      );

    }
