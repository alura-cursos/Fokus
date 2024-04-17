const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const tempoNaTela = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botaoIniciar = document.querySelector(".app__card-primary-button");
const startPauseBt = document.querySelector("#start-pause");
const botoes = document.querySelectorAll(".app__card-button");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("/sons/beep.mp3");
const startPauseImg = document.querySelector(".app__card-primary-butto-icon");

musica.loop = true;
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  tempoDecorridoEmSegundos = 1500;
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  tempoDecorridoEmSegundos = 300;
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  tempoDecorridoEmSegundos = 900;
  longoBt.classList.add("active");
});

const alterarContexto = (contexto) => {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
      Otimize sua produtividade,<br> 
      <strong class='app__title-strong'>mergulhe no que importa</strong>
      `;

      break;
    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada?<br> 
      <strong class='app__title-strong'>Faça uma pausa curta!</strong>
      `;

      break;

    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superficie.<br> 
      <strong class='app__title-strong'>Faça uma pausa longa.</strong>
      `;

      break;

    default:
      break;
  }
};

function contagemRegressiva() {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  startPauseImg.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  startPauseImg.setAttribute("src", "/imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
