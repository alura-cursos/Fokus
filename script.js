const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const descansoCurtoBt = document.querySelector(".app__card-button--curto");
const descansoLongoBt = document.querySelector(".app__card-button--longo");
const startPauseBt = document.querySelector("#start-pause");
const startPauseSpan = document.querySelector("#start-pause span");
const startPauseImage = document.querySelector("#start-pause img");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const temporizador = document.querySelector("#timer");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const play = new Audio("./sons/play.wav");
const pause = new Audio("./sons/pause.mp3");
const beep = new Audio("./sons/beep.mp3");
musica.loop = true;

const tempoContexto = {
  'foco': 30,
  'descanso-curto': 5,
  'descanso-longo': 15
}

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alteraContexto("foco");
  alteraTituloContexto(
    'Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>',
  );
  focoBt.classList.add("active");
});

descansoCurtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alteraContexto("descanso-curto");
  alteraTituloContexto(
    'Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>',
  );
  descansoCurtoBt.classList.add("active");
});

descansoLongoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alteraContexto("descanso-longo");
  alteraTituloContexto(
    'Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>',
  );
  descansoLongoBt.classList.add("active");
});

function alteraContexto(contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
}

function alteraTituloContexto(texto) {
  titulo.innerHTML = texto;
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos < 0) {
    beep.play();
    zerar();
    alert("Tempo finalizado!");
    restaurarTempoContextoAtual();
    
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("FocoFinalizado");
      document.dispatchEvent(evento);
    }

    return;
  }

  mostrarTempo();
  tempoDecorridoEmSegundos -= 1;
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    pause.play();
    zerar();
    return;
  }
  play.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  startPauseSpan.textContent = "Pausar";
  startPauseImage.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  startPauseSpan.textContent = "Começar";
  startPauseImage.setAttribute("src", "./imagens/play_arrow.png");

}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizador.innerHTML = `${tempoFormatado}`;
}

function restaurarTempoContextoAtual() {
  const contextoAtual = html.getAttribute('data-contexto');
  tempoDecorridoEmSegundos = tempoContexto[contextoAtual];
  mostrarTempo();
}

mostrarTempo();
