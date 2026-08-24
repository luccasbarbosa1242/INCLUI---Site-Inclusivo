
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

    const activationPanel =
      document.querySelector("#ativacao-acessibilidade");

    const activationButton =
      document.querySelector("#ativar-acessibilidade");


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


    function getPortugueseVoice() {

      const voices =
        window.speechSynthesis.getVoices();

      if (!voices.length) {
        return null;
      }

      /*
       * Primeiro procura vozes brasileiras.
       */
      let voice =
        voices.find(
          (v) =>
            v.lang &&
            v.lang.toLowerCase() === "pt-br"
        );

      /*
       * Depois procura qualquer português.
       */
      if (!voice) {
        voice =
          voices.find(
            (v) =>
              v.lang &&
              v.lang.toLowerCase().startsWith("pt")
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
        getPortugueseVoice();

      if (voice) {
        utterance.voice = voice;
      }


      utterance.lang =
        voice?.lang || "pt-BR";


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
        "Ouvir a página",
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
        "pt-BR";


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


      announce(
        "Comandos de voz ativos. Diga trocar tema, mudar tópico, ler tópico 1, voltar ao início ou ir para o final."
      );


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


      commandButton.setAttribute(
        "aria-pressed",
        "false"
      );


      announce(
        "Comandos de voz desativados."
      );

    }


    async function toggleVoiceCommands() {

      if (isListening) {

        stopVoiceCommands();

      } else {

        await startVoiceCommands();

      }

    }


    commandButton.addEventListener(
      "click",
      toggleVoiceCommands
    );


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

